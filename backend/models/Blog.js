
import mongoose from 'mongoose';
import slugify from 'slugify';

// Create slug from title
const createSlug = (title) => {
 return slugify(title, {
   lower: true,
   strict: true,
   remove: /[*+~.()'"!:@]/g
 });
};

const blogSchema = new mongoose.Schema({
 title: {
   type: String,
   required: [true, 'Title is required'],
   trim: true,
   maxlength: [200, 'Title cannot exceed 200 characters']
 },
 content: {
   type: String,
   required: [true, 'Content is required'],
   minlength: [10, 'Content must be at least 10 characters']
 },
 excerpt: {
   type: String,
   trim: true,
   maxlength: [500, 'Excerpt cannot exceed 500 characters']
 },
 slug: {
   type: String,
   unique: true,
   lowercase: true,
   trim: true
 },
 image_url: {
   type: String,
   trim: true,
   default: null,
   validate: {
     validator: function(v) {
       return v === null || v === '' || /^https?:\/\/.+/.test(v) || /^data:image\/.+/.test(v);
     },
     message: 'Please provide a valid image URL or upload a file'
   }
 },
 published: {
   type: Boolean,
   default: false
 },
 author_id: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   default: null
 },
 tags: [{
   type: String,
   trim: true,
   lowercase: true
 }],
 seo_title: {
   type: String,
   trim: true,
   maxlength: [60, 'SEO title cannot exceed 60 characters']
 },
 seo_description: {
   type: String,
   trim: true,
   maxlength: [160, 'SEO description cannot exceed 160 characters']
 },
 read_time: {
   type: Number,
   default: 0
 },
 view_count: {
   type: Number,
   default: 0
 }
}, {
 timestamps: true,
 toJSON: { virtuals: true },
 toObject: { virtuals: true }
});

// Indexes for better performance (already defined in schema above)

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
 if (this.isModified('title') && !this.slug) {
   this.slug = createSlug(this.title);
 }
 next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
