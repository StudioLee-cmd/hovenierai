"use client";

// The search bar of the blog index (shared template, clusters/seo/own-sites in StudioLee Northstar).
// It finds articles by a word of their title, excerpt, tags or headings. The input has a fixed height, so the page
// does not move when it loads; results open under it only after the visitor types.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { search, type SearchEntry } from "@/utils/blogSearch";

const SHOWN = 8;

export default function BlogSearch() {
    const [query, setQuery] = useState("");
    const [entries, setEntries] = useState<SearchEntry[] | null>(null);
    const [failed, setFailed] = useState(false);
    const [all, setAll] = useState(false);
    const loading = useRef(false);
    const started = useRef(false);

    const load = () => {
        if (entries || loading.current) return;
        loading.current = true;
        fetch("/blog-search.json")
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((data: SearchEntry[]) => setEntries(data))
            .catch(() => setFailed(true))
            .finally(() => { loading.current = false; });
    };

    useEffect(() => {
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) { setQuery(q); load(); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!started.current) { started.current = true; return; }
        const url = new URL(window.location.href);
        if (query.trim()) url.searchParams.set("q", query.trim()); else url.searchParams.delete("q");
        window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }, [query]);

    const active = query.trim().length >= 2;
    const found = active && entries ? search(entries, query) : [];
    const shown = all ? found : found.slice(0, SHOWN);

    return (
        <div className="max-w-2xl mx-auto mb-10">
            <form role="search" action="/blog" method="get" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="blog-search" className="sr-only">Zoek in de artikelen</label>
                <div className="relative h-12">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--foreground-accent)]" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        id="blog-search"
                        name="q"
                        type="search"
                        autoComplete="off"
                        enterKeyHint="search"
                        placeholder="Zoek in alle artikelen"
                        value={query}
                        onFocus={load}
                        onChange={(e) => { setQuery(e.target.value); setAll(false); load(); }}
                        onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }}
                        className="h-12 w-full rounded-full border border-[var(--card-border)] bg-[var(--card-background)] pl-12 pr-4 text-base text-[var(--foreground)] placeholder:text-[var(--foreground-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                    />
                </div>
            </form>
            <div aria-live="polite">
                {active && (
                    <div className="mt-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-background)] p-2 text-left" data-blog-search-results>
                        <p className="px-3 py-2 text-sm text-[var(--foreground-accent)]">
                            {failed
                                ? "Zoeken lukt nu niet. Blader hieronder door de artikelen."
                                : !entries
                                    ? "Even zoeken..."
                                    : found.length
                                        ? `${found.length} ${found.length === 1 ? "artikel" : "artikelen"} gevonden`
                                        : `Geen artikel gevonden voor "${query.trim()}". Probeer een ander woord.`}
                        </p>
                        {shown.length > 0 && (
                            <ul>
                                {shown.map((entry) => (
                                    <li key={entry.slug}>
                                        <Link href={`/blog/${entry.slug}`} className="block rounded-xl px-3 py-3 hover:bg-[var(--secondary)]/10" data-slug={entry.slug}>
                                            <span className="block font-semibold text-[var(--foreground)]">{entry.title}</span>
                                            {entry.excerpt && <span className="mt-1 block text-sm text-[var(--foreground-accent)] line-clamp-2">{entry.excerpt}</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!all && found.length > SHOWN && (
                            <button type="button" onClick={() => setAll(true)} className="w-full rounded-xl px-3 py-3 text-sm font-semibold text-[var(--secondary)] hover:bg-[var(--secondary)]/10">
                                Toon alle {found.length} artikelen
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
