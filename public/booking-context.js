/* StudioLee booking context. No cookies, fingerprinting or contact data. */
(function () {
  'use strict';
  function decorate(href, page, title, referrer) {
    var link;
    try { link = new URL(href, page); } catch (_) { return href; }
    if (!/^(www\.|app\.)?cal\.com$/.test(link.hostname) ||
        !/^\/studiolee(?:\/|$)/.test(link.pathname)) return href;
    var origin = new URL(page);
    var context = {
      'source-site': origin.hostname,
      'source-page': origin.origin + origin.pathname,
      'source-topic': String(title || '').slice(0, 250)
    };
    try {
      var ref = new URL(referrer);
      if (ref.hostname !== origin.hostname) context['source-referrer'] = ref.hostname;
    } catch (_) { /* No referrer is unknown, not a guessed channel. */ }
    Object.keys(context).forEach(function (key) {
      if (context[key]) link.searchParams.set(key, context[key]);
    });
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
      if (!link.searchParams.has(key) && origin.searchParams.has(key)) {
        link.searchParams.set(key, origin.searchParams.get(key));
      }
    });
    return link.href;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { decorate: decorate };
  if (typeof document === 'undefined') return;
  function update(a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var next = decorate(href, location.href, document.title, document.referrer);
    if (next !== href) a.setAttribute('href', next);
  }
  function scan() { document.querySelectorAll('a[href*="cal.com/studiolee"]').forEach(update); }
  scan();
  document.addEventListener('click', function (event) {
    var a = event.target.closest && event.target.closest('a[href]');
    if (a) update(a);
  }, true);
  document.addEventListener('auxclick', function (event) {
    var a = event.target.closest && event.target.closest('a[href]');
    if (a) update(a);
  }, true);
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
}());
