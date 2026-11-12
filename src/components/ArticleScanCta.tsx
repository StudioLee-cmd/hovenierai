import React from 'react';
import Link from 'next/link';
import { articleFooter } from '@/data/articleFooter';

// Northstar own-site template (clusters/seo/own-sites/template): the free-scan button under every article.
export default function ArticleScanCta() {
    return (
        <aside data-scan-cta-block className="mt-12 p-6 md:p-8 bg-[var(--card-background)] rounded-2xl border border-[var(--card-border)]">
            <p className="text-xl font-bold text-[var(--foreground)] mb-2">Waar laat jouw {articleFooter.bedrijf} aanvragen liggen?</p>
            <p className="text-[var(--foreground-accent)] mb-6">
                De gratis scan geeft je site een cijfer op vindbaarheid in Google, conversie, AI-vindbaarheid en lokale signalen, met de belangrijkste verbeterpunten in je inbox.
            </p>
            <Link
                href="/gratis-scan"
                data-scan-cta
                className="inline-flex items-center justify-center text-black bg-primary hover:bg-primary-accent px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap"
            >
                Start de gratis scan
            </Link>
        </aside>
    );
}
