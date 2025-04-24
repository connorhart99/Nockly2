import Canvas from './Canvas';
import CardSlider from './CardSlider';
import Card from './Card';

// Portfolio items using images from assets folder
const portfolioItems = [
  {
    title: "26 Mountains 2 Mayo",
    url: "26m2m.com",
    image: "/assets/26m2m 2.png", 
    externalUrl: "https://www.26m2m.com"
  },
  {
    title: "Hart & Soul Walks",
    url: "hartandsoulretreats.co.uk",
    image: "/assets/hartandsoulretreats.png", 
    externalUrl: "https://hartandsoulretreats.co.uk"
  }
];

export default function PortfolioCanvas() {
  const renderPortfolioCard = (item: any, idx: number, isActive: boolean) => {
    const handleClick = () => {
      if (isActive) {
        window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      }
    };
    
    return (
      <Card
        key={idx}
        title={item.title}
        isActive={isActive}
        imageUrl={item.image}
        onClick={handleClick}
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
    <Canvas id="portfolio">
      <CardSlider 
        items={portfolioItems}
        renderCard={renderPortfolioCard}
        title="Our Portfolio"
      />
    </Canvas>
  );
} 