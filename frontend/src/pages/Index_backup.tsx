import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ContactFormModal from "@/components/ContactFormModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, BookOpen, Globe, GraduationCap, CreditCard, Target } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-speaker.jpg";
import logoImage from "@/assets/logo.jpeg";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Professional Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Wise Wave Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  console.log('Logo image failed to load');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-2xl font-bold text-blue-600">Wise Wave</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
              <Link to="/about" className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link to="/services" className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors font-medium">Services</Link>
              <Link to="/blog" className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors font-medium">Blog</Link>
              <Link to="/faq" className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors font-medium">FAQ</Link>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base"
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
      <div
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : {}}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2">
              <span className="block mb-1 sm:mb-2">Unlock Your True Potential</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  {displayText}
                </span>
                <span className={`inline-block w-0.5 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-16 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                </span>
              </span>
            </h1>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
              Discover your strengths, explore future-ready careers, and make informed decisions with expert guidance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold shadow-lg w-full min-h-[48px] sm:min-h-[56px]">
              <span className="flex items-center justify-center">
                Take a Free Assessment
                <ArrowRight className="ml-2" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold w-full sm:w-auto min-h-[48px] sm:min-h-[56px]"
            >
              Book Free Counseling
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section - Simplified */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
              Our Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Complete range of educational and career development solutions
            </p>
          </div>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
            {[
              {
                title: "Career Guidance",
                desc: "Personalized career counseling and strategic planning",
                icon: Users,
              },
              {
                title: "Indian Admission", 
                desc: "Complete support for domestic college admissions",
                icon: BookOpen,
              },
              {
                title: "Overseas Admission",
                desc: "Expert guidance for international university applications", 
                icon: Globe,
              },
              {
                title: "Online Admission",
                desc: "Digital application support and management",
                icon: Target,
              },
              {
                title: "Test Preparation",
                desc: "Comprehensive coaching for entrance exams",
                icon: GraduationCap,
              },
              {
                title: "Educational Loans",
                desc: "Financial planning and loan assistance",
                icon: CreditCard,
              },
            ].map((service, index) => (
              <Card key={index} className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4 p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
    
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-gray-600 mb-4">
                    {service.desc}
                  </CardDescription>
    
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                    onClick={() => {
                      alert(`Learn more about ${service.title} - Contact us for more details!`);
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 max-w-2xl mx-auto px-2">
            Take the first step towards your dream career today
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              className="border-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full min-h-[48px] sm:min-h-[56px]"
            >
              Get Free Assessment
            </Button>
            <Button
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto min-h-[48px] sm:min-h-[56px]"
            >
              Schedule Consultation
            </Button>
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