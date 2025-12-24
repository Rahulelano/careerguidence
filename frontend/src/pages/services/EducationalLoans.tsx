import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CreditCard, Calculator, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import ServiceContactForm from "@/components/ServiceContactForm";
import { useState } from "react";
import logoImage from "@/assets/logo.jpeg";

const EducationalLoans = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    "Loan eligibility assessment",
    "Bank and lender comparison",
    "Application process guidance",
    "Documentation support",
    "Repayment planning and advice"
  ];

  const processSteps = [
    {
      icon: Calculator,
      title: "Eligibility Check",
      description: "Comprehensive assessment of your loan eligibility and requirements"
    },
    {
      icon: CreditCard,
      title: "Loan Comparison",
      description: "Compare different banks and lenders to find the best option"
    },
    {
      icon: FileText,
      title: "Application Support",
      description: "Complete guidance through the loan application process"
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
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/services" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Educational Loans
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Financial planning and loan assistance to fund your educational journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              Complete financial support for your education funding needs
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
              Streamlined process to help you secure the best educational financing
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


      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Loan Assistance
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and our financial experts will help you with loan options
              </p>
            </div>

            <div className="flex justify-center">
              <ServiceContactForm serviceName="Educational Loans" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Fund Your Education?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get expert guidance for educational loans and financial planning
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

export default EducationalLoans;