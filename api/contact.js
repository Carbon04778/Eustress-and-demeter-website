// api/contact.js
// Vercel serverless function backing every contact form on the site
// (the full Contact page form + the quick-contact forms on the homepage
// and each service page — all posting here via contact-form.js).
//
// WHAT CHANGED IN STEP 1
// ----------------------
// Every submission is now SAVED to Supabase before the email is sent.
// Previously an inquiry existed only as an email — if Resend was down or
// unconfigured, the only record was a Vercel log line that expires.
//
// The save is deliberately best-effort: if Supabase is unreachable or the
// env vars aren't set yet, the function logs the problem and carries on to
// the email exactly as before. Storing an inquiry must never be able to
// break the act of receiving one.
//
// ENV VARS (Vercel → Project Settings → Environment Variables)
//   SUPABASE_URL               https://xxxxxxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  eyJhb...   ← server-only, never in frontend code
//   RESEND_API_KEY             re_xxxx    (optional, as before)
//   CONTACT_TO_EMAIL           info@eustressanddemeter.com  (optional)
//   CONTACT_FROM_EMAIL         "Eustress & Demeter Website <...>"  (optional)

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@eustressanddemeter.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Eustress & Demeter Website <onboarding@resend.dev>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

  const { subject, fields, website, page, url } = body || {};

  // Honeypot — a real visitor never fills in a top-level "website" value
  // that isn't shown on any form. Note this is body.website, which is
  // separate from fields.website (a genuine input on the Contact page).
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

  // ---- 1. Save to Supabase (best effort — never blocks the email) ----
  const inquiryId = await saveInquiry({
    subject: emailSubject,
    fields,
    page,
    url
  });

  // ---- 2. Send the email, exactly as before ----
  const html = renderHtml(emailSubject, fields);

  if (!process.env.RESEND_API_KEY) {
    console.log('[contact] RESEND_API_KEY not set — inquiry saved but not emailed:', {
      inquiryId,
      subject: emailSubject,
      fields
    });
    return res.status(200).json({ ok: true, note: 'Saved. Email skipped — RESEND_API_KEY is not configured yet.' });
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

    // ---- 3. Note that the email went out (best effort) ----
    if (inquiryId) markEmailSent(inquiryId);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend send failed:', err);

    // The inquiry is safe in the database even though the email failed,
    // so tell the visitor it worked rather than sending them to mailto
    // and risking a duplicate. Only report a hard failure if BOTH the
    // save and the send failed.
    if (inquiryId) {
      return res.status(200).json({ ok: true, note: 'Saved. Email delivery failed — check the admin inbox.' });
    }
    return res.status(502).json({ ok: false, error: 'Email service error' });
  }
}

// ---------------------------------------------------------------------
//  Supabase
// ---------------------------------------------------------------------
// Written with plain fetch against Supabase's REST API rather than the
// @supabase/supabase-js package — no new dependency, no npm install, no
// lockfile churn. One less thing to go wrong on deploy.

async function saveInquiry({ subject, fields, page, url }) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[contact] Supabase env vars not set — inquiry not saved to the database.');
    return null;
  }

  // The forms don't all use the same field names: the homepage sends
  // "brand" where the Contact page sends "company". Map them onto the
  // shared columns, and keep the untouched original in `fields`.
  const row = {
    name: str(fields.name),
    email: str(fields.email),
    company: str(fields.company || fields.brand),
    phone: str(fields.phone),
    message: str(fields.message),
    subject: str(subject),
    source_page: str(page),
    source_url: str(url),
    fields: fields
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: 'POST',
      headers: authHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(row)
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] Supabase insert failed:', res.status, detail);
      return null;
    }

    const data = await res.json();
    const id = Array.isArray(data) && data[0] ? data[0].id : null;
    console.log('[contact] Inquiry saved:', id);
    return id;
  } catch (err) {
    console.error('[contact] Supabase insert threw:', err);
    return null;
  }
}

async function markEmailSent(id) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders({ Prefer: 'return=minimal' }),
      body: JSON.stringify({ email_sent: true })
    });
  } catch (err) {
    console.error('[contact] Could not flag email_sent:', err);
  }
}

// Supabase supports two key formats and they authenticate differently.
//
//   Legacy:  service_role key, a JWT starting "eyJ..."
//            -> sent in BOTH the apikey and Authorization headers.
//   Current: secret key, starting "sb_secret_..."
//            -> NOT a JWT, so it must NOT go in the Authorization header.
//               Supabase rejects a Bearer value that doesn't exactly match
//               the apikey header.
//
// Detecting the format here means the same code works with whichever key
// your project has, and keeps working after you migrate off the legacy one.
function authHeaders(extra) {
  const key = SUPABASE_SERVICE_ROLE_KEY;
  const headers = {
    'Content-Type': 'application/json',
    apikey: key
  };
  if (key && key.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${key}`;
  }
  return Object.assign(headers, extra || {});
}

function str(value) {
  if (value == null) return null;
  const out = String(value).trim();
  return out === '' ? null : out.slice(0, 5000);
}

// ---------------------------------------------------------------------
//  Email rendering (unchanged)
// ---------------------------------------------------------------------

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