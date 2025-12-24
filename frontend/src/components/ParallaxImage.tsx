import React, { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
  disableOnMobile?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 0.5,
  className = "",
  children,
  disableOnMobile = true,
  ...props
}) => {
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        // Disable parallax on mobile for better performance
        if (disableOnMobile && window.innerWidth <= 768) {
          setScrollY(0);
          return;
        }

        const rect = parallaxRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -speed;
        setScrollY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disableOnMobile]);

  return (
    <div
      ref={parallaxRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPositionY: `${scrollY}px`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Parallax section component for full sections
export const ParallaxSection: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.3, className = "" }) => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY - rect.top;
        const rate = scrolled * speed;
        setScrollY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${scrollY}px)`
      }}
    >
      {children}
    </div>
  );
};

// Hook for custom parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -speed;
        setScrollY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { scrollY, elementRef };
};