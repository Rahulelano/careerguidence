import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";
import ContactFormModal from "@/components/ContactFormModal";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Target,
  Users,
  Globe,
  MessageCircle,
  Heart,
  Star,
  Award,
  BookOpen,
  Plane,
  Home,
  UserCheck,
  Eye,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import logoImage from "@/assets/logo.jpeg";
import careerguidenceImage from "@/assets/careerguidence.jpg";

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
              <Link to="/" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
              <Link to="/about" className="text-sm xl:text-base text-blue-600 font-semibold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
              <Link to="/services" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Services</Link>
              <Link to="/blog" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link>
              <Link to="/faq" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>FAQ</Link>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base" onClick={() => setIsContactModalOpen(true)}>Get Started</Button>
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
        className="py-20 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${careerguidenceImage})`
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">

            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              About Wise Wave Edu Solutions Pvt Ltd
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg">
              Guiding Students. Empowering Futures. Building Wise Waves of Success.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Mission Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border-0 mb-12">
              <div className="text-center mb-8">
                <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                To empower students and parents with the right information, direction, and tools to make confident academic and career decisions.
                We combine psychometric insights, expert counseling, and real-world exposure to help every learner create a purposeful future.
              </p>

              {/* Image after Mission */}
              <div className="mt-8 flex justify-center">
                <img
                  src="/img (1).jpeg"
                  alt="Educational Guidance"
                  className="rounded-xl shadow-lg max-w-full h-auto max-h-64 object-cover"
                />
              </div>
            </div>

            {/* What We Do Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-0">
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What We Do</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Wise Wave Edu Solutions is a career guidance and study abroad consultancy that supports students at every stage of their journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-700">Study Abroad Admissions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-700">DMIT & Psychometric Assessments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-700">Career Counseling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Plane className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-700">Visa & Accommodation Assistance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-700">Parenting & Life Coaching</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-0">
                <Heart className="h-12 w-12 text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Core Services</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🎓 Study Abroad Admissions</h4>
                    <p className="text-gray-600 text-sm">End-to-end support to secure admission in reputed public universities across the UK, USA, Europe, Canada, and Asia.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🧠 DMIT & Psychometric Assessments</h4>
                    <p className="text-gray-600 text-sm">Discover natural talents, personality strengths, and learning styles through scientific testing.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">💼 Career Counseling</h4>
                    <p className="text-gray-600 text-sm">Personalized guidance for school students, college graduates, and working professionals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border-0 mb-12">
              <div className="max-w-4xl mx-auto text-center">
                <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The story of Wise Wave Edu Solutions began with a deep-rooted belief — that right guidance at the right time can transform a student's future.
                </p>

                {/* Image in Our Story Section */}
                <div className="my-8 flex justify-center">
                  <img
                    src="/img (2).jpeg"
                    alt="Our Story and Journey"
                    className="rounded-xl shadow-lg max-w-full h-auto max-h-80 object-cover"
                  />
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Inspired by his father's role as a teacher, <strong>Suresh Natarajan</strong> dedicated his career to helping students gain career clarity and global opportunities.
                  After over 25 years of professional experience in India and the Gulf — managing roles from Office Assistant to General Manager — Suresh combined his experience, empathy, and educational insights to build Wise Wave Edu Solutions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  Today, Wise Wave stands as a trusted partner for students, parents, and institutions seeking genuine career and education guidance.
                </p>
              </div>
            </div>

            {/* Why Trust Us Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Students Trust Wise Wave Edu Solutions</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-700 font-medium">Personalized career roadmap designed through scientific and practical insights</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-700 font-medium">Ethical and transparent counseling with student-first values</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-700 font-medium">Expert support for study abroad applications and scholarships</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-700 font-medium">Data-backed career guidance using DMIT and psychometric testing</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-700 font-medium">End-to-end mentorship — from school to university to career success</span>
                </div>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border-0 mb-12 text-center">
              <Eye className="h-16 w-16 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                To become India's most trusted platform for career clarity and global education, helping one million students discover their best-fit careers and universities worldwide.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <Heart className="h-16 w-16 text-pink-300 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">🕊️ Join the Wise Wave</h2>
              <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                At Wise Wave Edu Solutions, we don't just show you what to study — we help you understand why it matters and where it can take you.
                Together, let's build a future where every learner makes wise, confident, and informed choices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    window.location.href = '/faq?showQuiz=true';
                  }}
                >
                  Take Career Assessment
                </Button>
                <Button
                  variant="outline"
                  className="border-white  hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Get In Touch
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">📞 Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-300">34 -15, 2nd Street MGR Nagar<br />Sidco Coimbatore<br />Tamil Nadu 641021</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">enquiry@careerguidancecoach.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">9443690870</p>
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

export default About;
