import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const text = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

// Only a production deployment with its lead address set forwards a lead, so a preview or a local
// build can never put a test request into the real lead route.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  if (text(body.website, 200)) return NextResponse.json({ ok: true });
  const email = text(body.email, 254);
  if (!EMAIL.test(email) || body.consent_contact !== true) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const lead = {
    email,
    phone: text(body.phone, 40),
    niche: text(body.niche, 80),
    site: text(body.site, 80),
    source: body.source === "demo_page" ? "demo_page" : "callback_page",
    consent_contact: true,
    consent_promotion: body.consent_promotion === true,
    consent_moment: new Date().toISOString(),
    consent_version: text(body.consent_version, 40),
    consent_text: text(body.consent_text, 500),
  };
  if (process.env.VERCEL_ENV !== "production") return NextResponse.json({ ok: true, preview: true });
  const url = process.env.CALLBACK_LEAD_WEBHOOK_URL;
  if (!url) return NextResponse.json({ error: "not-configured" }, { status: 503 });
  // The lead gate reads the site a lead came from in the Origin header (lead-herkomst register), so it goes along.
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Origin: new URL(request.url).origin }, body: JSON.stringify(lead) });
  return response.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "lead-route" }, { status: 502 });
}
