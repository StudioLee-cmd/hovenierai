import React from 'react';
import { getAllPosts } from '@/utils/posts';
import { getAuthorBySlug } from '@/data/authors';
import Container from '@/components/Container';
import BlogGrid from '@/components/BlogGrid';

import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
    title: `Blog over AI voor ${siteDetails.niche.toLowerCase()} | ${siteDetails.siteName}`,
    description: `Artikelen en tips over AI voor ${siteDetails.niche.toLowerCase()}: minder tijd aan de telefoon, slimmer plannen en meer reviews verzamelen zonder extra werk.`,
    alternates: { canonical: `${siteDetails.siteUrl}blog` },
};

const CLUSTER_LABELS: Record<string, string> = {
    "vindbaarheid": "Vindbaarheid",
    "voice-ai": "Voice AI",
    "chatbot": "Chatbot",
    "reviews": "Reviews",
    "website": "Website",
    "social-media": "Social Media",
    "automatisering": "Automatisering",
    "branding": "Branding",
};

const BlogPage = async () => {
    const posts = await Promise.resolve(getAllPosts());

    const postsWithAuthors = posts.map((post) => {
        const author = getAuthorBySlug(post.authorSlug);
        return {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            image: post.image,
            tags: post.tags,
            cluster: post.cluster,
            author: author ? { name: author.name, image: author.image } : null,
        };
    });

    const clusterCounts = new Map<string, number>();
    posts.forEach((post) => {
        if (post.cluster) {
            clusterCounts.set(post.cluster, (clusterCounts.get(post.cluster) || 0) + 1);
        }
    });

    const clusters = Array.from(clusterCounts.entries())
        .map(([id, count]) => ({
            id,
            label: CLUSTER_LABELS[id] || id,
            count,
        }))
        .sort((a, b) => b.count - a.count);

    return (
        <div className="py-24 bg-[var(--background)]">
            <Container>
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]">Waarom Kiezen Voor HovenierAI</h1>
                    <p className="text-xl text-[var(--foreground-accent)] max-w-2xl mx-auto">
                        Het laatste nieuws, tips en inzichten over AI voor hoveniers en hoveniersbedrijven.
                    </p>
                </div>

                <BlogGrid posts={postsWithAuthors} clusters={clusters} />
            </Container>
        </div>
    );
};

export default BlogPage;
