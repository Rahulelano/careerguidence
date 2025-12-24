import React from 'react';
import { useResponsive, usePerformanceOptimizations } from '@/utils/responsiveUtils';

const ResponsiveTest: React.FC = () => {
  const { screenSize, currentBreakpoint } = useResponsive();
  const { shouldReduceAnimations, shouldDisableParallax, shouldLazyLoadImages, isMobile } = usePerformanceOptimizations();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono max-w-sm">
      <div className="space-y-1">
        <div className="font-bold text-yellow-400">📱 Responsive Debug Panel</div>
        <div>Screen: {screenSize.width} × {screenSize.height}</div>
        <div>Breakpoint: {currentBreakpoint}</div>
        <div>Mobile: {isMobile ? '✅' : '❌'}</div>
        <div>Reduce Animations: {shouldReduceAnimations ? '✅' : '❌'}</div>
        <div>Disable Parallax: {shouldDisableParallax ? '✅' : '❌'}</div>
        <div>Lazy Load Images: {shouldLazyLoadImages ? '✅' : '❌'}</div>
        
        {/* CSS Grid Test */}
        <div className="mt-2 pt-2 border-t border-gray-600">
          <div className="font-bold text-blue-400">CSS Grid Test:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mt-1">
            <div className="bg-red-500 h-4 rounded">1</div>
            <div className="bg-green-500 h-4 rounded">2</div>
            <div className="bg-blue-500 h-4 rounded">3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTest;