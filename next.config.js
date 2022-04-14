module.exports = {
    images: {
        domains: ['https://master-pola.com', 'master-pola.com']
    },
    async headers() {
        return [
            {
                source: '/(.*).jpg',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=180, stale-while-revalidate=180',
                    }
                ],
            },
            {
                source: '/about',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=180, stale-while-revalidate=180',
                    }
                ],
            },
        ]
    },
}
