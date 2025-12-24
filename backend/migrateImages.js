import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from './models/Blog.js';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const migrateImages = async () => {
    await connectDB();

    try {
        const blogs = await Blog.find({});
        console.log(`Found ${blogs.length} blogs to check...`);

        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        for (const blog of blogs) {
            if (blog.image_url && blog.image_url.startsWith('data:image')) {
                console.log(`Migrating image for blog: ${blog.title}`);

                // Extract extension and data
                const matches = blog.image_url.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);

                if (matches && matches.length === 3) {
                    const ext = matches[1];
                    const data = matches[2];
                    const buffer = Buffer.from(data, 'base64');

                    const filename = `migrated-${blog._id}-${Date.now()}.${ext}`;
                    const filePath = path.join(uploadDir, filename);

                    fs.writeFileSync(filePath, buffer);
                    console.log(`Saved file: ${filename}`);

                    // Update blog record (assuming localhost:5000 - adapt if domain changes in prod, but for now this fixes localhost)
                    // In production, this URL should be updated or relative path used
                    const port = process.env.PORT || 5000;
                    blog.image_url = `http://localhost:${port}/uploads/${filename}`;
                    await blog.save();
                    console.log('Database updated.');
                } else {
                    console.warn(`Could not parse Base64 for blog: ${blog.title}`);
                }
            } else {
                console.log(`Skipping blog (no Base64 image): ${blog.title}`);
            }
        }

        console.log('Migration complete!');
        process.exit();

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateImages();
