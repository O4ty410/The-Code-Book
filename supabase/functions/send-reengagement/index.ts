import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM_EMAIL     = Deno.env.get('FROM_EMAIL')!;
const APP_URL        = Deno.env.get('APP_URL')!;
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async () => {
  try {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);

    // Find users whose last_active was between 7 and 8 days ago.
    // Running daily means each user hits this window exactly once.
    const now      = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

    const { data: profiles, error } = await sb
      .from('profiles')
      .select('id, username, xp, level, streak')
      .lte('last_active', sevenDaysAgo.toISOString())
      .gte('last_active', eightDaysAgo.toISOString());

    if (error) throw error;
    if (!profiles?.length) return new Response('no inactive users', { status: 200 });

    // Fetch emails from auth
    const { data: { users: authUsers } } = await sb.auth.admin.listUsers();
    const emailMap: Record<string, string> = {};
    authUsers?.forEach(u => { emailMap[u.id] = u.email ?? ''; });

    let sent = 0;
    for (const profile of profiles) {
      const email = emailMap[profile.id];
      if (!email) continue;

      const name = profile.username || email.split('@')[0];
      const html = reengagementHtml({ name, xp: profile.xp ?? 0, level: profile.level ?? 1 });

      await sendEmail(email, `${name}, your code is waiting`, html);
      sent++;

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

interface ReengageData {
  name: string;
  xp: number;
  level: number;
}

function reengagementHtml(d: ReengageData): string {
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
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 20px;font-size:20px;font-weight:600;color:#0d1117;line-height:1.3;">
              Hey ${d.name} — it's been a week.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
              You left off on <strong>Floor ${d.level}</strong> with <strong>${d.xp} XP</strong>. That progress is still there, exactly where you left it.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
              Learning to code is hard to start back up after a break — but the hardest part is just opening the tab. Everything else follows.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;">
              One section today. That's all.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0d1117;border-radius:8px;">
                  <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1.5px;color:#ffffff;text-decoration:none;text-transform:uppercase;">
                    Pick Up Where I Left Off →
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
              You'll only ever get one of these — we won't keep nudging you. Come back when you're ready.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
