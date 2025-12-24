import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GraduationCap, FileText, Calendar, CheckCircle, ArrowLeft, Camera, Award, Users, BookOpen, Stethoscope, Cpu, Building2, TrendingUp, University } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import ServiceContactForm from "@/components/ServiceContactForm";
import { useState } from "react";
import indImage from "@/assets/ind1.jpg";
import indImage2 from "@/assets/ind2.jpg";
import indImage3 from "@/assets/ind3.jpg";
import logoImage from "@/assets/logo.jpeg";

const IndianAdmission = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    "College selection and shortlisting",
    "Application strategy and timeline",
    "Document preparation and review",
    "Interview preparation",
    "Scholarship application assistance"
  ];

  const processSteps = [
    {
      icon: GraduationCap,
      title: "College Research",
      description: "Identify the best colleges based on your profile and preferences"
    },
    {
      icon: FileText,
      title: "Application Management",
      description: "Complete guidance through the entire application process"
    },
    {
      icon: Calendar,
      title: "Timeline Planning",
      description: "Strategic planning to meet all important deadlines"
    }
  ];

  const popularCourses = [
    {
      icon: Stethoscope,
      title: "MBBS",
      description: "Medical degree programs at top medical colleges",
      colleges: "AIIMS, CMC Vellore, JIPMER, AFMC"
    },
    {
      icon: Cpu,
      title: "B.Tech",
      description: "Engineering programs in Computer Science, Mechanical, Electrical",
      colleges: "IITs, NITs, BITS Pilani, VIT"
    },
    {
      icon: Cpu,
      title: "BE",
      description: "Bachelor of Engineering across all specializations",
      colleges: "Top state engineering colleges, Deemed universities"
    },
    {
      icon: Building2,
      title: "BBA",
      description: "Business Administration and Management programs",
      colleges: "NMIMS, Christ University, Symbiosis, ICFAI"
    },
    {
      icon: TrendingUp,
      title: "MBA",
      description: "Master of Business Administration programs",
      colleges: "IIMs, XLRI, SPJIMR, MDI Gurgaon"
    },
    {
      icon: University,
      title: "Top Universities",
      description: "Admission guidance to premier educational institutions",
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
      <section className="relative py-20 bg-gradient-subtle overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-orange-400 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
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
                Indian College Admission
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Complete support for domestic college admissions across all Indian universities and institutions
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
                    src={indImage}
                    alt="Indian College Admission"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
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
              Comprehensive support for every step of your Indian college admission journey
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

      {/* Popular Courses Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Popular Courses We Support
            </h2>
            <p className="text-xl text-gray-600">
              Expert admission guidance for India's most sought-after courses and top universities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {popularCourses.map((course, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <course.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-gray-600 mb-4">
                    {course.description}
                  </CardDescription>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Top Colleges:</p>
                    <p className="text-xs text-gray-600">{course.colleges}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Admission Images Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg mb-6">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Admission Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our Indian college admission guidance programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Indian Admission Image 1 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={indImage}
                  alt="Indian College Admission Success"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    <span className="font-semibold">College Admission</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dream College Achieved</h3>
                <p className="text-gray-600">
                  From application to acceptance - watch how our students secure admission to their dream colleges across India.
                </p>
              </CardContent>
            </Card>

            {/* Indian Admission Image 2 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={indImage2}
                  alt="Indian University Guidance"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <BookOpen className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Academic Excellence</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Academic Preparation</h3>
                <p className="text-gray-600">
                  Building strong academic foundations and preparing for the competitive admission process at top institutions.
                </p>
              </CardContent>
            </Card>

            {/* Indian Admission Image 3 */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={indImage3}
                  alt="Indian Education Journey"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Award className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Scholarship Success</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Scholarship Support</h3>
                <p className="text-gray-600">
                  Maximizing financial aid opportunities and securing scholarships to make quality education accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Process
            </h2>
            <p className="text-xl text-primary-foreground/90">
              A systematic approach to ensure your successful admission to top Indian colleges
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary-foreground/20 rounded-full w-16 h-16 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-primary-foreground/90">
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
                Admission Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from students who secured admission to top Indian colleges with our guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Success Story Content */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        "The admission guidance was exceptional. I secured admission to IIT Delhi with a full scholarship thanks to their expert support."
                      </p>
                      <p className="font-semibold text-gray-800">— Priya Sharma</p>
                      <p className="text-sm text-gray-600">IIT Delhi - Computer Science</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        "From confusion about college selection to getting admission in my dream college. The process was smooth and well-guided."
                      </p>
                      <p className="font-semibold text-gray-800">— Arjun Kumar</p>
                      <p className="text-sm text-gray-600">NIT Trichy - Mechanical Engineering</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Story Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={indImage2}
                    alt="Indian Admission Success"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-gray-800">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">98% Admission Rate</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Students admitted to top colleges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Admission Guidance
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and our admission experts will guide you to the best colleges
              </p>
            </div>

            <div className="flex justify-center">
              <ServiceContactForm serviceName="Indian College Admission" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get expert guidance for admission to India's top colleges and universities
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

export default IndianAdmission;