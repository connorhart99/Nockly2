import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Canvas from './Canvas';

// Define the global function type
declare global {
  interface Window {
    setCanvasIndex?: (index: number) => void;
  }
}

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
  const lastInteractionTime = useRef<number>(0);
  const interactionCooldown = 300; // ms

  // Set up global navigation function
  useEffect(() => {
    // Create an intentionally simple function that just updates the current index
    window.setCanvasIndex = (index: number) => {
      console.log(`Setting canvas index to: ${index}`);
      if (index >= 0 && index < canvases.length) {
        setCurrentIndex(index);
      }
    };

    // Clean up
    return () => {
      window.setCanvasIndex = undefined;
    };
  }, [canvases.length]);

  // Handle keyboard navigation with throttling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastInteractionTime.current < interactionCooldown) return;
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        lastInteractionTime.current = now;
      } else if (e.key === 'ArrowDown' && currentIndex < canvases.length - 1) {
        setCurrentIndex(prev => prev + 1);
        lastInteractionTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, canvases.length, interactionCooldown]);

  // Optimized wheel/scroll navigation
  useEffect(() => {
    // Use passive listener for better performance
    const handleWheel = (e: WheelEvent) => {
      // Prevent default to stop browser scrolling behavior
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastInteractionTime.current < interactionCooldown) return;
      
      // Use a higher threshold to reduce accidental scrolls
      const threshold = 20;
      
      if (e.deltaY < -threshold && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        lastInteractionTime.current = now;
      } else if (e.deltaY > threshold && currentIndex < canvases.length - 1) {
        setCurrentIndex(prev => prev + 1);
        lastInteractionTime.current = now;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, canvases.length, interactionCooldown]);

  // Optimized drag handling
  const swipeThreshold = 50; // Pixels needed to swipe
  
  const handleDragEnd = (info: any) => {
    const now = Date.now();
    if (now - lastInteractionTime.current < interactionCooldown) return;
    
    const offset = info.offset.y;
    
    if (offset > swipeThreshold && currentIndex > 0) {
      // Swiped down, go to previous
      setCurrentIndex(prev => prev - 1);
      lastInteractionTime.current = now;
    } else if (offset < -swipeThreshold && currentIndex < canvases.length - 1) {
      // Swiped up, go to next
      setCurrentIndex(prev => prev + 1);
      lastInteractionTime.current = now;
    }
  };

  // Handle direct navigation to a specific canvas
  const handleIndicatorClick = (index: number) => {
    if (index === currentIndex) return;
    
    const now = Date.now();
    if (now - lastInteractionTime.current < interactionCooldown) return;
    
    setCurrentIndex(index);
    lastInteractionTime.current = now;
  };

  // Determine which canvases to render - only current and adjacent
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
    <div 
      className="h-screen w-screen overflow-hidden touch-none will-change-transform" 
      ref={containerRef}
      id="canvas-container"
    >
      <div 
        className="relative h-full w-full"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        {canvases.map((canvas, index) => {
          // Only render canvases that are current or adjacent
          if (!renderIndexes.includes(index)) return null;
          
          // Calculate position relative to current index
          const position = index - currentIndex;
          
          return (
            <motion.div
              key={canvas.id}
              className="absolute top-0 left-0 h-full w-full"
              data-index={index}
              id={`canvas-${canvas.id}`}
              initial={false}
              animate={{
                y: `${position * 100}%`,
                scale: 1 - Math.abs(position) * 0.05, // Slightly scale down non-current canvases
                zIndex: 10 - Math.abs(position),
              }}
              transition={{
                type: 'spring',
                stiffness: 300, // Reduced from 400 to be gentler
                damping: 40, // Increased from 30 for less oscillation
                restDelta: 0.005, // Reduced precision to improve performance
                restSpeed: 0.005, // Added to stop animation sooner
              }}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2} // Reduced from 0.4 for less strain on GPU
              dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
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
    </div>
  );
};

export default CanvasContainer; 