import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cachedApiClient } from "@/lib/api";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import logoImage from "@/assets/logo.jpeg";

interface Blog {
  _id: string;
  title: string;
  content?: string; // Made optional since we won't fetch it initially
  excerpt: string | null;
  image_url: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  read_time?: number;
  view_count?: number;
}

interface BlogResponse {
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (page = 1, append = false) => {
    try {
      setError(null);
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      console.log(`Fetching blogs - page: ${page}, append: ${append}`);

      const response = await cachedApiClient.get<BlogResponse>(`/api/blogs?page=${page}&limit=6`);

      console.log('Blog API response:', response);

      if (!response.success || !response.data) {
        const errorMessage = response.error || 'Failed to fetch blogs';
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      console.log('Successfully fetched blogs:', response.data.blogs?.length || 0);

      // Handle pagination and append logic
      if (append && blogData && response.data.blogs) {
        // Append new blogs to existing ones
        setBlogData({
          ...response.data,
          blogs: [...blogData.blogs, ...response.data.blogs]
        });
      } else {
        // Replace existing blogs or set initial data
        setBlogData(response.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);

      // Only show error toast on initial load, not on load more
      if (!append) {
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please check your internet connection and try again.",
          variant: "destructive",
        });
        // Set empty state to show "No Blog Posts Yet" message instead of blank page
        setBlogData({
          blogs: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalBlogs: 0,
            hasNext: false,
            hasPrev: false
          }
        });
      } else {
        toast({
          title: "Load More Error",
          description: "Could not load more posts. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const retryFetch = () => {
    setError(null);
    fetchBlogs(1, false);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Wise Wave Edu Solutions Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-red-600">Wise Wave Edu Solutions</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
              <Link to="/about" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
              <Link to="/services" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Services</Link>
              <Link to="/blog" className="text-sm xl:text-base text-blue-600 font-semibold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link>
              <Link to="/faq" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>FAQ</Link>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base"
                onClick={() => setIsContactModalOpen(true)}
              >
                Get Started
              </Button>
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

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-subtle">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
            Career Insights & Updates
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Stay informed with the latest career guidance tips, industry trends, and educational insights
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !blogData || blogData.blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                {error ? (
                  <>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground mb-6">
                      {error}
                    </p>
                    <Button
                      onClick={retryFetch}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Try Again
                    </Button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">No Blog Posts Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      We're working on creating valuable content for you. Check back soon!
                    </p>
                    <Button
                      onClick={retryFetch}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Refresh
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {blogData.blogs.map((blog) => (
                <Card key={blog._id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[300px] sm:min-h-[320px]">
                  {blog.image_url && (
                    <div className="overflow-hidden rounded-t-lg">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">{formatDate(blog.createdAt)}</span>
                        <span className="sm:hidden">{formatDate(blog.createdAt).split(' ').slice(0, 2).join(' ')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{blog.content ? getReadingTime(blog.content) : '5 min read'}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <CardDescription className="text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {blog.excerpt || (blog.content ? blog.content.substring(0, 120) + '...' : 'Read more to learn about this topic...')}
                    </CardDescription>
                    <Link to={`/blog/${blog.slug}`}>
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {blogData && blogData.pagination.hasNext && (
            <div className="text-center mt-8 sm:mt-12">
              <Button
                onClick={() => fetchBlogs(blogData.pagination.currentPage + 1, true)}
                disabled={loadingMore}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
              >
                {loadingMore ? 'Loading...' : 'Load More Posts'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
              Need Personal Guidance?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed px-2">
              Get personalized career advice from our expert counselors
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => {
                  window.location.href = 'https://calendly.com/leadssuresha/30min';
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600"
              >
                Book Free Consultation
              </Button>
              <Link to="/faq" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Take Career Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* WhatsApp Floating Button */}
      <WhatsappFloat />
    </div>
  );
};

export default Blog;
