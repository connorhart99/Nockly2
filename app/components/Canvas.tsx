import React, { ReactNode, memo } from 'react';

interface CanvasProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

// Using memo to prevent unnecessary re-renders
const Canvas: React.FC<CanvasProps> = memo(({ children, className = '', id }) => {
  return (
    <section 
      id={id}
      className={`fullscreen-canvas ${className}`}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </section>
  );
});

// Add display name for better debugging
Canvas.displayName = 'Canvas';

export default Canvas; 