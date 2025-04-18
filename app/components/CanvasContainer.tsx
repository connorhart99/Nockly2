import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Canvas from './Canvas';

interface CanvasContainerProps {
  canvases: {
    id: string;
    content: ReactNode;
  }[];
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ canvases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < canvases.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, canvases.length]);

  // Handle wheel/scroll navigation
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollCooldown = 300;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;
      
      if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        lastScrollTime = now;
      } else if (e.deltaY > 0 && currentIndex < canvases.length - 1) {
        setCurrentIndex(prev => prev + 1);
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, canvases.length]);

  // Calculate the drag constraints
  const swipeThreshold = 50; // Pixels needed to swipe
  
  const handleDragEnd = (info: any) => {
    const offset = info.offset.y;
    
    if (offset > swipeThreshold && currentIndex > 0) {
      // Swiped down, go to previous
      setCurrentIndex(prev => prev - 1);
    } else if (offset < -swipeThreshold && currentIndex < canvases.length - 1) {
      // Swiped up, go to next
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Handle direct navigation to a specific canvas
  const handleIndicatorClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Determine which canvases to render
  const renderIndexes: number[] = [];
  // Always render current canvas
  renderIndexes.push(currentIndex);
  // Add previous canvas if it exists
  if (currentIndex > 0) {
    renderIndexes.push(currentIndex - 1);
  }
  // Add next canvas if it exists
  if (currentIndex < canvases.length - 1) {
    renderIndexes.push(currentIndex + 1);
  }

  return (
    <div className="h-screen w-screen overflow-hidden touch-none" ref={containerRef}>
      <div 
        className="relative h-full w-full"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {canvases.map((canvas, index) => {
          // Only render canvases that are current, previous or next
          if (!renderIndexes.includes(index)) return null;
          
          // Calculate position relative to current index
          const position = index - currentIndex;
          
          return (
            <motion.div
              key={canvas.id}
              className="absolute top-0 left-0 h-full w-full"
              initial={false}
              animate={{
                y: `${position * 100}%`,
                scale: 1 - Math.abs(position) * 0.05, // Slightly scale down non-current canvases
                zIndex: 10 - Math.abs(position),
                filter: position !== 0 ? 'brightness(0.8)' : 'brightness(1)' // Dim non-current canvases
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                restDelta: 0.001
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                handleDragEnd(info);
              }}
            >
              {canvas.content}
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-2">
          {canvases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-12 rounded-full transition-all cursor-pointer ${
                index === currentIndex
                  ? 'bg-white scale-y-100'
                  : 'bg-white/30 scale-y-75 hover:bg-white/60'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        {currentIndex > 0 && (
          <button 
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="text-white bg-forest-green/70 hover:bg-forest-green p-2 rounded-full mb-2 transition-colors focus:outline-none"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        {currentIndex < canvases.length - 1 && (
          <button 
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="text-white bg-forest-green/70 hover:bg-forest-green p-2 rounded-full transition-colors focus:outline-none"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CanvasContainer; 