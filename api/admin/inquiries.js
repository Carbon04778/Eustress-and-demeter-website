// api/admin/inquiries.js
// Serves the admin panel's inquiry list and updates.
//
// SECURITY MODEL
// --------------
// The browser never talks to the database directly. The inquiries table
// is sealed (RLS on, grants revoked) so even a logged-in session cannot
// read it from the client. Every request goes through here, and every
// request is checked twice:
//
//   1. Is this a real, unexpired Supabase session?
//      -> verified against Supabase's own /auth/v1/user endpoint
//   2. Is that user on the admin_users allowlist?
//      -> checked with the secret key
//
// Only after both pass does the secret key get used to read data. That
// means a leaked login, or someone creating their own account, still
// sees nothing.
//
//   GET   /api/admin/inquiries        list inquiries
//   PATCH /api/admin/inquiries        update status / notes on one row

const SUPABASE_URL = (process.env.SUPABASE_URL || '')
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1$/, '');
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const ALLOWED_STATUSES = ['new', 'read', 'replied', 'archived'];

export default async function handler(req, res) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[admin] Supabase env vars missing.');
    return res.status(500).json({ ok: false, error: 'Server not configured' });
  }

  // ---- Authenticate ----
  const token = bearerToken(req);
  if (!token) {
    return res.status(401).json({ ok: false, error: 'Not signed in' });
  }

  const user = await verifyUser(token);
  if (!user) {
    return res.status(401).json({ ok: false, error: 'Session expired — please sign in again' });
  }

  const isAdmin = await checkAllowlist(user.id);
  if (!isAdmin) {
    console.warn('[admin] Rejected non-allowlisted user:', user.email);
    return res.status(403).json({ ok: false, error: 'This account does not have admin access' });
  }

  // ---- Route ----
  try {
    if (req.method === 'GET') return await listInquiries(req, res);
    if (req.method === 'PATCH') return await updateInquiry(req, res);
    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('[admin] Unhandled error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong' });
  }
}

// ---------------------------------------------------------------------
//  Handlers
// ---------------------------------------------------------------------

async function listInquiries(req, res) {
  // Everything is fetched in one go and filtered in the browser. With a
  // consulting firm's inquiry volume this stays fast for years, and it
  // makes search and filtering instant with no extra round trips.
  const url =
    `${SUPABASE_URL}/rest/v1/inquiries` +
    `?select=*&order=created_at.desc&limit=2000`;

  const r = await fetch(url, { headers: authHeaders() });

  if (!r.ok) {
    const detail = await r.text();
    console.error('[admin] List failed:', r.status, detail);
    return res.status(502).json({ ok: false, error: 'Could not load inquiries' });
  }

  const rows = await r.json();
  return res.status(200).json({ ok: true, inquiries: rows });
}

async function updateInquiry(req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { id, status, notes } = body || {};

  if (!id || !/^[0-9a-f-]{36}$/i.test(String(id))) {
    return res.status(400).json({ ok: false, error: 'Missing or invalid id' });
  }

  // Build the patch from scratch rather than passing the body through,
  // so a crafted request can't rewrite the name, email or timestamp.
  const patch = {};
  if (status !== undefined) {
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ ok: false, error: 'Invalid status' });
    }
    patch.status = status;
  }
  if (notes !== undefined) {
    patch.notes = notes === null || notes === '' ? null : String(notes).slice(0, 10000);
  }

  if (Object.keys(patch).length === 0) {
    return res.status(400).json({ ok: false, error: 'Nothing to update' });
  }

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: authHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(patch)
    }
  );

  if (!r.ok) {
    const detail = await r.text();
    console.error('[admin] Update failed:', r.status, detail);
    return res.status(502).json({ ok: false, error: 'Could not save change' });
  }

  const rows = await r.json();
  return res.status(200).json({ ok: true, inquiry: Array.isArray(rows) ? rows[0] : null });
}

// ---------------------------------------------------------------------
//  Auth helpers
// ---------------------------------------------------------------------

function bearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization || '';
  const match = /^Bearer\s+(.+)$/i.exec(String(header));
  return match ? match[1].trim() : null;
}

// Ask Supabase who this token belongs to. Doing it this way rather than
// decoding the JWT ourselves means expired and revoked sessions are
// rejected properly, with no signature-checking code to get wrong.
async function verifyUser(token) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`
      }
    });
    if (!r.ok) return null;
    const user = await r.json();
    return user && user.id ? user : null;
  } catch (err) {
    console.error('[admin] verifyUser threw:', err);
    return null;
  }
}

async function checkAllowlist(userId) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/admin_users?select=user_id&user_id=eq.${encodeURIComponent(userId)}&limit=1`,
      { headers: authHeaders() }
    );
    if (!r.ok) {
      console.error('[admin] Allowlist check failed:', r.status, await r.text());
      return false;
    }
    const rows = await r.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch (err) {
    console.error('[admin] checkAllowlist threw:', err);
    return false;
  }
}

// Supabase supports two key formats. Legacy service_role keys are JWTs
// starting "eyJ" and go in both headers; current sb_secret_ keys are not
// JWTs and must not appear in the Authorization header.
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