import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { apiClient } from "@/lib/api";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import logoImage from "@/assets/logo.jpeg";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  slug: string;
  published: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    published: false,
    tags: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get<Blog[]>('/api/blogs/admin/all');
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch blogs');
      }
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: "Error",
        description: "Failed to load blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.content.length < 10) {
      toast({
        title: "Error",
        description: "Content must be at least 10 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = formData.image_url;

      if (selectedFile) {
        if (selectedFile.size > 5 * 1024 * 1024) {
          toast({
            title: "Error",
            description: "File size must be less than 5MB",
            variant: "destructive",
          });
          return;
        }

        setUploading(true);
        try {
          imageUrl = await handleFileUpload(selectedFile);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to process image file",
            variant: "destructive",
          });
          return;
        } finally {
          setUploading(false);
          setSubmitting(false);
        }
      }

      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        image_url: imageUrl,
        published: formData.published,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
      };

      let response;
      if (editingBlog) {
        response = await apiClient.put<Blog>(`/api/admin/blogs/${editingBlog._id}`, blogData);
      } else {
        response = await apiClient.post<Blog>('/api/admin/blogs', blogData);
      }

      if (!response.success) {
        throw new Error(response.error || 'Failed to save blog');
      }

      if (editingBlog) {
        toast({ title: "Success", description: "Blog updated successfully" });
      } else {
        toast({ title: "Success", description: "Blog created successfully" });
      }

      setFormData({ title: "", content: "", excerpt: "", image_url: "", published: false, tags: "" });
      setEditingBlog(null);
      setSelectedFile(null);
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      let errorMessage = "Failed to save blog";
      if (error instanceof Error) {
        if (error.message.includes('similar title already exists')) {
          errorMessage = "A blog post with a similar title already exists. Please choose a different title.";
        } else {
          errorMessage = error.message;
        }
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await apiClient.delete(`/api/admin/blogs/${id}`);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete blog');
      }
      toast({ title: "Success", description: "Blog deleted successfully" });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      image_url: blog.image_url || "",
      published: blog.published,
      tags: blog.tags ? blog.tags.join(', ') : ""
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logoImage} alt="Wise Wave Edu Solutions Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-red-600">Wise Wave Edu Solutions</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
              <Button variant="outline" onClick={() => setIsContactModalOpen(true)}>Get Started</Button>
            </div>
            <div className="md:hidden">
              <HamburgerMenu isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setShowForm(true)}><Plus className="mr-2 h-4 w-4" />New Blog Post</Button>
            <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Tags / Keywords (comma separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Example: career, education, tips</p>
                </div>

                <Input placeholder="Image URL (optional)" value={formData.image_url} onChange={(e) => {
                  setFormData({ ...formData, image_url: e.target.value });
                  if (e.target.value.trim()) setSelectedFile(null);
                }} />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Or upload an image file:</label>
                  <Input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        toast({ title: "Error", description: "File size must be less than 5MB", variant: "destructive" });
                        return;
                      }
                      setSelectedFile(file);
                      setFormData({ ...formData, image_url: "" });
                    } else setSelectedFile(null);
                  }} className="cursor-pointer" />
                </div>

                <Textarea placeholder="Excerpt (optional)" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
                <Textarea placeholder="Blog Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} required />

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
                  <label htmlFor="published">Publish immediately</label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={uploading || submitting}>{submitting ? 'Saving...' : uploading ? 'Uploading...' : (editingBlog ? 'Update' : 'Create')} Blog Post</Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                    setFormData({ title: "", content: "", excerpt: "", image_url: "", published: false, tags: "" });
                    setSelectedFile(null);
                  }}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {loading ? <div className="text-center py-8">Loading blogs...</div> : blogs.length === 0 ? <div className="text-center py-8">No blog posts found.</div> : blogs.map((blog) => (
            <Card key={blog._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-muted-foreground mb-2">{blog.excerpt || (blog.content ? blog.content.substring(0, 100) + '...' : 'No excerpt available')}</p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {blog.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Status: {blog.published ? 'Published' : 'Draft'}</span>
                      <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(blog)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(blog._id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Admin;