'use client';

import { ReactNode } from 'react';
import CanvasContainer from './components/CanvasContainer';
import HeroCanvas from './components/HeroCanvas';
import ServicesCanvas from './components/ServicesCanvas';
import AboutCanvas from './components/AboutCanvas';
import PortfolioCanvas from './components/PortfolioCanvas';
import PricingCanvas from './components/PricingCanvas';
import ContactCanvas from './components/ContactCanvas';

export default function Home() {
  const canvases: { id: string; content: ReactNode }[] = [
    {
      id: 'hero',
      content: <HeroCanvas />
    },
    {
      id: 'services',
      content: <ServicesCanvas />
    },
    {
      id: 'about',
      content: <AboutCanvas />
    },
    {
      id: 'portfolio',
      content: <PortfolioCanvas />
    },
    {
      id: 'pricing',
      content: <PricingCanvas />
    },
    {
      id: 'contact',
      content: <ContactCanvas />
    }
  ];

  return <CanvasContainer canvases={canvases} />;
} 