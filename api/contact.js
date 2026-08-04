// api/contact.js
// Vercel serverless function backing every contact form on the site
// (the full Contact page form + the quick-contact forms on the homepage
// and each service page — all posting here via contact-form.js).
//
// Works out of the box with no configuration: until RESEND_API_KEY is set,
// it validates the submission, logs it to the Vercel function log, and
// returns { ok: true } so the forms work end-to-end in dev/preview.
//
// To go live:
//   1. npm install        (installs the "resend" package already listed
//                           in package.json)
//   2. Create an API key at https://resend.com/api-keys
//   3. In Vercel: Project Settings -> Environment Variables, add
//        RESEND_API_KEY     = re_xxxxxxxx
//        CONTACT_TO_EMAIL   = info@eustressanddemeter.com   (optional, this is the default)
//        CONTACT_FROM_EMAIL = "Eustress & Demeter Website <inquiries@yourdomain.com>"
//                             (must be on a domain verified in Resend; until
//                             you verify a domain, Resend's shared
//                             onboarding@resend.dev sender works for testing)
//   4. Redeploy. No code changes needed — the block below activates
//      automatically as soon as RESEND_API_KEY exists.

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@eustressanddemeter.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Eustress & Demeter Website <onboarding@resend.dev>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { subject, fields, website } = body || {};

  // Honeypot — a real visitor never fills in a field named "website" that
  // isn't shown on any form. If contact-form.js ever adds a hidden trap
  // input with that name, bots that auto-fill every field get silently
  // no-opped here instead of generating a real send.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return res.status(400).json({ ok: false, error: 'Missing form fields' });
  }
  if (!fields.name || !fields.email) {
    return res.status(400).json({ ok: false, error: 'Name and email are required' });
  }
  if (!EMAIL_PATTERN.test(String(fields.email))) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  const emailSubject = (subject && String(subject).slice(0, 200)) || 'New website inquiry';
  const html = renderHtml(emailSubject, fields);

  if (!process.env.RESEND_API_KEY) {
    console.log('[contact] RESEND_API_KEY not set — logging inquiry instead of sending:', {
      subject: emailSubject,
      fields
    });
    return res.status(200).json({ ok: true, note: 'Logged only — RESEND_API_KEY is not configured yet.' });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: String(fields.email),
      subject: emailSubject,
      html
    });
    if (error) throw new Error(error.message || 'Resend error');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend send failed:', err);
    return res.status(502).json({ ok: false, error: 'Email service error' });
  }
}

function renderHtml(subject, fields) {
  const rows = Object.entries(fields)
    .map(([key, value]) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const safeValue = escapeHtml(value == null || value === '' ? '\u2014' : String(value)).replace(/\n/g, '<br>');
      return (
        '<tr>' +
        '<td style="padding:6px 12px 6px 0;font-weight:600;color:#17190F;vertical-align:top;white-space:nowrap;">' +
        escapeHtml(label) +
        '</td>' +
        '<td style="padding:6px 0;color:#3D4034;">' +
        safeValue +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  return (
    '<div style="font-family:Arial,sans-serif;font-size:14px;">' +
    '<h2 style="margin:0 0 16px;">' +
    escapeHtml(subject) +
    '</h2>' +
    '<table cellpadding="0" cellspacing="0">' +
    rows +
    '</table>' +
    '</div>'
  );
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
