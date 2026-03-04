import { authors, getAuthorBySlug } from '@/data/authors';
import { posts } from '@/data/posts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiMail, FiLinkedin, FiTwitter } from 'react-icons/fi';

export async function generateStaticParams() {
    return authors.map((author) => ({
        slug: author.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = getAuthorBySlug(slug);

    if (!author) {
        return {
            title: 'Author Not Found',
        };
    }

    return {
        title: `${author.name} - KapperAI`,
        description: author.bio,
    };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = getAuthorBySlug(slug);

    if (!author) {
        notFound();
    }

    // Get all posts by this author
    const authorPosts = posts.filter(post => post.authorSlug === author.slug);

    return (
        <div className="min-h-screen bg-hero-background">
            {/* Author Header */}
            <div className="max-w-4xl mx-auto px-5 py-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Author Photo */}
                        <div className="flex-shrink-0">
                            <Image
                                src={author.image}
                                alt={author.name}
                                width={200}
                                height={200}
                                className="rounded-2xl"
                            />
                        </div>

                        {/* Author Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
                            <p className="text-xl text-blue-600 mb-4">{author.role}</p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">{author.bio}</p>

                            {/* Social Links */}
                            {author.social && (
                                <div className="flex gap-4">
                                    {author.social.email && (
                                        <a
                                            href={`mailto:${author.social.email}`}
                                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <FiMail size={20} />
                                            <span>Email</span>
                                        </a>
                                    )}
                                    {author.social.linkedin && (
                                        <a
                                            href={author.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <FiLinkedin size={20} />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {author.social.twitter && (
                                        <a
                                            href={author.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <FiTwitter size={20} />
                                            <span>Twitter</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Author's Posts */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-8">Artikelen door {author.name}</h2>
                    <div className="grid gap-6">
                        {authorPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-6">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={200}
                                        height={150}
                                        className="rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-3">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <div className="flex gap-2">
                                                {post.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
