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
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-dark-brown-70 backdrop-blur-lg z-50">
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
        </div>
      )}
    </>
  );
};

export default Menu; 