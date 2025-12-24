import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, Globe, GraduationCap, CreditCard, Target, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import HamburgerMenu from "@/components/HamburgerMenu";
import ContactFormModal from "@/components/ContactFormModal";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import { useState } from "react";
import careerImage3 from "@/assets/career3.jpg";
import logoImage from "@/assets/logo.jpeg";

const Services = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      id: "career-guidance",
      title: "Career Guidance",
      description: "Comprehensive career counseling and planning services",
      icon: Target,
      features: [
        "One-on-one career counseling sessions",
        "Psychometric assessments and profiling",
        "Career pathway visualization",
        "Industry insights and trends",
        "Skills gap analysis and development plans"
      ]
    },
    {
      id: "indian-admission",
      title: "Indian Admission",
      description: "Complete support for domestic college admissions",
      icon: GraduationCap,
      features: [
        "Reliable Indian college admission consultancy.",
        "Support for top colleges in Tamil Nadu & India.",
        "Transparent direct admission guidance.",
        "Personalized course & career counseling.",
        "Help with applications & documentation."
      ]
    },
    {
      id: "overseas-admission",
      title: "Overseas Admission",
      description: "Expert guidance for international university applications",
      icon: Globe,
      features: [
        "University selection and research",
        "Application essay writing support",
        "Visa application assistance",
        "Financial planning and budgeting",
        "Pre-departure orientation"
      ]
    },
    {
      id: "online-admission",
      title: "Online Admission",
      description: "Digital application support and management",
      icon: BookOpen,
      features: [
        "Online application management",
        "Document digitization and upload",
        "Application tracking and updates",
        "Technical support and troubleshooting",
        "Deadline management and reminders"
      ]
    },
    {
      id: "test-preparation",
      title: "Test Preparation Coaching",
      description: "Comprehensive coaching for entrance exams",
      icon: Users,
      features: [
        "Comprehensive Live Online Classes",
        "Certified & Experienced Faculty",
        "Personalized Learning Support",
        "Regular Practice Tests & Assessments",
        "Updated Digital Study Materials"
      ]
    },
    {
      id: "educational-loans",
      title: "Educational Loans",
      description: "Financial planning and loan assistance",
      icon: CreditCard,
      features: [
        "Loan eligibility assessment",
        "Bank and lender comparison",
        "Application process guidance",
        "Documentation support",
        "Repayment planning and advice"
      ]
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
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
              <Link to="/about" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
              <Link to="/services" className="text-sm xl:text-base text-blue-600 font-semibold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Services</Link>
              <Link to="/blog" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link>
              <Link to="/faq" className="text-sm xl:text-base text-foreground hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>FAQ</Link>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base"
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
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-subtle overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-gradient-radial from-blue-400 to-transparent rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-gradient-radial from-purple-400 to-transparent rounded-full"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left px-2 sm:px-0">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 lg:mb-6">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Comprehensive Solutions</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Our Services
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Comprehensive career guidance solutions tailored to help students and families make informed educational decisions
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={careerImage3}
                    alt="Career Services Overview"
                    className="w-full h-96 lg:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl group-hover:text-blue-600 transition-colors leading-tight">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">What's Included:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                      <Link to={`/services/${service.id}`} className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base">
                          Learn More
                        </Button>
                      </Link>
                      <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="default" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] sm:min-h-[48px] text-sm sm:text-base">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed px-2">
            Book a free consultation call and let our experts guide you to the right solution
          </p>
          <Button
            onClick={() => {
              console.log('Book Free Consultation button clicked on Services page');
              window.location.href = 'https://calendly.com/leadssuresha/30min';
            }}
            className="border-white hover:bg-white hover:text-blue-600 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg hover:scale-105 transition-transform duration-300 min-h-[48px] sm:min-h-[56px] w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Book Free Consultation
          </Button>
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

export default Services;
