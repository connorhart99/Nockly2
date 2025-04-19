import { useState } from 'react';
import Canvas from './Canvas';
import CardSlider from './CardSlider';

// Service items data
const services = [
  {
    title: 'Website Design',
    description: 'Custom, responsive designs that engage visitors and enhance your brand.',
    image: "/assets/website design.jpeg"
  },
  {
    title: 'Development',
    description: 'Robust, scalable websites built with modern technologies.',
    image: "/assets/development.jpeg"
  },
  {
    title: 'SEO',
    description: 'Improve your visibility and drive organic traffic to your site.',
    image: "/assets/seo.jpeg"
  },
  {
    title: 'Content Strategy',
    description: 'Compelling content that tells your story and drives engagement.',
    image: "/assets/content strategy.jpeg"
  },
  {
    title: 'Maintenance',
    description: 'Keep your website secure, updated, and running smoothly.',
    image: "/assets/maintenance.jpeg"
  }
];

const ServiceCard = ({ 
  title, 
  description, 
  image,
  isActive
}: { 
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={`keen-slider__slide ${isActive ? 'active' : ''}`}>
      <div 
        className={`transition-all duration-500 ease-out transform ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
        }`}
      >
        <div className="bg-forest-green rounded-lg overflow-hidden shadow-lg w-[90vw] md:w-[500px] max-w-[500px]">
          <div className="relative aspect-square w-full">
            <img
              src={imageError ? '/placeholder.jpg' : image}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 bg-forest-green text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm md:text-base text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesCanvas() {
  const renderServiceCard = (service: any, idx: number, isActive: boolean) => (
    <ServiceCard
      key={idx}
      {...service}
      isActive={isActive}
    />
  );

  return (
    <Canvas>
      <CardSlider 
        items={services}
        renderCard={renderServiceCard}
        title="Our Services"
      />
    </Canvas>
  );
} 