import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Monitor, FileText, Clock, CheckCircle, ArrowLeft, Cpu, Building2, TrendingUp, University, BookOpen, Globe, Users, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import ServiceContactForm from "@/components/ServiceContactForm";
import { useState } from "react";
import logoImage from "@/assets/logo.jpeg";
import careerImage from "@/assets/career.jpg";
import { scrollToPageTop } from "@/utils/scrollUtils";

const OnlineAdmission = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    "Online application management",
    "Document digitization and upload",
    "Application tracking and updates",
    "Technical support and troubleshooting",
    "Deadline management and reminders"
  ];

  const processSteps = [
    {
      icon: Monitor,
      title: "Digital Platform",
      description: "Access to our comprehensive online application management system"
    },
    {
      icon: FileText,
      title: "Document Handling",
      description: "Complete digitization and organization of all required documents"
    },
    {
      icon: Clock,
      title: "Timeline Management",
      description: "Automated reminders and deadline tracking for all applications"
    }
  ];

  const popularCourses = [
    {
      icon: Cpu,
      title: "B.Tech",
      description: "Online applications for engineering programs",
      colleges: "IITs, NITs, BITS Pilani, VIT, SRM"
    },
    {
      icon: Cpu,
      title: "BE",
      description: "Digital admission process for engineering degrees",
      colleges: "Top state engineering colleges, Deemed universities"
    },
    {
      icon: Building2,
      title: "BBA",
      description: "Online applications for business administration",
      colleges: "NMIMS, Christ University, Symbiosis, ICFAI"
    },
    {
      icon: TrendingUp,
      title: "MBA",
      description: "Digital MBA admission management and applications",
      colleges: "IIMs, XLRI, SPJIMR, MDI Gurgaon, FMS"
    },
    {
      icon: University,
      title: "Top Universities",
      description: "Online admission guidance for premier institutions",
      colleges: "Delhi University, JNU, BHU, AMU, Jadavpur University"
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
      <section
        className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden"
        style={careerImage ? { backgroundImage: `url(${careerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' } : {}}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/services" className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>

            {/* Trust Indicators */}
            <div className="flex justify-center space-x-6 mb-8 opacity-90">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <Users className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">5000+ Students</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Expert Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Digital Platform</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block mb-2">Digital</span>
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Online Admission
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your college application process with our comprehensive digital platform. Get expert guidance, document management, and application tracking all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                onClick={() => {
                  scrollToPageTop();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Application Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => scrollToPageTop()}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
                >
                  Book Free Counseling
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Our Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Support</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Everything you need for a successful online admission experience, from document management to application tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Monitor,
                title: "Online Application Management",
                description: "Complete digital platform for managing all your college applications in one place",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: FileText,
                title: "Document Digitization",
                description: "Professional digitization and organization of all required documents",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Clock,
                title: "Application Tracking",
                description: "Real-time updates and progress tracking for all your applications",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: CheckCircle,
                title: "Technical Support",
                description: "24/7 expert assistance for any technical issues or queries",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Calendar,
                title: "Deadline Management",
                description: "Automated reminders and deadline tracking to never miss important dates",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Expert Guidance",
                description: "Personal support from admission experts throughout the process",
                color: "from-teal-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white rounded-2xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center pb-4 p-6">
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center p-6 pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-4">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Digital
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Application</span>
              <br />Process
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Simple, streamlined, and completely digital process for hassle-free online applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: Monitor,
                title: "Digital Platform",
                description: "Access our comprehensive online application management system with real-time updates",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                step: "02",
                icon: FileText,
                title: "Document Management",
                description: "Complete digitization, organization, and secure storage of all required documents",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                step: "03",
                icon: Clock,
                title: "Timeline Tracking",
                description: "Automated reminders, deadline tracking, and progress monitoring for all applications",
                gradient: "from-purple-400 to-pink-500"
              }
            ].map((step, index) => (
              <Card key={index} className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                <CardHeader className="text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-4xl font-bold text-white/30">{step.step}</span>
                  </div>
                  <div className={`mx-auto mb-6 p-4 bg-gradient-to-r ${step.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-blue-100 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-4 py-2 mb-4">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Popular Courses</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Courses Available for
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Online Admission</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Streamlined digital application process for India's most sought-after courses and premier institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "B.Tech",
                description: "Online applications for engineering programs at top institutions",
                colleges: "IITs, NITs, BITS Pilani, VIT, SRM",
                icon: Cpu,
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                title: "BE",
                description: "Digital admission process for engineering degrees",
                colleges: "Top state engineering colleges, Deemed universities",
                icon: Cpu,
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                title: "BBA",
                description: "Online applications for business administration programs",
                colleges: "NMIMS, Christ University, Symbiosis, ICFAI",
                icon: Building2,
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                title: "MBA",
                description: "Digital MBA admission management and applications",
                colleges: "IIMs, XLRI, SPJIMR, MDI Gurgaon, FMS",
                icon: TrendingUp,
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              },
              {
                title: "Top Universities",
                description: "Online admission guidance for premier institutions",
                colleges: "Delhi University, JNU, BHU, AMU, Jadavpur University",
                icon: University,
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-50 to-blue-50"
              },
              {
                title: "Medical Programs",
                description: "Digital application support for medical courses",
                colleges: "AIIMS, JIPMER, CMC Vellore, St. John's Medical College",
                icon: BookOpen,
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              }
            ].map((course, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white rounded-2xl overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center pb-4 p-6">
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${course.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center`}>
                    <course.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center p-6 pt-0">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {course.description}
                  </CardDescription>
                  <div className={`bg-gradient-to-r ${course.bgGradient} p-4 rounded-xl border border-gray-100`}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Top Institutions:</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{course.colleges}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Get Started Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Start Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Digital Journey?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with our digital admission experts and streamline your college application process today
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <ServiceContactForm serviceName="Online Admission" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Globe className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Start Your
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Digital Journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              Experience seamless online application management with our comprehensive digital platform
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => scrollToPageTop()}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Book Free Consultation
                </Button>
              </a>
              <Button
                variant="outline"
                size="xl"
                onClick={() => scrollToPageTop()}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-md"
              >
                Call Now: +91 9443690870
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-90">
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
                <span className="text-sm font-medium">Digital Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
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

export default OnlineAdmission;