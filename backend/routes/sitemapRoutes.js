import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /sitemap.xml
router.get('/', async (req, res) => {
    try {
        const baseUrl = 'https://careerguidancecoach.com'; // Production domain

        // Static pages
        const staticPages = [
            '',
            '/about',
            '/services',
            '/blog',
            '/faq',
            '/services/career-guidance',
            '/services/indian-admission',
            '/services/overseas-admission',
            '/services/test-preparation',
            '/services/educational-loans'
        ];

        // Get all published blogs
        const blogs = await Blog.find({ published: true }).select('slug updatedAt');

        // Generate XML
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static pages
        staticPages.forEach(page => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
            sitemap += '    <changefreq>weekly</changefreq>\n';
            sitemap += '    <priority>0.8</priority>\n';
            sitemap += '  </url>\n';
        });

        // Add blog posts
        blogs.forEach(blog => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
            sitemap += `    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>\n`;
            sitemap += '    <changefreq>daily</changefreq>\n';
            sitemap += '    <priority>0.6</priority>\n';
            sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
});

export default router;
