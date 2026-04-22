import { MetadataRoute } from 'next'
import { getAllPosts } from '@/utils/posts'
import { authors } from '@/data/authors'

// Hardcoded lastmod for static landing pages. Bump manually when you meaningfully edit one of these pages.
// Using a stable date avoids signalling to Google that every URL changed on every build.
const STATIC_LASTMOD = new Date('2026-04-01T00:00:00Z')

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.hovenierai.nl'

    const posts = getAllPosts()
    // Latest article date = proxy for "/ and /blog last changed"
    const latestPostDate = posts.length
        ? new Date(
            posts.reduce((max, p) => (new Date(p.date) > new Date(max) ? p.date : max), posts[0].date)
          )
        : STATIC_LASTMOD

    // Static routes — rarely change. Stable lastmod.
    const staticPages = [
        '/gratis-scan', '/review-pakket',
        '/tarieven', '/gratis-website',
        '/chatbot', '/voice-ai', '/seo', '/reviews', '/social-media',
        '/privacy', '/legal', '/algemene-voorwaarden',
    ]
    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: (route === '/tarieven' || route === '/gratis-website') ? 'monthly' as const : 'yearly' as const,
        priority: (route === '/tarieven' || route === '/gratis-website') ? 0.9 : 0.7,
    }))

    // Homepage — gets a "fresh" signal whenever a new article is published
    const home = [{
        url: `${baseUrl}/`,
        lastModified: latestPostDate,
        changeFrequency: 'daily' as const,
        priority: 1,
    }]

    // Blog index
    const blogIndex = [{
        url: `${baseUrl}/blog`,
        lastModified: latestPostDate,
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }]

    // Individual blog posts — true per-article lastmod
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
    }))

    // Author pages refresh when a new article by that author is added.
    const authorRoutes = authors.map((author) => {
        const authorLatest = posts
            .filter((p) => p.authorSlug === author.slug)
            .reduce<Date>((max, p) => {
                const d = new Date(p.date)
                return d > max ? d : max
            }, STATIC_LASTMOD)
        return {
            url: `${baseUrl}/author/${author.slug}`,
            lastModified: authorLatest,
            changeFrequency: 'weekly' as const,
            priority: 0.3,
        }
    })

    return [...home, ...staticRoutes, ...blogIndex, ...blogRoutes, ...authorRoutes]
}
