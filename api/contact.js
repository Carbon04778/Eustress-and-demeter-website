// api/contact.js
// Vercel serverless function backing every inquiry form on the site
// (the full Contact page form + the quick-contact forms on the homepage
// and each service page — all posting here via contact-form.js).
//
// Every submission is saved to Supabase and read from the admin panel.
// There is no email step: the database is the single source of truth.
//
// If the save fails for any reason, this returns an error and
// contact-form.js falls back to opening the visitor's email client with
// their details filled in — so an inquiry is never silently lost.
//
// ENV VARS (Vercel → Project Settings → Environment Variables)
//   SUPABASE_URL               https://xxxxxxxx.supabase.co   (no trailing slash)
//   SUPABASE_SERVICE_ROLE_KEY  sb_secret_...  or  eyJhb...
//                              ← server-only, never in frontend code

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

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

  const inquirySubject = (subject && String(subject).slice(0, 200)) || 'New website inquiry';

  const result = await saveInquiry({
    subject: inquirySubject,
    fields,
    page,
    url
  });

  if (result.ok) {
    return res.status(200).json({ ok: true });
  }

  // Save failed. Returning an error makes contact-form.js open the
  // visitor's email client with their details, so the inquiry still
  // reaches you while the underlying problem gets fixed.
  return res.status(502).json({ ok: false, error: 'Could not save inquiry' });
}

// ---------------------------------------------------------------------
//  Supabase
// ---------------------------------------------------------------------
// Plain fetch against Supabase's REST API rather than the
// @supabase/supabase-js package — no dependency, no npm install.

async function saveInquiry({ subject, fields, page, url }) {
  // Loud, specific startup checks. A vague failure here is the single
  // most annoying thing to debug, so each cause gets its own message.
  if (!SUPABASE_URL) {
    console.error('[contact] FAIL: SUPABASE_URL is empty. Set it in Vercel → Settings → Environment Variables, then REDEPLOY.');
    return { ok: false };
  }
  if (!SUPABASE_KEY) {
    console.error('[contact] FAIL: SUPABASE_SERVICE_ROLE_KEY is empty. Set it in Vercel → Settings → Environment Variables, then REDEPLOY.');
    return { ok: false };
  }
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(SUPABASE_URL)) {
    console.error('[contact] WARNING: SUPABASE_URL looks wrong:', SUPABASE_URL, '— expected https://yourproject.supabase.co');
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
      console.error('[contact] FAIL: Supabase returned', res.status, detail);
      console.error('[contact] Diagnosis:', diagnose(res.status, detail));
      return { ok: false };
    }

    const data = await res.json();
    const id = Array.isArray(data) && data[0] ? data[0].id : null;
    console.log('[contact] SAVED inquiry:', id, '| from:', row.email, '| page:', row.source_page);
    return { ok: true, id };
  } catch (err) {
    console.error('[contact] FAIL: could not reach Supabase:', err && err.message);
    return { ok: false };
  }
}

// Turns Supabase's terse HTTP errors into the actual thing to go fix.
function diagnose(status, detail) {
  const text = String(detail || '');
  if (status === 401) {
    return 'Wrong key. You probably used the PUBLISHABLE/anon key. Copy the SECRET key (sb_secret_...) or the legacy service_role key instead.';
  }
  if (status === 404) {
    return 'Table not found. Either the SQL from supabase-setup.sql was never run, or SUPABASE_URL points at the wrong project.';
  }
  if (status === 403 || text.includes('42501') || text.includes('permission denied')) {
    return 'Permission denied. The key being used is not the secret/service_role key, so row level security is blocking the insert.';
  }
  if (text.includes('PGRST204') || text.includes('column')) {
    return 'Column mismatch — the table does not match supabase-setup.sql. Re-run that SQL file.';
  }
  return 'Unrecognised error. Check the raw response above.';
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
  const headers = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_KEY
  };
  if (SUPABASE_KEY.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  }
  return Object.assign(headers, extra || {});
}

function str(value) {
  if (value == null) return null;
  const out = String(value).trim();
  return out === '' ? null : out.slice(0, 5000);
}