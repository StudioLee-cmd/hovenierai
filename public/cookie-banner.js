(function(){
var c=localStorage.getItem("cookie_consent");
function loadHL(){
var el=document.querySelector("[data-widget-id]");
var wid=el?el.getAttribute("data-widget-id"):"";
if(!wid)return;
if(document.querySelector("script[src*='leadconnectorhq']"))return;
var s=document.createElement("script");
s.src="https://widgets.leadconnectorhq.com/loader.js";
s.setAttribute("data-resources-url","https://widgets.leadconnectorhq.com/chat-widget/loader.js");
s.setAttribute("data-widget-id",wid);
document.head.appendChild(s);
}
if(c==="accepted"){loadHL();return;}
if(c==="declined")return;
var d=document.createElement("div");
d.id="cb";
d.innerHTML='<div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;padding:12px;display:flex;justify-content:center"><div style="max-width:560px;width:100%;background:#141419;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:16px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 -8px 40px rgba(0,0,0,0.4)"><img src="/images/cookie.png" style="width:48px;height:48px;animation:ckspin 3s linear infinite;flex-shrink:0" alt="Cookie"><p style="flex:1;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.5;margin:0">We gebruiken cookies voor onze chatfunctie. Lees ons <a href="/privacy" style="color:#C1FF72;text-decoration:underline">privacybeleid</a>.</p><div style="display:flex;gap:8px;flex-shrink:0"><button id="cb-no" style="background:transparent;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.15);padding:8px 16px;border-radius:100px;font-size:13px;cursor:pointer">Weigeren</button><button id="cb-yes" style="background:#C1FF72;color:#0a0a0f;border:none;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer">Accepteren</button></div></div></div>';
var st=document.createElement("style");
st.textContent="@keyframes ckspin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@media(max-width:600px){#cb>div>div{flex-wrap:wrap}#cb>div>div>div:last-child{width:100%;display:flex}#cb>div>div>div:last-child button{flex:1}}@media(prefers-reduced-motion:reduce){#cb img{animation:none}}";
document.head.appendChild(st);
document.body.appendChild(d);
document.getElementById("cb-yes").onclick=function(){localStorage.setItem("cookie_consent","accepted");d.remove();loadHL();};
document.getElementById("cb-no").onclick=function(){localStorage.setItem("cookie_consent","declined");d.remove();};
})();