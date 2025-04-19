import { useState } from 'react';
import Canvas from './Canvas';
import CardSlider from './CardSlider';

// About items data
const aboutItems = [
  {
    title: 'Our Story',
    description: 'A startup revolutionizing website building with fast, engaging, and modern designs that challenge traditional perceptions.',
    image: "/assets/Our Story.jpeg"
  },
  {
    title: 'Our Philosophy',
    description: 'We start with one question: Why do you need a website? Every element serves a clear goal through intentional design.',
    image: "/assets/Our Philosophy.jpeg"
  },
  {
    title: 'Purpose-Driven Design',
    description: 'Clear paths to action. Every element has a purpose, guiding visitors exactly where they need to go.',
    image: "/assets/Purpose-Driven Design.jpeg"
  },
  {
    title: 'Respect for Time',
    description: 'Precise messaging without fluff. We value your visitors\' time with meaningful, efficient interactions.',
    image: "/assets/Respect for time.jpeg"
  },
  {
    title: 'Minimalist Approach',
    description: 'Simplicity and focus. Professional, digestible design that emphasizes what truly matters.',
    image: "/assets/Minimalist approach.jpeg"
  }
];

const AboutCard = ({ 
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

export default function AboutCanvas() {
  const renderAboutCard = (item: any, idx: number, isActive: boolean) => (
    <AboutCard
      key={idx}
      {...item}
      isActive={isActive}
    />
  );

  return (
    <Canvas>
      <CardSlider
        items={aboutItems}
        renderCard={renderAboutCard}
        title="About Us"
      />
    </Canvas>
  );
} 