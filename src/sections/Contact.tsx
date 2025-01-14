import React, { useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  useEffect(() => {
    // Ensure Calendly script is loaded
    if (!document.querySelector('.calendly-inline-widget script')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Determine current mode (dark or light)
  const isDarkMode = document.documentElement.classList.contains('dark');

  const calendlyUrl = isDarkMode
    ? 'https://calendly.com/CALENDLYUSERNAME/30min?background_color=111827&text_color=e5e7eb&primary_color=3b82f6' // Dark mode colors
    : 'https://calendly.com/CALENDLYUSERNAME/30min?background_color=f7fafc&text_color=1a202c&primary_color=2563eb'; // Light mode colors

  return (
    <section
      id="contact"
      className="section"
    >
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-4 font-montserrat">Contact</h2>
          <p className="text-lg">
            {/* Email */}
            <a href="mailto:johndoe@university.edu" className="text-blue-600 hover:underline dark:text-blue-400">
            <Mail className="w-6 h-6 inline-block mr-5" />
            johndoe@university.edu
            </a>
            </p>
            <p className="text-lg">
            {/* Location */}
            <a href="https://www.google.com/maps/place/#" className="text-blue-600 hover:underline dark:text-blue-400">
                <MapPin className="w-6 h-6 inline-block mr-5" />
                <span>123 Main St, City, State, 12345</span>
            </a>
          </p>
        </div>

        {/* Calendly Embed */}
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{
            width: '100%',
            height: '1000px',
            border: 'none',
          }}
        ></div>
      </div>
    </section>
  );
};

export default Contact;
