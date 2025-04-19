import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import Canvas from './Canvas';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      origin: "center",
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: "center",
          perView: 1.5,
          spacing: 30,
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
    if (!instanceRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        instanceRef.current?.prev();
      } else if (e.key === 'ArrowRight') {
        instanceRef.current?.next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [instanceRef]);

  return (
    <Canvas>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 px-4 text-center">
          Our Services
        </h2>
        
        <div className="w-full max-w-7xl px-0 relative">
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
            <div className="flex justify-center gap-8 mt-8">
              <button
                onClick={() => instanceRef.current?.prev()}
                className={`p-3 rounded-full bg-forest-green hover:bg-forest-green/90 transition-all transform hover:scale-110 ${
                  currentSlide === 0 ? 'opacity-30 cursor-not-allowed hover:scale-100' : 'opacity-100 cursor-pointer'
                }`}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className={`p-3 rounded-full bg-forest-green hover:bg-forest-green/90 transition-all transform hover:scale-110 ${
                  currentSlide === services.length - 1 ? 'opacity-30 cursor-not-allowed hover:scale-100' : 'opacity-100 cursor-pointer'
                }`}
                disabled={currentSlide === services.length - 1}
                aria-label="Next slide"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .keen-slider {
          min-height: 500px;
          display: flex;
          overflow: visible !important;
        }
        .keen-slider__slide {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          max-width: 600px;
          width: 90vw;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .keen-slider {
            min-height: 600px;
          }
          .keen-slider__slide {
            min-width: 600px;
            width: 600px;
            margin: 0;
          }
        }
      `}</style>
    </Canvas>
  );
} 