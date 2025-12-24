// Utility functions for smooth scrolling to page top

export const scrollToPageTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

export const scrollToTopInstant = () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
};

// Button click handler that scrolls to top
export const handleButtonClick = (callback?: () => void) => {
  return () => {
    scrollToPageTop(true);
    if (callback) {
      callback();
    }
  };
};