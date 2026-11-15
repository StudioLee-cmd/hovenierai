import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, getPostHtml, getRelatedPosts } from '@/utils/posts';
import { getAuthorBySlug } from '@/data/authors';
import { siteDetails } from '@/data/siteDetails';
import Container from '@/components/Container';
import BlogContent from '@/components/BlogContent';
import { FiArrowLeft, FiClock } from 'react-icons/fi';

const SITE_URL = 'https://www.hovenierai.nl';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    const url = `${SITE_URL}/blog/${slug}`;
    const image = post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
    return {
        title: post.seoTitle || post.title,
        description: post.excerpt,
        alternates: { canonical: url },
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.excerpt,
            url,
            type: 'article',
            locale: 'nl_NL',
            siteName: SITE_URL.replace('https://www.', ''),
            images: [{ url: image }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.excerpt,
            images: [image],
        },
    };
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const contentHtml = await getPostHtml(slug);
    const author = getAuthorBySlug(post.authorSlug);
    const related = getRelatedPosts(slug);


    const postUrl = `${SITE_URL}/blog/${slug}`;
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        image: post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        author: {
            '@type': 'Person',
            name: author ? author.name : 'Tim van der Lee',
            url: author ? `${SITE_URL}/author/${author.slug}` : SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: siteDetails.siteName,
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}${siteDetails.siteLogo}` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        inLanguage: 'nl',
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
    };

    return (
        <div className="py-24 bg-[var(--background)]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Container className="max-w-4xl">
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[var(--foreground-accent)] hover:text-[var(--secondary)] transition-colors">
                        <FiArrowLeft className="mr-2" />
                        Terug naar overzicht
                    </Link>
                </div>

                <div className="relative h-[200px] md:h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--foreground)] leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--foreground-accent)] mb-8 pb-8 border-b border-[var(--card-border)]">
                        {author && (
                            <Link href={`/author/${author.slug}`} className="flex items-center gap-2 hover:text-[var(--secondary)] transition-colors">
                                <Image
                                    src={author.image}
                                    alt={author.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="whitespace-nowrap">{author.name}</span>
                            </Link>
                        )}
                        <div className="flex items-center gap-2">
                            <FiClock size={18} />
                            <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString("nl-NL", { timeZone: "Europe/Amsterdam", year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-semibold text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <BlogContent content={contentHtml} />

                    <aside aria-label="Gratis scan" className="mt-12 p-6 md:p-8 rounded-2xl border border-[var(--secondary)]/30 bg-[var(--secondary)]/10">
                        <p className="text-xl font-bold text-[var(--foreground)] mb-2">Waar laat jouw hoveniersbedrijf aanvragen liggen?</p>
                        <p className="text-[var(--foreground-accent)] mb-5">De gratis scan geeft je site een cijfer op vindbaarheid in Google, conversie, AI-vindbaarheid en lokale signalen, met de belangrijkste verbeterpunten in je inbox.</p>
                        <Link href={`/gratis-scan?bron=blog-${slug}`} className="inline-block px-6 py-3 rounded-full bg-[var(--secondary)] text-white font-semibold hover:opacity-90 transition-opacity">
                            Start de gratis scan
                        </Link>
                    </aside>

                    {related.length > 0 && (
                        <nav aria-labelledby="verder-lezen" className="mt-12 pt-8 border-t border-[var(--card-border)]">
                            <h2 id="verder-lezen" className="text-2xl font-bold mb-6 text-[var(--foreground)]">Verder lezen</h2>
                            <ul className="grid gap-4 md:grid-cols-2">
                                {related.map((item) => (
                                    <li key={item.slug}>
                                        <Link href={`/blog/${item.slug}`} className="block h-full p-5 bg-[var(--card-background)] rounded-2xl border border-[var(--card-border)] hover:border-[var(--secondary)] transition-colors">
                                            <span className="block font-semibold text-[var(--foreground)]">{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    {author && (
                        <div className="mt-12 p-6 bg-[var(--card-background)] rounded-2xl border border-[var(--card-border)]">
                            <div className="flex gap-4 items-start">
                                <Link href={`/author/${author.slug}`}>
                                    <Image
                                        src={author.image}
                                        alt={author.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link href={`/author/${author.slug}`} className="text-xl font-bold text-[var(--foreground)] hover:text-[var(--secondary)] transition-colors">
                                        {author.name}
                                    </Link>
                                    <p className="text-sm text-[var(--secondary)] mb-2">{author.role}</p>
                                    <p className="text-[var(--foreground-accent)] text-sm">{author.bio}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default BlogPostPage;
