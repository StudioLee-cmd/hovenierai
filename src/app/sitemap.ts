import { MetadataRoute } from 'next'
import { getAllPosts } from '@/utils/posts'
import { authors } from '@/data/authors'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.hovenierai.nl'

    // Static routes — rarely change
    const staticPages = ['', '/gratis-scan', '/review-pakket', '/privacy', '/legal', '/algemene-voorwaarden']
    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: route === '' ? 1 : 0.5,
    }))

    // Blog index — new posts daily
    const blogIndex = [{
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }]

    // Individual blog posts — updated yearly at most
    const posts = getAllPosts()
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
    }))

    // Author pages
    const authorRoutes = authors.map((author) => ({
        url: `${baseUrl}/author/${author.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    }))

    return [...staticRoutes, ...blogIndex, ...blogRoutes, ...authorRoutes]
}
