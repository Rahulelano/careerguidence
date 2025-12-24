import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, Users, BookOpen, CheckCircle, ArrowLeft, Camera, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import ServiceContactForm from "@/components/ServiceContactForm";
import { useState } from "react";
import careerImage from "@/assets/career.jpg";
import careerImage2 from "@/assets/career2.jpg";
import careerImage3 from "@/assets/career3.jpg";
import logoImage from "@/assets/logo.jpeg";

const CareerGuidance = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    "One-on-one career counseling sessions",
    "Psychometric assessments and profiling",
    "Career pathway visualization",
    "Industry insights and trends",
    "Skills gap analysis and development plans"
  ];

  const processSteps = [
    {
      icon: Target,
      title: "Initial Assessment",
      description: "Comprehensive evaluation of your interests, strengths, and career goals"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Personalized guidance from certified career counselors"
    },
    {
      icon: BookOpen,
      title: "Action Plan",
      description: "Detailed roadmap with specific steps and timelines"
    }
  ];

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
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
              <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Get Started</Button>
              </a>
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
      <section className="relative py-20 bg-gradient-subtle overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-purple-400 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Link to="/services" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Career Guidance
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive career counseling and planning services to help you discover your true potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="xl"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="xl">
                    Get Free Counseling
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={careerImage}
                    alt="Career Guidance Hero"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What's Included
            </h2>
            <p className="text-xl text-muted-foreground">
              Our comprehensive career guidance package covers every aspect of your career journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Images Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-6">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Career Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our career guidance programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Career Image 1 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={careerImage}
                  alt="Career Guidance Success"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Award className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Career Achievement</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dream Job Secured</h3>
                <p className="text-gray-600">
                  From confusion to clarity - watch how our students land their ideal careers with confidence and purpose.
                </p>
              </CardContent>
            </Card>

            {/* Career Image 2 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={careerImage2}
                  alt="Career Growth Journey"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Growth Path</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills Development</h3>
                <p className="text-gray-600">
                  Building essential skills and competencies that employers value most in today's competitive job market.
                </p>
              </CardContent>
            </Card>

            {/* Career Image 3 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={careerImage3}
                  alt="Career Transformation"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Target className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Goal Achievement</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Future Planning</h3>
                <p className="text-gray-600">
                  Strategic career planning that aligns your aspirations with market opportunities and long-term success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Process
            </h2>
            <p className="text-xl text-blue-100">
              A structured approach to help you make informed career decisions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-white/20 rounded-full w-16 h-16 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-blue-100">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from students who transformed their careers with our guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Success Story Content */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        "The career guidance program completely changed my perspective. I went from being confused about my future to landing my dream job at a top tech company."
                      </p>
                      <p className="font-semibold text-gray-800">— Priya Sharma</p>
                      <p className="text-sm text-gray-600">Software Engineer at TCS</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        "The psychometric assessment and counseling sessions helped me discover my true strengths. I'm now pursuing my passion with confidence."
                      </p>
                      <p className="font-semibold text-gray-800">— Arjun Kumar</p>
                      <p className="text-sm text-gray-600">MBA Student at IIM Bangalore</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Story Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={careerImage2}
                    alt="Success Stories"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-gray-800">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-semibold">95% Success Rate</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Students achieving their career goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Your Free Career Consultation
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and our experts will contact you with personalized guidance
              </p>
            </div>

            <div className="flex justify-center">
              <ServiceContactForm serviceName="Career Guidance" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Take the first step towards discovering your ideal career path with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero-outline"
              size="xl"
              onClick={() => {
                window.location.href = 'https://calendly.com/leadssuresha/30min';
              }}
            >
              Book Free Consultation
            </Button>
            <Button variant="secondary" size="xl">
              Call Now: +91 9443690870
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsappFloat />
    </div>
  );
};

export default CareerGuidance;