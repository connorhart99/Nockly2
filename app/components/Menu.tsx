'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track which canvas is currently active
  useEffect(() => {
    const checkActiveCanvas = () => {
      // Check if we can find any visible canvases based on the data attribute
      const visibleCanvases = document.querySelectorAll('.absolute.top-0.left-0.h-full.w-full');
      
      visibleCanvases.forEach(canvas => {
        const transform = window.getComputedStyle(canvas).transform;
        // If this canvas has no Y translation (meaning it's the current one)
        if (transform.includes('matrix') && !transform.includes('translate3d(0px, 0px, 0px)') && 
            Math.abs(parseFloat(transform.split(',')[5])) < 1) {
          const index = parseInt(canvas.getAttribute('data-index') || '0');
          if (!isNaN(index) && index !== currentIndex) {
            setCurrentIndex(index);
          }
        }
      });
    };

    // Run the check periodically
    const interval = setInterval(checkActiveCanvas, 200);
    checkActiveCanvas(); // Check immediately on mount
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to navigate to a specific section
  const navigateToSection = (index: number) => {
    if (typeof window.setCanvasIndex === 'function') {
      // Use the global function defined in CanvasContainer
      window.setCanvasIndex(index);
      setCurrentIndex(index);
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
      {/* Menu button - always visible in top left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded-lg bg-forest-green/80 backdrop-blur-sm hover:bg-forest-green transition-colors z-[60]"
        aria-label="Menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center gap-1">
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full bg-dark-brown/95 backdrop-blur-md z-50"
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col items-center justify-center gap-6"
              >
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => navigateToSection(section.index)}
                    className={`text-3xl md:text-4xl font-light px-8 py-2 text-white hover:text-deep-burgundy transition-colors duration-300 ${
                      currentIndex === section.index ? 'text-deep-burgundy' : ''
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu; 