import React from 'react';

interface PlaceholderImageProps {
  text?: string;
  width?: string;
  height?: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  text = 'Image',
  width = '100%',
  height = '100%',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center bg-forest-green/50 text-white ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12 mx-auto mb-2 opacity-60"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PlaceholderImage; 