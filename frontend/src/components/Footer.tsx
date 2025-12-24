import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import logoImage from "@/assets/logo.jpeg";

const socialLinks = [
  { name: 'YouTube', url: 'https://youtube.com/@wisewaveedusolutions?si=FiRfy-QjuJonqsiV', icon: Youtube },
  { name: 'Instagram', url: 'https://www.instagram.com/wisewaveedusolutions?igsh=OWJ0YWFrYnJiczc0', icon: Instagram },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1B8ZVSFqwS/', icon: Facebook },
  { name: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029VadvbCH1nozDAGhh3z2l', icon: MessageCircle },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/suresh-n-a2a4771b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-6 sm:py-8 lg:py-12 mt-auto">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Wise Wave Logo"
                className="h-16 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-red-500">Wise Wave Edu Solutions</h3>
                <p className="text-sm text-gray-300">Career Guidance Platform</p>
              </div>
            </div>
            <p className="text-background/80">Empowering students to make informed career decisions</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li><Link to="/services/career-guidance" className="hover:text-background transition-colors">Career Guidance</Link></li>
              <li><Link to="/services/indian-admission" className="hover:text-background transition-colors">Indian Admission</Link></li>
              <li><Link to="/services/overseas-admission" className="hover:text-background transition-colors">Overseas Admission</Link></li>
              <li><Link to="/services/online-admission" className="hover:text-background transition-colors">Online Courses</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-background/80">
              <li><Link to="/blog" className="hover:text-background transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link></li>
              <li><a href="#contact" className="hover:text-background transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-background/80">34 -15,2nd Street MGR Nagar Sidco Coimbatore Tamil Nadu 641021</p>
            <p className="text-background/80">Email: enquiry@careerguidancecoach.com</p>
            <p className="text-background/80">Phone: 9443690870</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <h4 className="font-semibold mb-4 text-center">Follow Us</h4>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors duration-200 group"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-background/80 group-hover:text-blue-400 transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2025 Wise Wave Edu Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;