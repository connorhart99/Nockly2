import { useState } from 'react';
import Canvas from './Canvas';

const ContactCanvas = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    error: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, error: false, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setStatus({
        submitting: false,
        error: false,
        message: 'Thanks for your message! We will get back to you soon.'
      });
      
      setFormState({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        submitting: false,
        error: true,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <Canvas>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 px-4 text-center">
          Contact Us
        </h2>
        
        <div className="w-[90vw] md:w-[500px] max-w-[500px] mx-auto">
          <div className="bg-forest-green p-8 rounded-lg shadow-lg">
            {status.message && (
              <div 
                className={`mb-6 p-4 rounded-lg ${status.error ? 'bg-deep-burgundy/40' : 'bg-forest-green/40'} border ${status.error ? 'border-deep-burgundy' : 'border-white/20'}`}
              >
                {status.message}
              </div>
            )}
            
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
                  disabled={status.submitting}
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
                  disabled={status.submitting}
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
                  disabled={status.submitting}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-deep-burgundy hover:bg-deep-burgundy/80 text-white px-8 py-3 rounded-lg text-xl font-semibold transition-colors w-full disabled:opacity-70"
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-white/20 text-center">
              <p className="text-white/80">
                Or email us directly at{' '}
                <button
                  onClick={() => {
                    // Try multiple approaches for email
                    const email = 'support@nockly.com';
                    
                    // Try to open mail client - create a hidden link and click it
                    const link = document.createElement('a');
                    link.href = `mailto:${email}`;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    
                    // Set a timeout to check if the user is still on the page
                    // If they are, the mailto likely failed
                    setTimeout(() => {
                      // Fallback - open webmail
                      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
                    }, 300);
                  }}
                  className="text-white hover:underline transition-colors bg-transparent border-none p-0 m-0 cursor-pointer font-normal"
                >
                  support@nockly.com
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
};

export default ContactCanvas; 