import Canvas from './Canvas';
import Image from 'next/image';

export default function HeroCanvas() {
  return (
    <Canvas className="relative" id="hero">
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
        {/* Logo */}
        <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] relative">
          <Image
            src="/assets/Logo - Nockly 2 - White FG Transparent BG Square - (1).png"
            alt="Nockly Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Swipe prompt */}
        <div className="absolute bottom-8 text-center animate-bounce flex flex-col items-center">
          <p className="text-sm md:text-base text-white/80 mb-2">Swipe</p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-white/80"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </div>
    </Canvas>
  );
} 