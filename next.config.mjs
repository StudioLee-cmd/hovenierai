/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    async redirects() {
        return [
            { source: '/chatbot-voor-:suffix', destination: '/chatbot', permanent: true },
            { source: '/voice-ai-voor-:suffix', destination: '/voice-ai', permanent: true },
            { source: '/reviews-voor-:suffix', destination: '/reviews', permanent: true },
            { source: '/seo-voor-:suffix', destination: '/seo', permanent: true },
            { source: '/social-media-voor-:suffix', destination: '/social-media', permanent: true },
                    { source: '/blog/greenkeeper-en-golfbaan-onderhoud-b2b-hovenier', destination: '/', permanent: true },
            { source: '/blog/borduur-tuinen-engelse-stijl-high-end-niche', destination: '/', permanent: true },
            { source: '/blog/hekwerk-en-erfafscheiding-aparte-klus-als-hovenier', destination: '/', permanent: true },
            { source: '/blog/watermanagement-tuin-regenwater-infiltratie-wadi', destination: '/', permanent: true },
            { source: '/blog/tuinverlichting-design-installatie-hovenier-upsell-specialisatie', destination: '/', permanent: true },
            { source: '/blog/verticale-tuinen-groene-gevels-hovenier-b2b-niche-specialisatie', destination: '/', permanent: true },
            { source: '/blog/robotmaaier-installatie-jaarservice-hovenier', destination: '/', permanent: true },
            { source: '/blog/sierbestrating-hardscape-hovenier-specialisme', destination: '/', permanent: true },
            { source: '/blog/vijver-aanleg-koivijver-onderhoud-hovenier-specialisme', destination: '/', permanent: true },
            { source: '/blog/hovenier-snoeiwerk-prijsstrategie-marge-2026', destination: '/', permanent: true },
            { source: '/blog/beregening-installatie-hovenier-hunter-rain-bird', destination: '/', permanent: true },
            { source: '/blog/hovenier-specialiseren-5-niches', destination: '/', permanent: true },
            { source: '/blog/duurzame-tuinen-hoveniersdienst', destination: '/', permanent: true },
            { source: '/blog/duurzame-tuinen-hovenierservice-aanbieden', destination: '/', permanent: true },
            { source: '/blog/duurzame-tuinen-hovenier-groeiende-markt', destination: '/', permanent: true },
            { source: '/blog/snoeien-kosten-hovenier-prijzen-tarieven-2026', destination: '/', permanent: true },
            { source: '/blog/robotmaaier-vervangt-hoveniers', destination: '/', permanent: true },
            { source: '/blog/hovenier-seizoensplanning-annuleringen', destination: '/blog/seizoensplanning-hovenier-heel-jaar-werk', permanent: true },
            { source: '/blog/seizoensplanning-hovenier-hele-jaar-werk', destination: '/blog/seizoensplanning-hovenier-heel-jaar-werk', permanent: true },
            { source: '/blog/branding-hovenier', destination: '/blog/hovenier-branding-jaarcontracten-klanten-binden', permanent: true },
            { source: '/blog/social-media-voor-hoveniers', destination: '/blog/social-media-hoveniers-tuinprojecten', permanent: true },
            { source: '/blog/tuinenportfolio-hovenier-projectfotos', destination: '/blog/portfolio-hovenier-opbouwen', permanent: true },
        ];
    },
};

export default nextConfig;
