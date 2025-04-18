import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import Canvas from './Canvas';

// Service items data
const services = [
  {
    title: 'Web Design',
    description: 'Beautiful, responsive websites tailored to your brand.',
    image: "/service-design.jpg"
  },
  {
    title: 'Development',
    description: 'Custom functionality using the latest technologies.',
    image: "/service-development.jpg"
  },
  {
    title: 'SEO',
    description: 'Optimize your site to attract more visitors.',
    image: "/service-seo.jpg"
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
        <div className="bg-forest-green rounded-lg overflow-hidden shadow-lg mx-2 md:mx-4">
          <div className="relative h-[250px] md:h-[400px] overflow-hidden">
            <img
              src={imageError ? '/placeholder.jpg' : image}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest-green/30"></div>
          </div>
          <div className="p-4 md:p-6 bg-forest-green">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm md:text-base text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesCanvas() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      origin: "center",
      perView: "auto",
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: "center",
          perView: 2.5,
          spacing: 15,
        },
      },
    },
    defaultAnimation: {
      duration: 500
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!instanceRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        instanceRef.current.prev();
      } else if (e.key === 'ArrowRight') {
        instanceRef.current.next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [instanceRef]);

  return (
    <Canvas>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 px-4 text-center">Our Services</h2>
        
        <div className="w-full max-w-7xl px-0">
          <div ref={sliderRef} className="keen-slider">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                {...service}
                isActive={currentSlide === idx}
              />
            ))}
          </div>
          
          {loaded && instanceRef.current && (
            <div className="flex justify-center gap-2 mt-4 md:mt-8">
              {[...Array(services.length)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .keen-slider {
          min-height: 350px;
          display: flex;
          overflow: visible !important;
        }
        .keen-slider__slide {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 280px;
          max-width: 600px;
          width: 85vw;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .keen-slider {
            min-height: 500px;
          }
          .keen-slider__slide {
            min-width: 600px;
            width: auto;
            margin: 0;
          }
        }
      `}</style>
    </Canvas>
  );
} 