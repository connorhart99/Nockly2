import Canvas from './Canvas';
import CardSlider from './CardSlider';
import Card from './Card';

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

export default function ServicesCanvas() {
  const renderServiceCard = (service: any, idx: number, isActive: boolean) => (
    <Card
      key={idx}
      title={service.title}
      isActive={isActive}
      imageUrl={service.image}
    >
      <p className="text-sm md:text-base text-white/80">{service.description}</p>
    </Card>
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