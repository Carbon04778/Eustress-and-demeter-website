// contact-form.js
// Shared submit handler for every inquiry form on the site (the full
// Contact page form and the short "quick contact" forms on the homepage
// and service pages). Each page's handleSubmit builds a plain `fields`
// object from its own inputs and calls window.EDForm.submit(fields, subject).
//
// Posts to /api/contact, a Vercel serverless function that saves the
// inquiry to Supabase and then emails it via Resend (see api/contact.js).
// If the request fails for any reason — API not deployed yet, network
// error, everything down — it falls back to opening the visitor's email
// client with the same details, so an inquiry is never silently lost.
//
// STEP 1 CHANGE: also sends which page the form was on, so the admin
// inbox can show whether an inquiry came from the Contact page, the
// homepage, or a specific service page. No change to how any page calls
// this — the individual .dc.html files stay exactly as they are.
"use strict";
(function () {
  function toLines(fields) {
    return Object.keys(fields)
      .filter(function (k) { return fields[k]; })
      .map(function (k) {
        var label = k.charAt(0).toUpperCase() + k.slice(1);
        return label + ': ' + fields[k];
      });
  }

  function mailtoFallback(fields, subject) {
    var lines = toLines(fields);
    window.location.href =
      'mailto:info@eustressanddemeter.com?subject=' + encodeURIComponent(subject || 'Website inquiry') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  // A readable page name: "Contact", "Restaurant Consulting", "Home".
  // Derived from the filename so it keeps working if pages get renamed
  // or moved behind clean URLs later.
  function pageName() {
    try {
      var path = decodeURIComponent(window.location.pathname);
      var file = path.split('/').pop() || '';
      file = file.replace(/\.dc\.html$/i, '').replace(/\.html$/i, '');
      if (!file || /^index$/i.test(file)) return 'Home';
      if (/^E&D Website v2/i.test(file)) return 'Home';
      return file;
    } catch (e) {
      return null;
    }
  }

  window.EDForm = {
    // fields: plain object of form field name -> value
    // subject: email subject line for this particular form
    // Returns { ok: true } on success, { ok: false, fallback: true } if it
    // had to fall back to mailto.
    submit: async function (fields, subject) {
      try {
        var res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: subject || 'Website inquiry',
            fields: fields,
            page: pageName(),
            url: window.location.href
          })
        });
        var data = {};
        try { data = await res.json(); } catch (e) { /* non-JSON response */ }
        if (!res.ok || !data.ok) {
          throw new Error((data && data.error) || ('Request failed (' + res.status + ')'));
        }
        return { ok: true };
      } catch (err) {
        mailtoFallback(fields, subject);
        return { ok: false, fallback: true };
      }
    }
  };
})();