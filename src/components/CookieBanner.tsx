"use client";
import { useState, useEffect } from "react";

function loadHighLevel(widgetId: string) {
  if (!widgetId) return;
  if (typeof document === "undefined") return;
  const existing = document.querySelector('script[src*="leadconnectorhq"]');
  if (existing) return;
  const s = document.createElement("script");
  s.src = "https://widgets.leadconnectorhq.com/loader.js";
  s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
  s.setAttribute("data-widget-id", widgetId);
  document.body.appendChild(s);
}

export default function CookieBanner({ widgetId }: { widgetId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      loadHighLevel(widgetId);
      return;
    }
    if (consent === "declined") return;
    setShow(true);
  }, [widgetId]);

  if (!show) return null;

  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:99999,padding:"12px",display:"flex",justifyContent:"center"}}>
      <div style={{maxWidth:"560px",width:"100%",background:"#141419",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"20px",padding:"16px 20px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 -8px 40px rgba(0,0,0,0.4)"}}>
        <img src="/images/cookie.png" alt="Cookie" style={{width:"48px",height:"48px",animation:"ckspin 3s linear infinite",flexShrink:0}} />
        <p style={{flex:1,color:"rgba(255,255,255,0.8)",fontSize:"14px",lineHeight:1.5,margin:0}}>
          We gebruiken cookies voor onze chatfunctie. Lees ons{" "}
          <a href="/privacy" style={{color:"#C1FF72",textDecoration:"underline"}}>privacybeleid</a>.
        </p>
        <div style={{display:"flex",gap:"8px",flexShrink:0}}>
          <button onClick={() => { localStorage.setItem("cookie_consent","declined"); setShow(false); }} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.15)",padding:"8px 16px",borderRadius:"100px",fontSize:"13px",cursor:"pointer"}}>Weigeren</button>
          <button onClick={() => { localStorage.setItem("cookie_consent","accepted"); setShow(false); loadHighLevel(widgetId); }} style={{background:"#C1FF72",color:"#0a0a0f",border:"none",padding:"8px 20px",borderRadius:"100px",fontSize:"13px",fontWeight:700,cursor:"pointer"}}>Accepteren</button>
        </div>
      </div>
      <style>{`@keyframes ckspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
