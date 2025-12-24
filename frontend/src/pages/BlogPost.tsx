import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowLeft, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cachedApiClient } from "@/lib/api";
import HamburgerMenu from "@/components/HamburgerMenu";
import SocialShare from "@/components/SocialShare";
import WhatsappFloat from "@/components/WhatsappFloat";
import logoImage from "@/assets/logo.jpeg";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      console.log('Fetching blog with slug:', slug);
      const response = await cachedApiClient.get(`/api/blogs/${slug}`);

      if (!response.success) {
        if (response.error?.includes('404') || response.error?.includes('not found')) {
          throw new Error('Blog post not found');
        }
        throw new Error(response.error || 'Failed to fetch blog');
      }

      const data = response.data as Blog;
      console.log('Blog data received:', data);
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load blog post. Please check your internet connection and try again.",
        variant: "destructive",
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-primary">Wise Wave</span>
              </Link>
  
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
              </div>
  
              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-primary">Wise Wave</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-foreground mb-2">Unable to Load Blog Post</h1>
            <p className="text-muted-foreground mb-6">
              There was an error loading the blog post. Please check your internet connection and try again.
            </p>
            <div className="space-y-3">
              <Button onClick={() => window.location.reload()} variant="default">
                Try Again
              </Button>
              <Link to="/blog">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-primary">Wise Wave</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-foreground mb-2">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Wise Wave Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-primary">Wise Wave</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <HamburgerMenu
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(blog.content)}</span>
                </div>
              </div>
            </header>

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare
                title={blog.title}
                description={blog.excerpt || `${blog.title} - Wise Wave Career Guidance`}
                url={window.location.href}
              />
            </div>

            {/* Featured Image */}
            {blog.image_url && (
              <div className="mb-8">
                <img 
                  src={blog.image_url} 
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-medium"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.split('\n').map(paragraph => 
                    paragraph.trim() ? `<p class="mb-6">${paragraph}</p>` : ''
                  ).join('')
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-muted-foreground">
                    Published on {formatDate(blog.createdAt)}
                  </p>
                  {blog.updatedAt !== blog.createdAt && (
                    <p className="text-sm text-muted-foreground">
                      Last updated on {formatDate(blog.updatedAt)}
                    </p>
                  )}
                </div>
                <div className="space-x-2">
                  <Link to="/blog">
                    <Button variant="outline">
                      More Articles
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="default">
                      Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Related Content CTA */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized career guidance and expert support for your educational journey
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:space-x-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                window.location.href = 'https://calendly.com/leadssuresha/30min';
              }}
            >
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Logo"
                  className="h-16 w-auto"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Wise Wave</h3>
                  <p className="text-sm text-gray-300">Career Guidance Platform</p>
                </div>
              </div>
              <p className="text-background/80">Empowering students to make informed career decisions</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/services/career-guidance" className="hover:text-background transition-colors">Career Guidance</Link></li>
                <li><Link to="/services/indian-admission" className="hover:text-background transition-colors">Indian Admission</Link></li>
                <li><Link to="/services/overseas-admission" className="hover:text-background transition-colors">Overseas Admission</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/blog" className="hover:text-background transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link></li>
                <li><a href="#contact" className="hover:text-background transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-background/80">34 -15,2nd Street MGR Nagar Sidco Coimbatore Tamil Nadu 641021</p>
              <p className="text-background/80">Email: enquiry@careerguidancecoach.com</p>
              <p className="text-background/80">Phone: 9443690870</p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Wise Wave. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsappFloat />
    </div>
  );
};

export default BlogPost;