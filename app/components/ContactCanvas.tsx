import Canvas from './Canvas';

const ContactCanvas = () => {
  return (
    <Canvas id="contact">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 px-4 text-center">
          Contact Us
        </h2>
        
        <div className="w-[90vw] md:w-[500px] max-w-[500px] mx-auto">
          <div className="bg-forest-green p-8 rounded-lg shadow-lg text-center">
            <p className="text-white/80 text-lg">
              Email us at{' '}
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
    </Canvas>
  );
};

export default ContactCanvas; 