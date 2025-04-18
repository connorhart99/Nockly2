import { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import { motion, AnimatePresence } from 'framer-motion';

// Fallback base64 images
const fallbackImages = {
  portfolio1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%23380000'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3EHart & Soul Retreats%3C/text%3E%3C/svg%3E",
  portfolio2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%2305421b'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3E26M2M%3C/text%3E%3C/svg%3E",
};

const getFallbackImage = (index: number): string => {
  if (index === 0) return fallbackImages.portfolio1;
  return fallbackImages.portfolio2;
};

interface PortfolioItemProps {
  item: { 
    title: string; 
    url: string; 
    image: string; 
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
  distanceFromActive: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
  item, 
  index, 
  isActive, 
  onClick,
  distanceFromActive 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackImage = getFallbackImage(index);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageFailed(true);
  };

  // Calculate position-based styles based on distance from active
  const getPositionStyles = () => {
    const absDistance = Math.abs(distanceFromActive);
    
    // Base values for different distances
    const baseConfig = {
      0: { // Active card (center)
        zIndex: 10,
        scale: 1,
        opacity: 1,
        x: '0%',
      },
      1: { // Adjacent cards
        zIndex: 5,
        scale: 0.85,
        opacity: 0.7,
        x: distanceFromActive > 0 ? '75%' : '-75%',
      },
      // All other cards maintain equal spacing
      2: {
        zIndex: 1,
        scale: 0.7,
        opacity: 0.5,
        x: distanceFromActive > 0 ? '150%' : '-150%',
      }
    };
    
    // Use the appropriate config based on distance, or the furthest one for larger distances
    const config = baseConfig[Math.min(absDistance, 2) as keyof typeof baseConfig];
    
    return config;
  };

  const positionStyles = getPositionStyles();

  return (
    <motion.div 
      className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-lg overflow-hidden cursor-pointer w-64 md:w-80"
      initial={false}
      animate={{
        x: `calc(-50% + ${positionStyles.x})`,
        scale: positionStyles.scale,
        opacity: positionStyles.opacity,
        zIndex: positionStyles.zIndex,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      }}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.05 : positionStyles.scale * 1.05 }}
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{ 
            backgroundImage: imageFailed || !imageLoaded 
              ? `url("${fallbackImage}")` 
              : `url(${item.image})` 
          }}
        ></div>
        <img 
          src={item.image} 
          alt={item.title}
          className="hidden"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className={`absolute inset-0 bg-deep-burgundy/50 transition-opacity duration-300 flex items-center justify-center ${isActive ? 'opacity-0 hover:opacity-100' : 'opacity-0'}`}>
          <span className="text-xl font-semibold">View Project</span>
        </div>
      </div>
      <div className="p-4 bg-forest-green">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="text-white/70">{item.url}</p>
      </div>
    </motion.div>
  );
};

const PortfolioCanvas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const portfolioItems = [
    {
      title: "Hart & Soul Retreats",
      url: "hartandsoulretreats.co.uk",
      image: "/portfolio-1.jpg"
    },
    {
      title: "26M2M",
      url: "26m2m.com",
      image: "/portfolio-2.jpg"
    }
  ];

  // Handle navigation
  const navigateToItem = (index: number) => {
    if (isTransitioning) return;
    
    if (index >= 0 && index < portfolioItems.length) {
      setIsTransitioning(true);
      setActiveIndex(index);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        navigateToItem(activeIndex - 1);
      } else if (e.key === 'ArrowRight' && activeIndex < portfolioItems.length - 1) {
        navigateToItem(activeIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  // Determine which items to render for performance optimization
  // We'll render all items since we only have two
  const shouldRenderItem = (index: number) => true;

  return (
    <Canvas className="bg-dark-brown">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Portfolio</h2>
        
        <div ref={carouselRef} className="relative h-96 md:h-108 w-full portfolio-perspective">
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {portfolioItems.map((item, index) => (
              <PortfolioItem 
                key={index}
                item={item}
                index={index}
                isActive={index === activeIndex}
                onClick={() => navigateToItem(index)}
                distanceFromActive={index - activeIndex}
              />
            ))}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-4">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToItem(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-white scale-100' 
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Canvas>
  );
};

export default PortfolioCanvas; 