(function(){
  // Check consent
  var consent = localStorage.getItem("cookie_consent");
  
  // Load HighLevel if already accepted
  function loadHL(){
    var el = document.querySelector("script[src*='cookie-banner']");
    var wid = el ? el.getAttribute("data-widget-id") : "";
    if(!wid || document.querySelector("script[src*='leadconnectorhq']")) return;
    var s = document.createElement("script");
    s.src = "https://widgets.leadconnectorhq.com/loader.js";
    s.setAttribute("data-resources-url","https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    s.setAttribute("data-widget-id", wid);
    document.head.appendChild(s);
  }
  
  if(consent === "accepted"){ loadHL(); return; }
  if(consent === "declined") return;
  
  // Inject CSS
  var css = document.createElement("style");
  css.textContent = ".cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;transform:translateY(100%);transition:transform .4s ease;pointer-events:none}" +
    ".cookie-banner.show{transform:translateY(0);pointer-events:auto}" +
    ".cookie-banner-inner{max-width:580px;margin:0 auto 1.5rem;background:#141419;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1rem;box-shadow:0 -8px 40px rgba(0,0,0,.4)}" +
    ".cookie-spin-img{width:48px;height:48px;animation:cookieSpin 3s linear infinite;flex-shrink:0}" +
    "@keyframes cookieSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}" +
    ".cookie-text{flex:1;color:rgba(255,255,255,.8);font-size:.85rem;line-height:1.5;margin:0}" +
    ".cookie-text a{color:#C1FF72;text-decoration:underline}" +
    ".cookie-btns{display:flex;gap:.5rem;flex-shrink:0}" +
    ".cookie-btn-accept{background:#C1FF72;color:#0a0a0f;border:none;padding:8px 20px;border-radius:100px;font-size:.8rem;font-weight:700;cursor:pointer;transition:transform .15s}" +
    ".cookie-btn-accept:hover{transform:scale(1.05)}" +
    ".cookie-btn-decline{background:transparent;color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.15);padding:8px 16px;border-radius:100px;font-size:.8rem;cursor:pointer;transition:border-color .15s}" +
    ".cookie-btn-decline:hover{border-color:rgba(255,255,255,.4);color:#fff}" +
    "@media(max-width:600px){.cookie-banner-inner{flex-wrap:wrap;margin:0 .75rem 1rem;padding:1rem}.cookie-btns{width:100%;justify-content:stretch}.cookie-btn-accept,.cookie-btn-decline{flex:1;text-align:center}}" +
    "@media(prefers-reduced-motion:reduce){.cookie-spin-img{animation:none}}";
  document.head.appendChild(css);
  
  // Inject HTML
  var banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.id = "cookieBanner";
  banner.innerHTML = '<div class="cookie-banner-inner">' +
    '<img src="/images/cookie.png" alt="Cookie" class="cookie-spin-img">' +
    '<p class="cookie-text">We gebruiken cookies voor onze chatfunctie. Lees ons <a href="/privacy">privacybeleid</a>.</p>' +
    '<div class="cookie-btns">' +
    '<button class="cookie-btn-decline">Weigeren</button>' +
    '<button class="cookie-btn-accept">Accepteren</button>' +
    '</div></div>';
  document.body.appendChild(banner);
  
  // Event listeners
  banner.querySelector(".cookie-btn-accept").onclick = function(){
    localStorage.setItem("cookie_consent","accepted");
    banner.classList.remove("show");
    loadHL();
  };
  banner.querySelector(".cookie-btn-decline").onclick = function(){
    localStorage.setItem("cookie_consent","declined");
    banner.classList.remove("show");
  };
  
  // Show after 1.5s
  setTimeout(function(){ banner.classList.add("show"); }, 1500);
})();