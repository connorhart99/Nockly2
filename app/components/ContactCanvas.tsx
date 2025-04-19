import { useState } from 'react';
import Canvas from './Canvas';

const ContactCanvas = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send an email to "conno"
    console.log('Form submitted:', formState);
    alert('Thanks for your message! We will get back to you soon.');
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Canvas>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="bg-forest-green p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-dark-brown border border-white/20 focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-dark-brown border border-white/20 focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-lg bg-dark-brown border border-white/20 focus:border-white focus:outline-none resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="bg-deep-burgundy hover:bg-deep-burgundy/80 text-white px-8 py-3 rounded-lg text-xl font-semibold transition-colors w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Canvas>
  );
};

export default ContactCanvas; 