import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ContactFormModal from "@/components/ContactFormModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, BookOpen, Globe, GraduationCap, CreditCard, Target, Star, Award, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-speaker.jpg";
import logoImage from "@/assets/logo.jpeg";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const typingTexts = [
    "Future-Ready Careers",
    "Academic Excellence",
    "Personalized Guidance",
    "Success Stories"
  ];

  useEffect(() => {
    const currentText = typingTexts[currentIndex];
    const shouldDelete = isDeleting && displayText === '';

    if (shouldDelete) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, typingTexts]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Helper function to open contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to navigate to quiz
  const startQuiz = () => {
    navigate('/faq?showQuiz=true');
  };

  // Helper function to open Calendly booking
  const openCalendlyBooking = () => {
    window.open('https://calendly.com/leadssuresha/30min', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Modern Navigation */}
      <nav className="backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={logoImage}
                  alt="Wise Wave Logo"
                  className="h-12 w-auto rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                  onError={(e) => {
                    console.log('Logo image failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold text-red-600">Wise Wave Edu Solutions</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={openContactModal}
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
        )}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          {/* Floating Stats */}
          <div className="flex justify-center space-x-8 mb-8 opacity-80">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">4.9 Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <Users className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">10k+ Students</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <Award className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Expert Counselors</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block mb-2">Unlock Your</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  True Potential
                </span>
                <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
              </span>
            </h1>

            <div className="h-16 flex items-center justify-center mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {displayText}
                </span>
                <span className={`inline-block w-1 h-8 sm:h-10 md:h-12 bg-white ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
              </h2>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
              Discover your strengths, explore future-ready careers, and make informed decisions with expert guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              onClick={startQuiz}
            >
              <span className="flex items-center justify-center">
                Take Free Career Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
            <Button
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-md"
              onClick={openCalendlyBooking}
            >
              Book Free Counseling
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Solutions for Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Future</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete range of educational and career development solutions tailored to your unique journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Career Guidance",
                desc: "Personalized career counseling and strategic planning for your professional journey",
                route: "/services/career-guidance",
                icon: Users,
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                title: "Indian Admission",
                desc: "Complete support for domestic college admissions and university applications",
                route: "/services/indian-admission",
                icon: BookOpen,
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                title: "Overseas Admission",
                desc: "Expert guidance for international university applications and visa processes",
                route: "/services/overseas-admission",
                icon: Globe,
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                title: "Online Admission",
                desc: "Digital application support and management for modern educational pathways",
                route: "/services/online-admission",
                icon: Target,
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              },
              {
                title: "Test Preparation",
                desc: "Comprehensive coaching for entrance exams and standardized tests",
                route: "/services/test-preparation",
                icon: GraduationCap,
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-50 to-blue-50"
              },
              {
                title: "Educational Loans",
                desc: "Financial planning and loan assistance for educational investments",
                route: "/services/educational-loans",
                icon: CreditCard,
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              },
            ].map((service, index) => (
              <Card key={index} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <CardHeader className="relative pb-4 p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 bg-gradient-to-r ${service.gradient} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="relative p-6 pt-0">
                  <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                    {service.desc}
                  </CardDescription>

                  <Link to={service.route}>
                    <Button
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Start Your
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Journey?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed">
              Take the first step towards your dream career today with our expert guidance
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                onClick={startQuiz}
              >
                Take Free Quiz
              </Button>
              <Button
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-md"
                onClick={openCalendlyBooking}
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Personalized Support</span>
              </div>
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

export default Index;