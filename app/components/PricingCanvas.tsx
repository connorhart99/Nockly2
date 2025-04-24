import Canvas from './Canvas';
import CardSlider from './CardSlider';
import Card from './Card';

// Pricing items data
const pricingItems = [
  {
    title: "Pay What You Want",
    description: "We believe great web design should be accessible. Our unique 'Pay What You Want' model empowers you to set the price based on the value you receive and your budget.",
    image: "/assets/pricing.jpeg"
  },
  {
    title: "Partnership Approach",
    description: "We'll discuss your project goals, provide a detailed proposal, and you decide the price that feels right for you—creating a partnership built on trust and mutual respect.",
    image: "/assets/pricing2.jpeg"
  }
];

export default function PricingCanvas() {
  const renderPricingCard = (item: any, idx: number, isActive: boolean) => (
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
    <Canvas id="pricing">
      <CardSlider 
        items={pricingItems}
        renderCard={renderPricingCard}
        title="Pricing"
      />
    </Canvas>
  );
} 