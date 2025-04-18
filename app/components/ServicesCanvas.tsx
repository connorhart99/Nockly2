import Canvas from './Canvas';

const ServicesCanvas = () => {
  const services = [
    {
      title: 'Web Design',
      description: 'Beautiful, responsive websites tailored to your brand.',
      icon: '✏️'
    },
    {
      title: 'Development',
      description: 'Custom functionality using the latest technologies.',
      icon: '💻'
    },
    {
      title: 'SEO',
      description: 'Optimize your site to attract more visitors.',
      icon: '🔍'
    }
  ];

  return (
    <Canvas className="bg-dark-brown">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-4">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-forest-green p-6 rounded-lg text-center transform transition-transform hover:scale-105"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </Canvas>
  );
};

export default ServicesCanvas; 