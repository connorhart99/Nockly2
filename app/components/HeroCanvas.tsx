import { useState, useEffect } from 'react';
import Canvas from './Canvas';
import PlaceholderImage from './Placeholder';

const HeroCanvas = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Fallback image - dark green gradient
  const fallbackImageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1080'%3E%3Cstop offset='0' stop-color='%23260d00'/%3E%3Cstop offset='1' stop-color='%2305421b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1920' height='1080'/%3E%3C/svg%3E";

  useEffect(() => {
    const img = new Image();
    img.src = '/hero-bg.jpg';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageFailed(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <Canvas className="relative">
      <div className="absolute inset-0 bg-dark-brown opacity-70 z-0"></div>
      
      {imageFailed ? (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url("${fallbackImageUrl}")`,
            filter: 'brightness(0.5)'
          }}
        ></div>
      ) : (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: imageLoaded ? 'url(/hero-bg.jpg)' : `url("${fallbackImageUrl}")`,
            filter: 'brightness(0.4)'
          }}
        ></div>
      )}
      
      <div className="z-10 relative text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          We Craft Websites
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl">
          Beautiful, functional websites that elevate your brand
        </p>
      </div>
    </Canvas>
  );
};

export default HeroCanvas; 