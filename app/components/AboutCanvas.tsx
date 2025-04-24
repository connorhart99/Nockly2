import Canvas from './Canvas';
import CardSlider from './CardSlider';
import Card from './Card';

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

export default function AboutCanvas() {
  const renderAboutCard = (item: any, idx: number, isActive: boolean) => (
    <Card
      key={idx}
      title={item.title}
      isActive={isActive}
      imageUrl={item.image}
    >
      <p className="text-sm md:text-base text-white/80">{item.description}</p>
    </Card>
  );

  return (
    <Canvas id="about">
      <CardSlider
        items={aboutItems}
        renderCard={renderAboutCard}
        title="About Us"
      />
    </Canvas>
  );
} 