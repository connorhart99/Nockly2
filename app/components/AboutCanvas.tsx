import Canvas from './Canvas';

const AboutCanvas = () => {
  return (
    <Canvas className="bg-dark-brown">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
        <div className="bg-forest-green/50 p-8 rounded-lg">
          <p className="text-xl mb-6">
            We are a team of passionate web designers and developers dedicated to crafting beautiful, 
            functional websites that help businesses grow.
          </p>
          <p className="text-xl mb-6">
            Our approach combines creative design with technical expertise to deliver websites
            that not only look stunning but also perform exceptionally well.
          </p>
          <p className="text-xl">
            We believe in simplicity, functionality, and creating digital experiences
            that leave a lasting impression.
          </p>
        </div>
      </div>
    </Canvas>
  );
};

export default AboutCanvas; 