import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Youtube, Instagram, Facebook, MessageCircle, Linkedin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ContactFormModal from './ContactFormModal';
import logoImage from '@/assets/logo.jpeg';

const socialLinks = [
  { name: 'YouTube', url: 'https://youtube.com/@wisewaveedusolutions?si=FiRfy-QjuJonqsiV', icon: Youtube },
  { name: 'Instagram', url: 'https://www.instagram.com/wisewaveedusolutions?igsh=OWJ0YWFrYnJiczc0', icon: Instagram },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1B8ZVSFqwS/', icon: Facebook },
  { name: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029VadvbCH1nozDAGhh3z2l', icon: MessageCircle },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/suresh-n-a2a4771b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin },
];

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle }) => {
  const isMobile = useIsMobile();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ];

  const handleLinkClick = (href: string) => {
    onToggle();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={onToggle}
        className="hamburger-button relative z-[9999] p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:hidden bg-white border-2 border-gray-300 shadow-md"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out transform ${isOpen
              ? 'rotate-45 translate-y-1'
              : '-translate-y-1'
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${isOpen
              ? 'opacity-0 scale-0'
              : 'opacity-100 scale-100'
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out transform ${isOpen
              ? '-rotate-45 -translate-y-1'
              : 'translate-y-1'
              }`}
          />
        </div>
      </button>

      {/* Full Screen Mobile Menu Overlay */}
      {createPortal(
        <div
          className={`mobile-menu fixed inset-0 z-[10000] md:hidden bg-white transition-all duration-300 ease-in-out flex flex-col ${isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-full'
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white shrink-0">
            <div className="flex items-center space-x-2">
              <img src={logoImage} alt="Wise Wave Edu Solutions Logo" className="h-10 w-auto rounded-md" />
              <span className="text-xl font-bold text-red-600">
                Wise Wave Edu Solutions
              </span>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center pt-8 pb-8 px-6">
            {/* Navigation Links */}
            <nav className="w-full max-w-md">
              <ul className="space-y-6 text-center">
                {navItems.map((item, index) => (
                  <li
                    key={item.href}
                    className={`transform transition-all duration-300 ease-out ${isOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                      }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 block w-full py-2"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div
                className={`mt-10 space-y-4 transform transition-all duration-300 ease-out ${isOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
                  }`}
                style={{ transitionDelay: `${navItems.length * 50}ms` }}
              >
                <Button
                  onClick={() => {
                    onToggle();
                    setIsContactModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl rounded-xl"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => {
                    onToggle();
                    window.open('https://calendly.com/leadssuresha/30min', '_blank', 'noopener,noreferrer');
                  }}
                  variant="outline"
                  className="w-full border-2 border-blue-100 text-blue-700 hover:bg-blue-50 hover:border-blue-200 py-6 text-lg font-medium rounded-xl"
                >
                  Book Consultation
                </Button>
              </div>
            </nav>

            {/* Social Media Section */}
            <div
              className={`mt-auto pt-10 transform transition-all duration-300 ease-out ${isOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
                }`}
              style={{ transitionDelay: `${(navItems.length + 2) * 50}ms` }}
            >
              <h4 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wider text-center">Follow Us</h4>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-gray-500 group shadow-sm hover:shadow-md hover:-translate-y-1"
                      aria-label={`Follow us on ${social.name}`}
                      onClick={() => onToggle()}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Ribbon */}
          <div className="py-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
            <p className="text-xs text-gray-500">
              © 2025 Wise Wave Edu Solutions. All rights reserved.
            </p>
          </div>
        </div>,
        document.body
      )}

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default HamburgerMenu;
