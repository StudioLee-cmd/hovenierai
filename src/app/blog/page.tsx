import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/utils/posts';
import { getAuthorBySlug } from '@/data/authors';
import Container from '@/components/Container';

const BlogPage = async () => {
    const posts = await Promise.resolve(getAllPosts());

    return (
        <div className="py-24 bg-[var(--background)]">
            <Container>
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]">Waarom Kiezen Voor HovenierAI</h1>
                    <p className="text-xl text-[var(--foreground-accent)] max-w-2xl mx-auto">
                        Het laatste nieuws, tips en inzichten over AI voor hoveniers en hoveniersbedrijven.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const author = getAuthorBySlug(post.authorSlug);
                        return (
                            <div key={post.slug} className="group flex flex-col h-full border border-[var(--card-border)] bg-[var(--card-background)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <Link href={`/blog/${post.slug}`} className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </Link>
                                <div className="flex flex-col flex-grow p-6">
                                    <div className="flex gap-2 mb-3">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded-full">
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
                                        <span>{new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        {author && (
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={author.image}
                                                    alt={author.name}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                                <span>{author.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default BlogPage;
