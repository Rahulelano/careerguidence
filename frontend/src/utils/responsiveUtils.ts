import { useEffect, useState } from 'react';

// Responsive breakpoint hook
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  const isLargeDesktop = screenSize.width >= 1280;
  const isUltraWide = screenSize.width >= 1920;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isUltraWide,
    currentBreakpoint: isMobile ? 'mobile' : 
                      isTablet ? 'tablet' : 
                      isLargeDesktop ? 'largeDesktop' : 
                      isUltraWide ? 'ultraWide' : 'desktop'
  };
};

// Performance optimization hook
export const usePerformanceOptimizations = () => {
  const { isMobile } = useResponsive();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const shouldReduceAnimations = isMobile || prefersReducedMotion;
  const shouldDisableParallax = isMobile;
  const shouldLazyLoadImages = !isMobile;

  return {
    shouldReduceAnimations,
    shouldDisableParallax,
    shouldLazyLoadImages,
    prefersReducedMotion,
    isMobile,
  };
};

// Utility functions for responsive design (non-hook version)
export const getResponsiveValue = (values: {
  mobile?: string | number;
  tablet?: string | number;
  desktop?: string | number;
  largeDesktop?: string | number;
  ultraWide?: string | number;
}, screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1280;
  const isUltraWide = width >= 1920;

  if (isUltraWide && values.ultraWide) return values.ultraWide;
  if (isLargeDesktop && values.largeDesktop) return values.largeDesktop;
  if (isDesktop && values.desktop) return values.desktop;
  if (isTablet && values.tablet) return values.tablet;
  if (isMobile && values.mobile) return values.mobile;
  
  // Fallback to desktop or first available value
  return values.desktop || values.tablet || values.mobile || values.largeDesktop || values.ultraWide;
};

// Get responsive classes for Tailwind
export const getResponsiveClasses = (classes: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  largeDesktop?: string;
  ultraWide?: string;
}, screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1280;
  const isUltraWide = width >= 1920;

  if (isUltraWide) return classes.ultraWide || classes.largeDesktop || classes.desktop || classes.tablet || classes.mobile;
  if (isLargeDesktop) return classes.largeDesktop || classes.desktop || classes.tablet || classes.mobile;
  if (isDesktop) return classes.desktop || classes.tablet || classes.mobile;
  if (isTablet) return classes.tablet || classes.mobile;
  return classes.mobile || classes.tablet || classes.desktop || classes.largeDesktop || classes.ultraWide;
};

// Calculate responsive font sizes
export const getResponsiveFontSize = (baseSize: number, screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLargeDesktop = width >= 1280;
  
  if (isMobile) return Math.round(baseSize * 0.9); // 10% smaller on mobile
  if (isTablet) return baseSize;
  if (isLargeDesktop) return Math.round(baseSize * 1.1); // 10% larger on large screens
  return baseSize;
};

// Image optimization utilities
export const getOptimizedImageSrc = (src: string, { quality = 'medium', format = 'auto' } = {}) => {
  // In a real application, this would add query parameters for image optimization
  // For example: `https://cdn.example.com/image.jpg?quality=${quality}&format=${format}&w=${width}`
  return src;
};

// Responsive grid calculation
export const getResponsiveGridCols = (desiredCols: number, screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  if (isMobile) return 1;
  if (isTablet) return Math.min(2, desiredCols);
  return desiredCols;
};

// Performance monitoring utility
export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
  const start = performance.now();
  
  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now();
      console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
    });
  } else {
    const end = performance.now();
    console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
    return result;
  }
};

// Touch device detection
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Responsive spacing utility
export const getResponsiveSpacing = (baseSpacing: number, screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const isMobile = width < 768;
  const isLargeDesktop = width >= 1280;
  
  if (isMobile) return Math.round(baseSpacing * 0.75);
  if (isLargeDesktop) return Math.round(baseSpacing * 1.25);
  return baseSpacing;
};

// Container width utility
export const getResponsiveContainerWidth = (screenSize?: { width: number }) => {
  const width = screenSize?.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1280;
  
  if (isMobile) return '100%';
  if (isTablet) return '750px';
  if (isDesktop) return '1000px';
  if (isLargeDesktop) return '1200px';
  return '1400px';
};

// Custom hooks version for use in components
export const useGetResponsiveValue = (values: {
  mobile?: string | number;
  tablet?: string | number;
  desktop?: string | number;
  largeDesktop?: string | number;
  ultraWide?: string | number;
}) => {
  const { screenSize } = useResponsive();
  return getResponsiveValue(values, screenSize);
};

export const useGetResponsiveClasses = (classes: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  largeDesktop?: string;
  ultraWide?: string;
}) => {
  const { screenSize } = useResponsive();
  return getResponsiveClasses(classes, screenSize);
};

export const useGetResponsiveFontSize = (baseSize: number) => {
  const { screenSize } = useResponsive();
  return getResponsiveFontSize(baseSize, screenSize);
};

export const useGetResponsiveGridCols = (desiredCols: number) => {
  const { screenSize } = useResponsive();
  return getResponsiveGridCols(desiredCols, screenSize);
};

export const useGetResponsiveSpacing = (baseSpacing: number) => {
  const { screenSize } = useResponsive();
  return getResponsiveSpacing(baseSpacing, screenSize);
};

// Export all utilities
export default {
  useResponsive,
  usePerformanceOptimizations,
  getResponsiveValue,
  getResponsiveClasses,
  getResponsiveFontSize,
  getOptimizedImageSrc,
  getResponsiveGridCols,
  measurePerformance,
  isTouchDevice,
  getResponsiveSpacing,
  getResponsiveContainerWidth,
};