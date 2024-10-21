/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300
            }
        }
        return config
    },
    images: {
        domains: ["uploadthing.com", "utfs.io"]
    }
}

export default nextConfig;
