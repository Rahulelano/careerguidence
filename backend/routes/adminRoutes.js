import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /api/admin - Admin dashboard info
router.get('/', (req, res) => {
  res.json({
    message: 'Admin API Endpoint',
    endpoints: {
      blogs: '/api/admin/blogs',
      all_blogs: '/api/blogs/admin/all'
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  });
});

// POST /api/admin/blogs - Create a new blog post
router.post('/blogs', async (req, res) => {
  try {
    const { title, content, excerpt, image_url, published, tags } = req.body;

    // Generate initial slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Ensure slug is unique
    let slugExists = await Blog.findOne({ slug });
    let counter = 1;

    while (slugExists) {
      const newSlug = `${slug}-${counter}`;
      slugExists = await Blog.findOne({ slug: newSlug });
      if (!slugExists) {
        slug = newSlug;
      }
      counter++;
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      image_url,
      image_url,
      published: published || false,
      tags,
      slug
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'A blog with similar title already exists. Please choose a different title.' });
    } else {
      res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
  }
});

// PUT /api/admin/blogs/:id - Update a blog post
router.put('/blogs/:id', async (req, res) => {
  try {
    const { title, content, excerpt, image_url, published, tags } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.title = title;
    blog.content = content;
    blog.excerpt = excerpt;
    blog.image_url = image_url;
    blog.published = published;
    blog.tags = tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Slug already exists' });
    } else {
      res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
  }
});

// DELETE /api/admin/blogs/:id - Delete a blog post
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
});

export default router;