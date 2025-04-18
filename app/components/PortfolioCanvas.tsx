import { useState } from 'react';
import Canvas from './Canvas';
import PlaceholderImage from './Placeholder';

// Fallback base64 images
const fallbackImages = {
  portfolio1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%23380000'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3EHart & Soul Retreats%3C/text%3E%3C/svg%3E",
  portfolio2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%2305421b'/%3E%3Cstop offset='1' stop-color='%23260d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3E26M2M%3C/text%3E%3C/svg%3E",
  portfolio3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='800' y2='600'%3E%3Cstop offset='0' stop-color='%23260d00'/%3E%3Cstop offset='1' stop-color='%23380000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='30' fill='white' text-anchor='middle' alignment-baseline='middle'%3ESample Project%3C/text%3E%3C/svg%3E",
};

const getFallbackImage = (index: number): string => {
  if (index === 0) return fallbackImages.portfolio1;
  if (index === 1) return fallbackImages.portfolio2;
  return fallbackImages.portfolio3;
};

const PortfolioItem = ({ item, index }: { item: { title: string, url: string, image: string }, index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackImage = getFallbackImage(index);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageFailed(true);
  };

  return (
    <div className="rounded-lg overflow-hidden group cursor-pointer">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
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
        <div className="absolute inset-0 bg-deep-burgundy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-xl font-semibold">View Project</span>
        </div>
      </div>
      <div className="p-4 bg-forest-green">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="text-white/70">{item.url}</p>
      </div>
    </div>
  );
};

const PortfolioCanvas = () => {
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
    },
    {
      title: "Sample Project",
      url: "example.com",
      image: "/portfolio-3.jpg"
    }
  ];

  return (
    <Canvas className="bg-dark-brown">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4">
        {portfolioItems.map((item, index) => (
          <PortfolioItem key={index} item={item} index={index} />
        ))}
      </div>
    </Canvas>
  );
};

export default PortfolioCanvas; 