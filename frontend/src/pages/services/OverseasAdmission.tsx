import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, FileText, Plane, CheckCircle, ArrowLeft, MapPin, Heart, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import ServiceContactForm from "@/components/ServiceContactForm";
import { useState } from "react";
import logoImage from "@/assets/logo.jpeg";
import ausImage from "@/assets/aus.jpg";
import germanyImage from "@/assets/germany.jpg";
import canadaImage from "@/assets/canada.jpg";
import ukImage from "@/assets/uk.jpg";
import usaImage from "@/assets/usa.jpg";
import restImage from "@/assets/rest.jpg";
import overImage from "@/assets/over.jpg";
import over1Image from "@/assets/over1.jpg";

const OverseasAdmission = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    "University selection and research",
    "Application essay writing support",
    "Visa application assistance",
    "Financial planning and budgeting",
    "Pre-departure orientation"
  ];

  const processSteps = [
    {
      icon: Globe,
      title: "University Selection",
      description: "Research and shortlist universities based on your profile and preferences"
    },
    {
      icon: FileText,
      title: "Application Support",
      description: "Complete guidance for applications, essays, and documentation"
    },
    {
      icon: Plane,
      title: "Visa & Travel",
      description: "End-to-end support for visa applications and travel arrangements"
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
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-green-400 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
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
                Overseas Admission
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert guidance for international university applications to top universities worldwide
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
                    src={overImage}
                    alt="Overseas Admission"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full opacity-20 animate-pulse"></div>
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
              Comprehensive support for your international education journey
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

      {/* Process Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Process
            </h2>
            <p className="text-xl text-primary-foreground/90">
              A comprehensive approach to ensure your successful admission abroad
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

      {/* Popular Programs Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
              <Stethoscope className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Popular Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Study Programs
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Abroad</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Pursue world-class education in medicine, engineering, business, and more at top international universities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "MBBS (Medicine)",
                description: "Study medicine at top international medical schools and universities worldwide",
                universities: "Harvard Medical School, Johns Hopkins, University of Toronto, Karolinska Institute",
                icon: Heart,
                gradient: "from-red-500 to-pink-500",
                bgGradient: "from-red-50 to-pink-50"
              },
              {
                title: "Engineering",
                description: "World-class engineering programs in technology, civil, mechanical, and more",
                universities: "MIT, Stanford, ETH Zurich, University of Cambridge, Imperial College London",
                icon: Globe,
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                title: "Business & Management",
                description: "Premier business schools offering MBA and specialized business programs",
                universities: "Wharton, INSEAD, London Business School, HEC Paris, IE Business School",
                icon: FileText,
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                title: "Computer Science",
                description: "Cutting-edge computer science and technology programs at leading institutions",
                universities: "Stanford, Carnegie Mellon, University of Cambridge, ETH Zurich",
                icon: Plane,
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                title: "Arts & Design",
                description: "Creative programs in fine arts, design, architecture, and liberal arts",
                universities: "Parsons, Royal College of Art, University of Arts London, Rhode Island School of Design",
                icon: MapPin,
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              },
              {
                title: "Sciences & Research",
                description: "Advanced research programs in natural sciences, mathematics, and physics",
                universities: "University of Oxford, Caltech, University of Cambridge, Max Planck Institutes",
                icon: Stethoscope,
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-50 to-blue-50"
              }
            ].map((program, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white rounded-2xl overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${program.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center pb-4 p-6">
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${program.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center p-6 pt-0">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </CardDescription>
                  <div className={`bg-gradient-to-r ${program.bgGradient} p-4 rounded-xl border border-gray-100`}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Top Universities:</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{program.universities}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-6">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore top countries for international education and career opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Australia */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={ausImage}
                  alt="Study in Australia"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Australia</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Australia</h3>
                <p className="text-sm text-gray-600">
                  World-class universities and excellent research opportunities
                </p>
              </CardContent>
            </Card>

            {/* Germany */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={germanyImage}
                  alt="Study in Germany"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Germany</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Germany</h3>
                <p className="text-sm text-gray-600">
                  Tuition-free education and strong engineering programs
                </p>
              </CardContent>
            </Card>

            {/* Canada */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={canadaImage}
                  alt="Study in Canada"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Canada</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Canada</h3>
                <p className="text-sm text-gray-600">
                  High-quality education and welcoming immigration policies
                </p>
              </CardContent>
            </Card>

            {/* UK */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={ukImage}
                  alt="Study in UK"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">United Kingdom</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">United Kingdom</h3>
                <p className="text-sm text-gray-600">
                  Prestigious universities and rich academic heritage
                </p>
              </CardContent>
            </Card>

            {/* USA */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={usaImage}
                  alt="Study in USA"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">United States</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">United States</h3>
                <p className="text-sm text-gray-600">
                  Top-ranked universities and diverse academic programs
                </p>
              </CardContent>
            </Card>

            {/* Other Countries */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={restImage}
                  alt="Study in Other Countries"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Other Destinations</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Other Destinations</h3>
                <p className="text-sm text-gray-600">
                  Explore opportunities in various countries worldwide
                </p>
              </CardContent>
            </Card>

            {/* Overview Images */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={overImage}
                  alt="Overseas Education Overview"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Global Opportunities</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Global Opportunities</h3>
                <p className="text-sm text-gray-600">
                  Discover endless possibilities for international education
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={over1Image}
                  alt="International Education"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="font-semibold">International Experience</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">International Experience</h3>
                <p className="text-sm text-gray-600">
                  Gain valuable international exposure and cultural experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Start Your Overseas Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and our overseas education experts will guide you
              </p>
            </div>

            <div className="flex justify-center">
              <ServiceContactForm serviceName="Overseas Admission" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Study Abroad?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get expert guidance for admission to top universities across the globe
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

export default OverseasAdmission;