import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MediaOptimizerProps {
  children: React.ReactNode;
  className?: string;
}

// Optimize animations and effects for mobile devices
export const MediaOptimizer: React.FC<MediaOptimizerProps> = ({ 
  children, 
  className = "" 
}) => {
  const isMobile = useIsMobile();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preference
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <div className={`${className} ${isMobile || reducedMotion ? 'media-optimized' : ''}`}>
      {children}
    </div>
  );
};

// Responsive video wrapper
interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  ...props
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`relative w-full ${className}`}>
      <video
        src={src}
        poster={poster}
        autoPlay={isMobile ? false : autoPlay}
        loop={isMobile ? false : loop}
        muted={muted}
        controls={controls}
        playsInline
        preload="metadata"
        className={`
          w-full h-full object-cover
          ${isMobile ? 'mobile-video-optimized' : ''}
        `}
        {...props}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Optimized image gallery
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    fallbackSrc?: string;
  }>;
  className?: string;
  columns?: number;
}

export const ResponsiveImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = "",
  columns = 3,
}) => {
  const isMobile = useIsMobile();

  const getGridClass = () => {
    if (isMobile) return 'grid-cols-1';
    if (columns === 1) return 'grid-cols-1';
    if (columns === 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className={`grid ${getGridClass()} gap-4 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg aspect-square"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="
              w-full h-full object-cover
              transition-transform duration-300 ease-in-out
              group-hover:scale-105
            "
            onError={(e) => {
              if (image.fallbackSrc) {
                e.currentTarget.src = image.fallbackSrc;
              }
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

// Performance-aware animation component
interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'bounceIn';
  delay?: number;
  className?: string;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
    }

    // Disable animations on mobile for better performance
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const element = document.currentScript?.parentElement;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [delay, isMobile]);

  if (isMobile || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationClasses = {
    fadeIn: `transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`,
    slideUp: `transition-all duration-600 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`,
    scaleIn: `transition-all duration-500 ease-out ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`,
    bounceIn: `transition-all duration-800 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`,
  };

  return (
    <div className={`${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  );
};

export default MediaOptimizer;