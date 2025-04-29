import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Canvas from './Canvas';

// Define the global function and potentially a state variable type
declare global {
  interface Window {
    setCanvasIndex?: (index: number) => void;
    currentCanvasIndex?: number; // Optional: For initial state sync
  }
}

// Define event name
const CANVAS_INDEX_CHANGE_EVENT = 'canvasindexchange';

interface CanvasContainerProps {
  canvases: {
    id: string;
    content: ReactNode;
  }[];
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ canvases }) => {
  const [currentIndex, _setCurrentIndex] = useState(0); // Rename internal setter
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastInteractionTime = useRef<number>(0);
  const interactionCooldown = 300; // ms

  // Ref to track the actual index to avoid stale closure issues in event dispatch
  const currentIndexRef = useRef(currentIndex);

  // Effect to set initial global state
  useEffect(() => {
    window.currentCanvasIndex = 0;
  }, []);

  // Custom setter function to update state, ref, global var, and dispatch event
  const setCurrentCanvasIndex = (newIndex: number) => {
    if (newIndex === currentIndexRef.current) return; // Avoid redundant updates

    _setCurrentIndex(newIndex); // Update React state
    currentIndexRef.current = newIndex; // Update ref
    window.currentCanvasIndex = newIndex; // Update global variable
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent(CANVAS_INDEX_CHANGE_EVENT, { 
      detail: { index: newIndex } 
    }));
    
    console.log(`Dispatched ${CANVAS_INDEX_CHANGE_EVENT} with index: ${newIndex}`);
  };

  // Set up global navigation function
  useEffect(() => {
    window.setCanvasIndex = (index: number) => {
      console.log(`Global setCanvasIndex called with: ${index}`);
      if (isAnimating) return;
      const now = Date.now();
      if (now - lastInteractionTime.current < interactionCooldown) return;

      if (index >= 0 && index < canvases.length && index !== currentIndexRef.current) {
        setIsAnimating(true);
        // Use the custom setter
        setCurrentCanvasIndex(index);
        lastInteractionTime.current = now;
      }
    };
    return () => {
      window.setCanvasIndex = undefined;
    };
    // Depend on the actual state variable currentIndex
  }, [canvases.length, isAnimating, currentIndex, interactionCooldown]); 

  // Handle keyboard navigation with throttling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      const now = Date.now();
      if (now - lastInteractionTime.current < interactionCooldown) return;
      
      let newIndex = currentIndexRef.current;
      if (e.key === 'ArrowUp' && currentIndexRef.current > 0) {
        newIndex = currentIndexRef.current - 1;
      } else if (e.key === 'ArrowDown' && currentIndexRef.current < canvases.length - 1) {
        newIndex = currentIndexRef.current + 1;
      }

      if (newIndex !== currentIndexRef.current) {
        setIsAnimating(true);
        // Use the custom setter
        setCurrentCanvasIndex(newIndex);
        lastInteractionTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // Depend on actual state
  }, [canvases.length, interactionCooldown, isAnimating, currentIndex]); 

  // Optimized wheel/scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      
      const now = Date.now();
      if (now - lastInteractionTime.current < interactionCooldown) return;
      
      const threshold = 20;
      let newIndex = currentIndexRef.current;
      
      if (e.deltaY < -threshold && currentIndexRef.current > 0) {
        newIndex = currentIndexRef.current - 1;
      } else if (e.deltaY > threshold && currentIndexRef.current < canvases.length - 1) {
        newIndex = currentIndexRef.current + 1;
      }

      if (newIndex !== currentIndexRef.current) {
        setIsAnimating(true);
        // Use the custom setter
        setCurrentCanvasIndex(newIndex);
        lastInteractionTime.current = now;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
    // Depend on actual state
  }, [canvases.length, interactionCooldown, isAnimating, currentIndex]); 

  // Optimized drag handling
  const swipeThreshold = 50;
  
  const handleDragEnd = (info: any) => {
    if (isAnimating) return;

    const offset = info.offset.y;
    let newIndex = currentIndexRef.current;
    
    if (offset > swipeThreshold && currentIndexRef.current > 0) {
      newIndex = currentIndexRef.current - 1;
    } else if (offset < -swipeThreshold && currentIndexRef.current < canvases.length - 1) {
      newIndex = currentIndexRef.current + 1;
    }
    
    if (newIndex !== currentIndexRef.current) {
      setIsAnimating(true);
      // Use the custom setter
      setCurrentCanvasIndex(newIndex);
      lastInteractionTime.current = Date.now();
    } else {
      // Snap back handled implicitly
    }
  };

  // Handle direct navigation to a specific canvas (e.g., potentially internal buttons, though Menu uses global)
  // We keep this separate, but it should also use the custom setter if it modifies the index.
  const handleIndicatorClick = (index: number) => {
    if (isAnimating) return;
    if (index === currentIndexRef.current) return;
    
    const now = Date.now();
    if (now - lastInteractionTime.current < interactionCooldown) return;
    
    setIsAnimating(true);
    // Use the custom setter
    setCurrentCanvasIndex(index);
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
                type: 'tween',
                ease: 'easeOut',
                duration: 0.3
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
              onAnimationComplete={() => {
                setIsAnimating(false);
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