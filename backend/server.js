import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Trust proxy for production (Optional, kept for generic production support)
// if (isProduction) {
//   app.set('trust proxy', 1);
// }

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);

    // Development origins (Vite dev server)
    const devOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://localhost:8083',
      'http://localhost:4000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:8081',
      'http://127.0.0.1:8082',
      'http://127.0.0.1:8083',
      'http://127.0.0.1:4000',
      'file://'
    ];

    // Production origins
    const prodOrigins = [
      'https://careerguidancecoach.com',
      'https://www.careerguidancecoach.com'
    ];

    // Custom CORS origin from environment
    const customOrigin = process.env.CORS_ORIGIN;

    const allAllowedOrigins = [
      ...devOrigins,
      ...prodOrigins
    ];

    // Add custom origin if specified
    if (customOrigin) {
      allAllowedOrigins.push(customOrigin);
    }

    // Check if origin matches any allowed pattern
    const isAllowed = allAllowedOrigins.some(allowed => {
      // Handle exact string matches
      if (typeof allowed === 'string') {
        // Special handling for file:// protocol
        if (allowed === 'file://') {
          return origin.startsWith('file://');
        }
        return allowed === origin;
      }
      return false;
    });

    console.log('CORS check:', {
      origin,
      isAllowed,
      isProduction,
      devAllowed: devOrigins.some(o => origin?.includes(o.replace('http://', ''))),
      prodAllowed: prodOrigins.some(o => origin === o)
    });

    if (isAllowed || isProduction || devOrigins.some(o => origin?.includes(o.replace('http://', '')))) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Root endpoint with API information
app.get('/', (req, res) => {
  res.json({
    message: 'Elevate Futures Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      blogs: '/api/blogs',
      admin: '/api/admin',
      quiz: '/api/quiz'
    },
    admin_endpoints: {
      'GET /api/admin': 'Admin dashboard info',
      'POST /api/admin/blogs': 'Create new blog',
      'PUT /api/admin/blogs/:id': 'Update blog',
      'DELETE /api/admin/blogs/:id': 'Delete blog',
      'GET /api/blogs/admin/all': 'Get all blogs (admin)'
    },
    docs: 'Add /api/ endpoint to access specific routes'
  });
});

import sitemapRoutes from './routes/sitemapRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/sitemap.xml', sitemapRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Elevate Futures Backend API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Elevate Futures Backend Server is running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});