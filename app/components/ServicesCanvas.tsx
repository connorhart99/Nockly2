import { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import { motion, PanInfo } from 'framer-motion';

// Service images
const serviceImages = {
  webDesign: "/service-design.jpg", // Replace with actual image path
  development: "/service-development.jpg", // Replace with actual image path
  seo: "/service-seo.jpg", // Replace with actual image path
};

// Fallback base64 images
const fallbackImages = {
  webDesign: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%2305421b'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3EWeb Design%3C/text%3E%3C/svg%3E",
  development: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%23380000'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3EDevelopment%3C/text%3E%3C/svg%3E",
  seo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%23260d00'/%3E%3Cstop offset='1' stop-color='%2305421b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3ESEO%3C/text%3E%3C/svg%3E",
};

// Define service items with icons
const services = [
  {
    title: 'Web Design',
    description: 'Beautiful, responsive websites tailored to your brand.',
    icon: '✏️',
    image: serviceImages.webDesign,
    fallback: fallbackImages.webDesign
  },
  {
    title: 'Development',
    description: 'Custom functionality using the latest technologies.',
    icon: '💻',
    image: serviceImages.development,
    fallback: fallbackImages.development
  },
  {
    title: 'SEO',
    description: 'Optimize your site to attract more visitors.',
    icon: '🔍',
    image: serviceImages.seo,
    fallback: fallbackImages.seo
  }
];

interface ServiceItemProps {
  service: { 
    title: string; 
    description: string; 
    icon: string;
    image: string;
    fallback: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
  distanceFromActive: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ 
  service, 
  index, 
  isActive, 
  onClick,
  distanceFromActive 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

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
    
    // Use the appropriate config based on distance
    const config = baseConfig[Math.min(absDistance, 2) as keyof typeof baseConfig];
    
    return config;
  };

  const positionStyles = getPositionStyles();

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden cursor-pointer w-64 md:w-80"
      initial={false}
      animate={{
        x: `calc(-50% + ${positionStyles.x})`,
        y: "-50%",
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
      <div className="bg-forest-green rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
            style={{ 
              backgroundImage: imageFailed || !imageLoaded 
                ? `url("${service.fallback}")` 
                : `url(${service.image})` 
            }}
          ></div>
          <img 
            src={service.image} 
            alt={service.title}
            className="hidden"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-forest-green/30 flex items-center justify-center">
            <div className="text-5xl">{service.icon}</div>
          </div>
        </div>
        <div className="p-4 bg-forest-green text-center">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-white/80">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesCanvas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swipeLock = useRef(false);

  // Handle navigation
  const navigateToItem = (index: number) => {
    if (isTransitioning || swipeLock.current) return;
    
    if (index >= 0 && index < services.length) {
      setIsTransitioning(true);
      setActiveIndex(index);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Handle swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (swipeLock.current) return;
    
    // Lock swipe to prevent multiple rapid swipes
    swipeLock.current = true;
    
    const swipeThreshold = 50; // Minimum distance to register a swipe
    const swipeVelocityThreshold = 0.5; // Minimum velocity to register a quick swipe
    
    if (info.offset.x > swipeThreshold || (info.velocity.x > swipeVelocityThreshold && info.offset.x > 0)) {
      // Swipe right -> go to previous
      if (activeIndex > 0) {
        navigateToItem(activeIndex - 1);
      }
    } else if (info.offset.x < -swipeThreshold || (info.velocity.x < -swipeVelocityThreshold && info.offset.x < 0)) {
      // Swipe left -> go to next
      if (activeIndex < services.length - 1) {
        navigateToItem(activeIndex + 1);
      }
    }
    
    // Reset swipe lock after a timeout
    setTimeout(() => {
      swipeLock.current = false;
    }, 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        navigateToItem(activeIndex - 1);
      } else if (e.key === 'ArrowRight' && activeIndex < services.length - 1) {
        navigateToItem(activeIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  return (
    <Canvas className="bg-dark-brown">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>
        
        <div 
          ref={carouselRef} 
          className="relative h-96 md:h-108 w-full portfolio-perspective touch-none"
        >
          {/* Swipeable area */}
          <motion.div 
            className="absolute inset-0 z-20"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />
          
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {services.map((service, index) => (
              <ServiceItem 
                key={index}
                service={service}
                index={index}
                isActive={index === activeIndex}
                onClick={() => navigateToItem(index)}
                distanceFromActive={index - activeIndex}
              />
            ))}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-4">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToItem(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-white scale-100' 
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Left/Right swipe instruction indicators */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/20 select-none pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 select-none pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Canvas>
  );
};

export default ServicesCanvas; 