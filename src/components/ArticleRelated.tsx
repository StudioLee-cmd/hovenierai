import React from 'react';
import Link from 'next/link';
import type { IPost } from '@/utils/posts';

// Northstar own-site template (clusters/seo/own-sites/template): related articles under every article.
// Same cluster first, then shared tags, then the newest; never the article itself.
export function relatedPosts(current: IPost, posts: IPost[], count = 3): IPost[] {
    const tags = new Set(current.tags.map((t) => t.toLowerCase()));
    return posts
        .filter((p) => p.slug !== current.slug)
        .map((p) => ({
            post: p,
            score: (p.cluster && p.cluster === current.cluster ? 3 : 0) + p.tags.filter((t) => tags.has(t.toLowerCase())).length,
        }))
        .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
        .slice(0, count)
        .map((x) => x.post);
}

export default function ArticleRelated({ current, posts }: { current: IPost; posts: IPost[] }) {
    const related = relatedPosts(current, posts);
    if (related.length === 0) return null;
    return (
        <section data-related-articles className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Verder lezen</h2>
            <ul className="grid gap-4 md:grid-cols-3">
                {related.map((p) => (
                    <li key={p.slug}>
                        <Link
                            href={`/blog/${p.slug}`}
                            className="block h-full p-5 bg-[var(--card-background)] rounded-2xl border border-[var(--card-border)] hover:border-[var(--secondary)] transition-colors"
                        >
                            <span className="block font-semibold text-[var(--foreground)] mb-2 [overflow-wrap:anywhere]">{p.title}</span>
                            <span className="block text-sm text-[var(--foreground-accent)] line-clamp-3">{p.excerpt}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
