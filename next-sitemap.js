module.exports = {
    siteUrl: process.env.SITE_URL || 'https://master-pola.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://master-pola.com/server-sitemap.xml',
        ],
        policies: [
            {
                userAgent: '*',
                allow: '/',
            }
        ]
    }
}
