import React from 'react';
import { ParallaxImage, ParallaxSection } from '@/components/ParallaxImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParallaxDemo = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">Wise Wave</Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/parallax-demo" className="text-blue-600 font-semibold">Parallax Demo</Link>
              <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                <Button>Get Started</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Background */}
      <ParallaxImage
        src="/images/bgind.jpg"
        alt="Parallax Demo Background"
        speed={0.3}
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Parallax Effects Demo
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Experience smooth parallax scrolling with multiple background images
          </p>
          <Button size="xl" className="bg-blue-600 hover:bg-blue-700">
            Scroll Down to Explore
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </ParallaxImage>

      {/* Content Sections with Parallax */}
      <ParallaxSection speed={0.2} className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Smooth Scrolling Effects
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Each section moves at a different speed creating depth and visual interest
            </p>
          </div>
        </div>
      </ParallaxSection>

      {/* Image Gallery with Parallax */}
      <ParallaxSection speed={0.1} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Parallax Image Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: "/images/bgind2.jpg", title: "Background Pattern 2", desc: "Subtle parallax movement" },
              { src: "/images/bgind3.jpg", title: "Background Pattern 3", desc: "Smooth scrolling effect" },
              { src: "/images/ind1.jpg", title: "Design Element 1", desc: "Layered parallax depth" },
              { src: "/images/ind2.jpg", title: "Design Element 2", desc: "Dynamic background motion" },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <ParallaxImage
                  src={item.src}
                  alt={item.title}
                  speed={0.2}
                  className="h-64 bg-cover bg-center"
                >
                  <div className="h-full bg-black/30 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  </div>
                </ParallaxImage>
              </Card>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Multi-layer Parallax Section */}
      <ParallaxSection speed={0.3} className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background layers */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(/images/bgind.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateY(var(--parallax-bg, 0px))'
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(/images/bgind2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateY(calc(var(--parallax-bg, 0px) * 0.5))'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multi-Layer Parallax
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Multiple background layers moving at different speeds create incredible depth
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Layer</h3>
                <p className="text-gray-300">Moves quickly with scroll</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Medium Layer</h3>
                <p className="text-gray-300">Balanced movement speed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Slow Layer</h3>
                <p className="text-gray-300">Gentle, subtle motion</p>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA */}
      <ParallaxSection speed={0.15} className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience Parallax Effects
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            See how parallax scrolling can transform your website's visual appeal
          </p>
          <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600">
            Back to Home
          </Button>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default ParallaxDemo;