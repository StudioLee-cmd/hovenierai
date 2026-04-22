"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Author {
    name: string;
    image: string;
}

interface PostWithAuthor {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    tags: string[];
    cluster: string;
    author: Author | null;
}

interface ClusterInfo {
    id: string;
    label: string;
    count: number;
}

interface BlogGridProps {
    posts: PostWithAuthor[];
    clusters: ClusterInfo[];
}

function getSupportImage(heroImage: string): string {
    const lastDot = heroImage.lastIndexOf(".");
    if (lastDot === -1) return heroImage + "-2";
    return heroImage.substring(0, lastDot) + "-2" + heroImage.substring(lastDot);
}

export default function BlogGrid({ posts, clusters }: BlogGridProps) {
    const [activeCluster, setActiveCluster] = useState<string>("all");

    const filteredPosts = useMemo(() => {
        if (activeCluster === "all") return posts;
        return posts.filter((post) => post.cluster === activeCluster);
    }, [posts, activeCluster]);

    return (
        <>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
                <button
                    onClick={() => setActiveCluster("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCluster === "all"
                            ? "bg-[var(--secondary)] text-white shadow-md"
                            : "bg-[var(--secondary)]/10 text-[var(--foreground-accent)] hover:bg-[var(--secondary)]/20"
                    }`}
                >
                    Alles ({posts.length})
                </button>
                {clusters.map((cluster) => (
                    <button
                        key={cluster.id}
                        onClick={() => setActiveCluster(cluster.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeCluster === cluster.id
                                ? "bg-[var(--secondary)] text-white shadow-md"
                                : "bg-[var(--secondary)]/10 text-[var(--foreground-accent)] hover:bg-[var(--secondary)]/20"
                        }`}
                    >
                        {cluster.label} ({cluster.count})
                    </button>
                ))}
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <div
                        key={post.slug}
                        className="group flex flex-col h-full border border-[var(--card-border)] bg-[var(--card-background)] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <Link
                            href={`/blog/${post.slug}`}
                            className="relative h-48 w-full overflow-hidden"
                        >
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Supporting image: only for articles from 2026-04-15 onwards */}
                            {post.date >= "2026-04-15" && (
                                <img
                                    src={getSupportImage(post.image)}
                                    alt={post.title}
                                    loading="lazy"
                                    className="absolute inset-0 z-10 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            )}
                        </Link>
                        <div className="flex flex-col flex-grow p-6">
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-[var(--foreground-accent)] text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto flex items-center justify-between text-xs text-[var(--foreground-accent)]">
                                <span>
                                    {new Date(post.date).toLocaleDateString("nl-NL", { timeZone: "Europe/Amsterdam",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={post.author.image}
                                            alt={post.author.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span>{post.author.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <p className="text-center text-[var(--foreground-accent)] py-12">
                    Geen artikelen gevonden in deze categorie.
                </p>
            )}
        </>
    );
}
