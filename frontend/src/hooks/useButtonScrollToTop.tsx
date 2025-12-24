import { useEffect } from 'react';

// Custom hook to make all buttons scroll to page top
export const useButtonScrollToTop = () => {
  useEffect(() => {
    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Check if the clicked element is a button or inside a button
      if (target.closest('button')) {
        // Scroll to page top with smooth behavior
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleButtonClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, []);
};