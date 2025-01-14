import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          About Me
        </h1>

        {/* Introduction Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Profile Image */}
          <img
            src="https://placehold.co/200" // Placeholder image
            alt="John Doe"
            className="rounded-lg shadow-md w-48 lg:w-56 flex-shrink-0"
          />
          {/* Text Content */}
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <b>Welcome!</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            My Vision
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/200" // Placeholder image
                alt="Placeholder Image"
                className="rounded-lg shadow-md w-96"
              />
              <span className="block text-xs text-gray-500 italic mt-2">
                Placeholder caption.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
