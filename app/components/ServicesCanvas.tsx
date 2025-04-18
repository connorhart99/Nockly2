import { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import { motion } from 'framer-motion';

// Define service items with icons
const services = [
  {
    title: 'Web Design',
    description: 'Beautiful, responsive websites tailored to your brand.',
    icon: '✏️'
  },
  {
    title: 'Development',
    description: 'Custom functionality using the latest technologies.',
    icon: '💻'
  },
  {
    title: 'SEO',
    description: 'Optimize your site to attract more visitors.',
    icon: '🔍'
  }
];

interface ServiceItemProps {
  service: { 
    title: string; 
    description: string; 
    icon: string; 
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
      <div className="bg-forest-green p-6 rounded-lg text-center h-full">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </motion.div>
  );
};

const ServicesCanvas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle navigation
  const navigateToItem = (index: number) => {
    if (isTransitioning) return;
    
    if (index >= 0 && index < services.length) {
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
        
        <div ref={carouselRef} className="relative h-96 md:h-108 w-full portfolio-perspective">
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
        </div>
      </div>
    </Canvas>
  );
};

export default ServicesCanvas; 