import React, { ReactNode } from 'react';

interface CanvasProps {
  children: ReactNode;
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ children, className = '' }) => {
  return (
    <div className={`fullscreen-canvas ${className}`}>
      {children}
    </div>
  );
};

export default Canvas; 