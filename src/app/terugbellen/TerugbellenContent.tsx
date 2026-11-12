"use client";
import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import CallbackRequestPopup from "@/components/CallbackRequestPopup";
import { callbackPage } from "@/data/callback";
import { voiceDemos } from "@/data/voice-demos";

const KNOP =
  "inline-flex items-center justify-center px-8 h-14 rounded-full text-black bg-primary text-lg font-bold " +
  "transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40";

// Written examples are open to everyone. A recording, like a demo call, comes after the details:
// the visitor leaves an e-mail address first and only then listens or books (owner 30-10 and 31-07).
export default function TerugbellenContent() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const recorded = voiceDemos.filter((d) => d.src);

  return (
    <Container>
      <section className="pt-32 pb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-foreground">{callbackPage.heading}</h1>
        <p className="mt-6 text-lg text-foreground/80">{callbackPage.intro}</p>
        <button type="button" data-callback-open onClick={() => setOpen(true)} className={`${KNOP} mt-8`}>
          Vraag een demo aan
        </button>
      </section>

      <section className="max-w-3xl mx-auto pb-12" aria-labelledby="zo-klinkt-het">
        <h2 id="zo-klinkt-het" className="text-2xl md:text-3xl font-bold font-heading text-foreground">Zo klinkt een terugbelgesprek</h2>
        <p className="mt-2 text-sm text-foreground/60">Voorbeeldgesprek. De echte tekst stemmen we af op jouw bedrijf.</p>
        <ol className="mt-6 space-y-3">
          {callbackPage.opening.map(([spreker, tekst], i) => (
            <li key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] p-4">
              <span className="block text-sm font-semibold text-foreground/60">{spreker}</span>
              <span className="text-foreground">{tekst}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl mx-auto pb-12" aria-labelledby="voorbeelden">
        <h2 id="voorbeelden" className="text-2xl md:text-3xl font-bold font-heading text-foreground">Gesprekken die de agent voert</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {voiceDemos.map((d) => (
            <li key={d.id} data-voice-example={d.id} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] p-4">
              <h3 className="font-semibold font-heading text-foreground">{d.titel}</h3>
              <p className="mt-2 text-sm text-foreground/70">{d.richting}</p>
              <p className="mt-2 text-sm font-medium text-foreground/60">Stem: {d.stem}</p>
              {d.src && unlocked && <audio data-recording controls preload="none" src={d.src} className="mt-3 w-full" />}
              {d.src && !unlocked && (
                <button type="button" data-recording-locked onClick={() => setOpen(true)} className="mt-3 font-semibold underline text-foreground">
                  Beluister de opname
                </button>
              )}
            </li>
          ))}
        </ul>
        {recorded.length === 0 && (
          <p data-recordings-pending className="mt-4 text-sm text-foreground/60">
            De opnames sturen we je per e-mail zodra je een demo hebt aangevraagd.
          </p>
        )}
      </section>

      <section className="max-w-3xl mx-auto pb-24 text-center">
        <p className="text-lg text-foreground/80">
          {callbackPage.plans} <Link href="/tarieven" className="font-semibold underline">Bekijk de pakketten</Link>
        </p>
      </section>

      {open && <CallbackRequestPopup onClose={() => setOpen(false)} onSent={() => setUnlocked(true)} />}
    </Container>
  );
}
