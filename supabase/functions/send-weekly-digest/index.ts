import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM_EMAIL     = Deno.env.get('FROM_EMAIL')!;
const APP_URL        = Deno.env.get('APP_URL')!;
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Section order matches curriculum.js — used to find "what's next"
const SECTION_ORDER = [
  '1-1','1-2','1-3','1-4','1-5',
  '2-1','2-2','2-3','2-phase1-review','2-4','2-5','2-6','2-7','2-phase2-review','2-8','2-8b','2-8c','2-9','2-10',
  '3-1','3-2','3-2b','3-3','3-4',
];

const FLOOR_TITLES: Record<number, string> = {
  1: 'Understanding Before Touching',
  2: 'Seeing It Come Alive',
  3: 'Building With Training Wheels',
};

Deno.serve(async () => {
  try {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);

    // Get all users who have been active at least once
    const { data: profiles, error } = await sb
      .from('profiles')
      .select('id, username, xp, level, streak')
      .not('xp', 'is', null);

    if (error) throw error;
    if (!profiles?.length) return new Response('no users', { status: 200 });

    // Get auth emails for all users
    const userIds = profiles.map(p => p.id);
    const { data: { users: authUsers } } = await sb.auth.admin.listUsers();
    const emailMap: Record<string, string> = {};
    authUsers?.forEach(u => { emailMap[u.id] = u.email ?? ''; });

    // Get completed sections per user
    const { data: allProgress } = await sb
      .from('user_progress')
      .select('user_id, section_id')
      .in('user_id', userIds);

    const progressByUser: Record<string, Set<string>> = {};
    allProgress?.forEach(r => {
      if (!progressByUser[r.user_id]) progressByUser[r.user_id] = new Set();
      progressByUser[r.user_id].add(r.section_id);
    });

    let sent = 0;
    for (const profile of profiles) {
      const email = emailMap[profile.id];
      if (!email) continue;

      const completed = progressByUser[profile.id] ?? new Set();
      const nextSection = SECTION_ORDER.find(s => !completed.has(s)) ?? null;
      const floorTitle  = FLOOR_TITLES[profile.level] ?? `Floor ${profile.level}`;

      const html = digestHtml({
        name:        profile.username || email.split('@')[0],
        xp:          profile.xp ?? 0,
        level:       profile.level ?? 1,
        floorTitle,
        streak:      profile.streak ?? 0,
        nextSection,
        doneSections: completed.size,
        totalSections: SECTION_ORDER.length,
      });

      await sendEmail(email, 'Your weekly progress — The Code Book', html);
      sent++;

      // Small delay to stay within Resend rate limits
      await new Promise(r => setTimeout(r, 120));
    }

    return new Response(`sent ${sent}`, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('error', { status: 500 });
  }
});

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) throw new Error(await res.text());
}

interface DigestData {
  name: string;
  xp: number;
  level: number;
  floorTitle: string;
  streak: number;
  nextSection: string | null;
  doneSections: number;
  totalSections: number;
}

function digestHtml(d: DigestData): string {
  const progressPct = Math.round((d.doneSections / d.totalSections) * 100);
  const nextLine = d.nextSection
    ? `Your next section is <strong>${d.nextSection.replace(/-/g, ' ').toUpperCase()}</strong>.`
    : `You've finished all sections — incredible work.`;
  const streakLine = d.streak > 0
    ? `You're on a <strong>${d.streak}-day streak</strong>. Keep it going.`
    : `Start a new streak today — consistency beats intensity every time.`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0d1117;padding:32px 40px 28px;text-align:center;">
            <span style="font-family:'Courier New',monospace;font-size:13px;letter-spacing:3px;color:#58a6ff;text-transform:uppercase;">The Code Book</span>
            <div style="margin-top:6px;font-size:11px;letter-spacing:2px;color:#8b949e;text-transform:uppercase;">Weekly Progress</div>
          </td>
        </tr>

        <!-- Stats row -->
        <tr>
          <td style="background:#161b22;padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center;padding:0 8px;">
                  <div style="font-family:'Courier New',monospace;font-size:28px;font-weight:700;color:#58a6ff;">${d.xp}</div>
                  <div style="font-size:11px;letter-spacing:1.5px;color:#8b949e;text-transform:uppercase;margin-top:4px;">XP</div>
                </td>
                <td style="text-align:center;padding:0 8px;border-left:1px solid #30363d;border-right:1px solid #30363d;">
                  <div style="font-family:'Courier New',monospace;font-size:28px;font-weight:700;color:#58a6ff;">${d.level}</div>
                  <div style="font-size:11px;letter-spacing:1.5px;color:#8b949e;text-transform:uppercase;margin-top:4px;">Floor</div>
                </td>
                <td style="text-align:center;padding:0 8px;">
                  <div style="font-family:'Courier New',monospace;font-size:28px;font-weight:700;color:#58a6ff;">${d.streak}</div>
                  <div style="font-size:11px;letter-spacing:1.5px;color:#8b949e;text-transform:uppercase;margin-top:4px;">Day Streak</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Progress bar -->
        <tr>
          <td style="background:#161b22;padding:0 40px 24px;">
            <div style="font-size:11px;color:#8b949e;margin-bottom:6px;">${d.doneSections} of ${d.totalSections} sections complete</div>
            <div style="background:#30363d;border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:#58a6ff;width:${progressPct}%;height:6px;border-radius:4px;"></div>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#0d1117;">Hey ${d.name},</p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
              You're on <strong>Floor ${d.level} — ${d.floorTitle}</strong>. ${nextLine}
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;">
              ${streakLine}
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0d1117;border-radius:8px;">
                  <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1.5px;color:#ffffff;text-decoration:none;text-transform:uppercase;">
                    Continue →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fa;padding:24px 40px;border-top:1px solid #e9ecef;">
            <p style="margin:0;font-size:12px;color:#888;line-height:1.6;">
              This is your weekly digest — sent every Monday. No spam, just your numbers.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
