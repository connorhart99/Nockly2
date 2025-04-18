import React, { ReactNode, memo } from 'react';

interface CanvasProps {
  children: ReactNode;
  className?: string;
}

// Using memo to prevent unnecessary re-renders
const Canvas: React.FC<CanvasProps> = memo(({ children, className = '' }) => {
  return (
    <div 
      className={`fullscreen-canvas ${className}`}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        backgroundColor: 'rgba(38, 13, 0, 0.7)', // Semi-transparent dark brown overlay
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)'
      }}
    >
      {children}
    </div>
  );
});

// Add display name for better debugging
Canvas.displayName = 'Canvas';

export default Canvas; 