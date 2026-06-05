import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM_EMAIL     = Deno.env.get('FROM_EMAIL')!;
const APP_URL        = Deno.env.get('APP_URL')!;
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  try {
    const payload = await req.json();

    // Supabase auth webhook sends { type, table, record }
    const record = payload?.record;
    if (!record?.id || !record?.email) {
      return new Response('no user', { status: 200 });
    }

    const { id: userId, email } = record;

    // Try to get username from profiles
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: profile } = await sb
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .maybeSingle();

    const name = profile?.username || email.split('@')[0];

    await sendEmail(email, `Welcome to The Code Book, ${name}`, welcomeHtml(name));

    return new Response('ok', { status: 200 });
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

function welcomeHtml(name: string): string {
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
            <div style="margin-top:8px;width:40px;height:2px;background:#58a6ff;margin-left:auto;margin-right:auto;"></div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 20px;font-size:22px;font-weight:600;color:#0d1117;line-height:1.3;">
              Hey ${name} — you made it.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
              Welcome to The Code Book. You've just joined a place where you'll actually learn to code — not by copying tutorials, but by understanding how things work from the ground up.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
              Start at Floor 1 and work your way up. Each floor builds on the last. Take your time — the goal is understanding, not speed.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;">
              When you're ready, the first section is waiting.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0d1117;border-radius:8px;">
                  <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;font-family:'Courier New',monospace;font-size:13px;letter-spacing:1.5px;color:#ffffff;text-decoration:none;text-transform:uppercase;">
                    Open Floor 1 →
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
              You're receiving this because you just created an account. That's it — no newsletters, no upsells. Just progress emails when they're useful.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
