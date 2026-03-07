import { MetadataRoute } from 'next'
import { getAllPosts } from '@/utils/posts'
import { authors } from '@/data/authors'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.hovenierai.nl'

    // Static routes
    const staticRoutes = [
        '',
        '/blog',
        '/gratis-scan',
        '/review-pakket',
        '/privacy',
        '/legal',
        '/algemene-voorwaarden',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic blog post routes
    const posts = getAllPosts()
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Dynamic author routes
    const authorRoutes = authors.map((author) => ({
        url: `${baseUrl}/author/${author.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    }))

    return [...staticRoutes, ...blogRoutes, ...authorRoutes]
}
