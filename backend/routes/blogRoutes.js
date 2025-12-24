import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /api/blogs - Get published blogs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; // Default 6 blogs per page
    const skip = (page - 1) * limit;

    // Only select necessary fields for listing (exclude full content)
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title excerpt image_url slug createdAt updatedAt read_time view_count')
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Blog.countDocuments({ published: true });

    res.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// GET /api/blogs/:slug - Get a single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    console.log('Looking for blog with slug:', req.params.slug);
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });

    if (!blog) {
      console.log('Blog not found with slug:', req.params.slug);
      return res.status(404).json({ message: 'Blog post not found' });
    }

    console.log('Found blog:', blog.title);
    // Increment view count
    blog.view_count += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
});

// GET /api/blogs/admin/all - Get all blogs for admin (including drafts)
router.get('/admin/all', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('title excerpt slug published createdAt updatedAt');

    console.log('All blogs in database:', blogs.length);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// GET /api/blogs/debug - Debug endpoint to see all blogs
router.get('/debug/all', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log('Debug - All blogs:', blogs);
    res.json(blogs);
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({ message: 'Error', error: error.message });
  }
});

export default router;