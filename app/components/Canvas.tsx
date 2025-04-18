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
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
});

// Add display name for better debugging
Canvas.displayName = 'Canvas';

export default Canvas; 