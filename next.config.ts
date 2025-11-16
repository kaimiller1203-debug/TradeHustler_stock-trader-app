/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['react-native-web'],
    }
}

module.exports = nextConfig;
