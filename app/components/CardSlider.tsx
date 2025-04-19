import { useState, useEffect, ReactNode, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";

interface CardSliderProps {
  items: any[];
  renderCard: (item: any, index: number, isActive: boolean) => ReactNode;
  title: string;
}

export default function CardSlider({ items, renderCard, title }: CardSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle two-finger trackpad and horizontal mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
        e.preventDefault();
        if (instanceRef.current) {
          if (e.deltaX > 50) {
            instanceRef.current.next();
          } else if (e.deltaX < -50) {
            instanceRef.current.prev();
          }
        }
      }
    };

    // Find the keen-slider element inside our container
    const container = containerRef.current;
    if (container) {
      const sliderElement = container.querySelector('.keen-slider');
      if (sliderElement) {
        sliderElement.addEventListener('wheel', handleWheel as EventListener, { passive: false });
        return () => {
          sliderElement.removeEventListener('wheel', handleWheel as EventListener);
        };
      }
    }
  }, [instanceRef]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 px-4 text-center">
        {title}
      </h2>
      
      <div className="w-full max-w-7xl px-0 relative">
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, idx) => (
            renderCard(item, idx, currentSlide === idx)
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
                currentSlide === items.length - 1 ? 'opacity-30 cursor-not-allowed hover:scale-100' : 'opacity-100 cursor-pointer'
              }`}
              disabled={currentSlide === items.length - 1}
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
    </div>
  );
} 