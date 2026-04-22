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
        ];
    },
};

export default nextConfig;
