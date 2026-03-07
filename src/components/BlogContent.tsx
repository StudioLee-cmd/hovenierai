'use client';

import React from 'react';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <>
            <style jsx global>{`
                .blog-content {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: var(--foreground-accent);
                }
                .blog-content h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    color: var(--foreground);
                    line-height: 1.3;
                }
                .blog-content h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    color: var(--foreground);
                    line-height: 1.4;
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                    color: var(--foreground-accent);
                }
                .blog-content strong {
                    color: var(--foreground);
                    font-weight: 600;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 2rem;
                    padding-left: 1.5rem;
                }
                .blog-content li {
                    margin-bottom: 0.75rem;
                    color: var(--foreground-accent);
                    line-height: 1.7;
                }
                .blog-content ul li {
                    list-style-type: none;
                    position: relative;
                    padding-left: 1.5rem;
                }
                .blog-content ul li:before {
                    content: "→";
                    position: absolute;
                    left: 0;
                    color: var(--secondary);
                    font-weight: 600;
                }
                .blog-content ol {
                    counter-reset: item;
                }
                .blog-content ol li {
                    counter-increment: item;
                    list-style-type: none;
                    position: relative;
                    padding-left: 2rem;
                }
                .blog-content ol li:before {
                    content: counter(item) ".";
                    position: absolute;
                    left: 0;
                    color: var(--secondary);
                    font-weight: 700;
                    font-size: 1.125rem;
                }
                .blog-content blockquote {
                    border-left: 4px solid var(--secondary);
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    background: var(--card-background);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    font-style: italic;
                    color: var(--foreground-accent);
                    border: 1px solid var(--card-border);
                    border-left-width: 4px;
                }
                .blog-content blockquote p {
                    margin-bottom: 0.75rem;
                }
                .blog-content blockquote p:last-child {
                    margin-bottom: 0;
                }

                .blog-content a {
                    color: var(--secondary);
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    transition: color 0.2s;
                }
                .blog-content a:hover {
                    color: var(--foreground);
                }

                /* Dark mode overrides for specific elements if needed */
                .dark .blog-content {
                    color: #d1d5db; /* gray-300 */
                }
                .dark .blog-content h2, 
                .dark .blog-content h3, 
                .dark .blog-content strong {
                    color: #ffffff;
                }
                .dark .blog-content p,
                .dark .blog-content li {
                    color: #d1d5db;
                }
            `}</style>
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </>
    );
}
