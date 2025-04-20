import Canvas from './Canvas';
import CardSlider from './CardSlider';
import Card from './Card';

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

export default function PortfolioCanvas() {
  const renderPortfolioCard = (item: any, idx: number, isActive: boolean) => {
    const handleClick = () => {
      if (isActive) {
        window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      }
    };
    
    const overlay = isActive ? (
      <div className="absolute inset-0 bg-deep-burgundy/50 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-xl font-semibold text-center px-4">
          View Website
        </span>
      </div>
    ) : null;
    
    return (
      <Card
        key={idx}
        title={item.title}
        isActive={isActive}
        imageUrl={item.image}
        onClick={handleClick}
        imageOverlay={overlay}
      >
        <a 
          href={item.externalUrl}
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
          {item.url}
        </a>
      </Card>
    );
  };

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