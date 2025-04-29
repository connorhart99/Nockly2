'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Event name must match the one in CanvasContainer
const CANVAS_INDEX_CHANGE_EVENT = 'canvasindexchange';

// Sections must match the order in the page.tsx file
const sections = [
  { id: 'hero', label: 'Home', index: 0 },
  { id: 'services', label: 'Services', index: 1 },
  { id: 'about', label: 'About', index: 2 },
  { id: 'portfolio', label: 'Portfolio', index: 3 },
  { id: 'pricing', label: 'Pricing', index: 4 },
  { id: 'contact', label: 'Contact', index: 5 }
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize state from global variable if available, otherwise default to 0
  const [currentIndex, setCurrentIndex] = useState(() => {
    return typeof window !== 'undefined' ? window.currentCanvasIndex ?? 0 : 0;
  });

  // Listen for canvas index changes from CanvasContainer
  useEffect(() => {
    const handleCanvasChange = (event: Event) => {
      // Type assertion for CustomEvent
      const customEvent = event as CustomEvent<{ index: number }>; 
      const newIndex = customEvent.detail.index;
      console.log(`Menu received ${CANVAS_INDEX_CHANGE_EVENT} with index: ${newIndex}`);
      setCurrentIndex(newIndex); // Update menu state based on the event
    };

    window.addEventListener(CANVAS_INDEX_CHANGE_EVENT, handleCanvasChange);

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener(CANVAS_INDEX_CHANGE_EVENT, handleCanvasChange);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to navigate to a specific section
  const navigateToSection = (index: number) => {
    if (typeof window.setCanvasIndex === 'function') {
      // Use the global function defined in CanvasContainer
      window.setCanvasIndex(index);
      // REMOVE setCurrentIndex(index) from here - let the event listener handle it
      setIsOpen(false);
    } else {
      console.error("Navigation function not available");
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu button with improved styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 p-2.5 rounded-lg bg-forest-green/90 hover:bg-forest-green transition-all duration-300 shadow-lg backdrop-blur-md z-[60] border border-white/10 hover:border-white/20"
        aria-label="Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block w-full h-0.5 bg-white/90 rounded-full transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-full h-0.5 bg-white/90 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
          <span className={`block w-full h-0.5 bg-white/90 rounded-full transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Full-screen menu overlay - appears instantly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full bg-dark-brown-70 backdrop-blur-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button 
              className="absolute top-5 left-5 text-white/70 hover:text-white p-2.5 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-8 px-5">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => navigateToSection(section.index)}
                    className={`relative text-4xl lg:text-5xl font-normal px-12 py-3 ${
                      currentIndex === section.index 
                        ? 'text-white bg-forest-green rounded-lg shadow-lg border border-white/20' 
                        : 'text-white hover:bg-forest-green/30 hover:rounded-lg transition-all'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu; 