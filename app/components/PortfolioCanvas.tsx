import { useState } from 'react';
import Canvas from './Canvas';
import CardSlider from './CardSlider';

// Portfolio items using images from assets folder
const portfolioItems = [
  {
    title: "Hart & Soul Walks",
    url: "hartandsoulretreats.co.uk",
    image: "/assets/hartandsoulretreats.png", 
    externalUrl: "https://hartandsoulretreats.co.uk"
  },
  {
    title: "26 Mountains 2 Mayo",
    url: "26m2m.com",
    image: "/assets/26m2m.png", 
    externalUrl: "https://26m2m.com"
  }
];

const PortfolioCard = ({ 
  title, 
  url,
  image,
  externalUrl,
  isActive
}: { 
  title: string;
  url: string;
  image: string;
  externalUrl: string;
  isActive: boolean;
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    if (isActive) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div className={`keen-slider__slide ${isActive ? 'active' : ''}`}>
      <div 
        className={`transition-all duration-500 ease-out transform ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
        }`}
      >
        <div 
          className="bg-forest-green rounded-lg overflow-hidden shadow-lg w-[90vw] md:w-[500px] max-w-[500px]"
          onClick={handleClick}
        >
          <div className="relative aspect-square w-full">
            <img
              src={imageError ? '/placeholder.jpg' : image}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            {isActive && (
              <div className="absolute inset-0 bg-deep-burgundy/50 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xl font-semibold text-center px-4">
                  View Website
                </span>
              </div>
            )}
          </div>
          <div className="p-6 bg-forest-green text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
            <a 
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                if (!isActive) {
                  e.preventDefault();
                }
              }}
              className={`text-sm md:text-base text-white/80 hover:text-white hover:underline transition-colors ${isActive ? '' : 'pointer-events-none'}`}
            >
              {url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PortfolioCanvas() {
  const renderPortfolioCard = (item: any, idx: number, isActive: boolean) => (
    <PortfolioCard
      key={idx}
      {...item}
      isActive={isActive}
    />
  );

  return (
    <Canvas>
      <CardSlider 
        items={portfolioItems}
        renderCard={renderPortfolioCard}
        title="Our Portfolio"
      />
    </Canvas>
  );
} 