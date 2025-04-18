import Canvas from './Canvas';

const PricingCanvas = () => {
  return (
    <Canvas className="bg-dark-brown">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Pricing</h2>
        <div className="bg-forest-green/30 p-8 rounded-lg">
          <h3 className="text-3xl font-bold mb-6">Pay What You Want</h3>
          <p className="text-xl mb-8">
            We believe in the value of our work and trust in our clients. 
            Our flexible pricing model allows you to pay what you feel is fair 
            for the quality of work we deliver.
          </p>
          <div className="bg-deep-burgundy/30 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Starting recommendation: <span className="font-bold text-2xl">£1,500</span>
            </p>
            <p className="text-base opacity-80">
              This is our recommended starting point for most standard websites.
              Final price depends on project complexity, features, and timeline.
            </p>
          </div>
          <button className="bg-forest-green hover:bg-forest-green/80 text-white px-8 py-3 rounded-lg text-xl font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </Canvas>
  );
};

export default PricingCanvas; 