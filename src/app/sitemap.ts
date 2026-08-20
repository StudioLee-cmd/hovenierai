import { MetadataRoute } from 'next'
import { getAllPosts } from '@/utils/posts'
import { authors } from '@/data/authors'

// ─── SITEMAP-LASTMOD:START — gegenereerd door alpha1/scripts/sitemap_lastmod.py (niet met de hand bewerken)
// Per route de datum van de NIEUWSTE commit die inhoud onder src/app/<route>/ toevoegde of
// wijzigde. Handmatig bijwerken hoeft niet en mag niet — draai het script hierboven opnieuw.
// De vloot-gate `check_fleet_deploys.py --sitemap-lastmod` wordt rood zodra een route een
// nieuwere inhoud-commit draagt dan de datum hieronder; de oude regel 'bump manually' hield
// van 2026-04-01 tot 2026-08-05 niet, en dat kostte 210 URL's hun vers-signaal bij Google.
const STATIC_LASTMOD_BY_ROUTE: Record<string, string> = {
    '/gratis-scan': '2026-08-07',
    '/review-pakket': '2026-07-25',
    '/tarieven': '2026-08-14',
    '/gratis-website': '2026-07-25',
    '/chatbot': '2026-07-25',
    '/voice-ai': '2026-07-25',
    '/seo': '2026-07-25',
    '/reviews': '2026-07-25',
    '/social-media': '2026-07-25',
    '/privacy': '2026-07-25',
    '/legal': '2026-07-25',
    '/algemene-voorwaarden': '2026-07-27',
    '/automatisering': '2026-07-25',
    '/crm': '2026-07-25',
    '/free-trial': '2026-08-12',
}
const STATIC_LASTMOD_FALLBACK = '2026-08-14'
const STATIC_LASTMOD = new Date(`${STATIC_LASTMOD_FALLBACK}T00:00:00Z`)
const staticLastmod = (route: string): Date =>
    new Date(`${STATIC_LASTMOD_BY_ROUTE[route] ?? STATIC_LASTMOD_FALLBACK}T00:00:00Z`)
// ─── SITEMAP-LASTMOD:EIND

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
            '/automatisering',
            '/crm',
            '/free-trial',
    ]
    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastmod(route),
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
