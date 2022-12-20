/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },
    env: {
        urlApi: 'http://localhost:5050/api/'
    },
}

module.exports = nextConfig