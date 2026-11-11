"use client";
import React, { useEffect, useRef, useState } from "react";
import { siteDetails } from "@/data/siteDetails";
import { demoAanvraagUrl } from "@/data/voice-demos";
import { CONSENT_TEXT, CONSENT_VERSION, PROMOTION_TEXT } from "@/data/callback";

interface Props { onClose: () => void; onSent: () => void; inline?: boolean; source?: "callback_page" | "demo_page"; }

// Details first: only the e-mail address and one unticked consent are required (owner 31-07). The
// optional promotion tick is separate, and the booking link appears only after the request is in.
export default function CallbackRequestPopup({ onClose, onSent, inline = false, source = "callback_page" }: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inline) return;
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "unset"; };
  }, [onClose, inline]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setError("Zet het vinkje, dan mogen we je de demo mailen."); return; }
    setState("sending"); setError("");
    try {
      const response = await fetch("/api/callback-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, phone, website, niche: siteDetails.niche, site: siteDetails.siteName, source,
          consent_contact: consent, consent_promotion: promotion,
          consent_text: CONSENT_TEXT, consent_version: CONSENT_VERSION,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setState("sent"); onSent();
    } catch {
      setState("idle");
      setError("Dat lukte niet. Probeer het zo nog eens.");
    }
  }

  const veld = "mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-3 text-foreground";
  return (
    <div role={inline ? undefined : "dialog"} aria-modal={inline ? undefined : true} aria-labelledby="callback-popup-titel" data-callback-popup={inline ? "inline" : "popup"}
      className={inline ? "flex justify-center" : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"} onClick={inline ? undefined : onClose}>
      <div className={inline ? "w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-6" : "w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--background)] p-6"} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 id="callback-popup-titel" className="text-2xl font-bold font-heading text-foreground">
            {state === "sent" ? "Je aanvraag is binnen" : "Vraag je demo aan"}
          </h2>
          {!inline && <button type="button" onClick={onClose} aria-label="Sluiten" className="text-2xl leading-none text-foreground/60">×</button>}
        </div>
        {state === "sent" ? (
          <div data-callback-sent className="mt-4 text-foreground">
            <p>Je krijgt de demo per mail. Liever meteen een moment kiezen?</p>
            <a data-callback-booking href={demoAanvraagUrl} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold underline">Plan een gesprek</a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-foreground">E-mailadres
              <input ref={first} name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={veld} />
            </label>
            <label className="block text-sm font-medium text-foreground">Telefoonnummer (niet verplicht, als je liever gebeld wordt)
              <input name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={veld} />
            </label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" />
            <label className="flex gap-2 text-sm text-foreground">
              <input name="consent_contact" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>{CONSENT_TEXT}</span>
            </label>
            <label className="flex gap-2 text-sm text-foreground/80">
              <input name="consent_promotion" type="checkbox" checked={promotion} onChange={(e) => setPromotion(e.target.checked)} className="mt-1" />
              <span>{PROMOTION_TEXT}</span>
            </label>
            {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
            <button type="submit" disabled={state === "sending"} className="h-12 w-full rounded-full bg-primary font-bold text-black disabled:opacity-60">
              {state === "sending" ? "Bezig met versturen" : "Stuur me de demo"}
            </button>
            <p className="text-xs text-foreground/60">Lees ons <a href="/privacy" className="underline">privacybeleid</a>.</p>
          </form>
        )}
      </div>
    </div>
  );
}
