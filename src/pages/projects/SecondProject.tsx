// SecondProject.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { Globe } from "lucide-react";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Galleries = {
  highlights: Photo[];
};

const galleries: Galleries = {
  highlights: [
    {
      src: "https://placecats.com/960/720",
      width: 960,
      height: 720,
      alt: "Placeholder Image 1",
    },
  ],
};

const SecondProject: React.FC = () => {
  const [currentGallery, setCurrentGallery] = useState<keyof Galleries | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openLightbox = (galleryKey: keyof Galleries, imageIndex: number) => {
    setCurrentGallery(galleryKey);
    setCurrentImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setCurrentGallery(null);
    setCurrentImageIndex(null);
  };

  const handleNextImage = () => {
    if (currentGallery && currentImageIndex !== null) {
      const gallery = galleries[currentGallery];
      setCurrentImageIndex((currentImageIndex + 1) % gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (currentGallery && currentImageIndex !== null) {
      const gallery = galleries[currentGallery];
      setCurrentImageIndex(
        (currentImageIndex + gallery.length - 1) % gallery.length
      );
    }
  };

  return (
    <section className="py-16 px-6 min-h-screen max-w-5xl mx-auto mt-8">
      {/* Back to Portfolio Link */}
      <div className="mb-8">
        <Link
          to="/#projects"
          className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
        >
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Title and Subtitle Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
            SecondProject
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Lorem Ipsum Dolor Sit Amet
          </h2>
        </div>

        {/* GitHub Button */}
        <div className="mt-2 md:mt-0">
          <a
            href="https://github.com/placeholder/secondproject"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub icon</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303
              3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
              0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61
              -.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.73.084-.73
              1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.303
              3.492.997.108-.775.417-1.303.76-1.603-2.665-.305-5.466-1.332-5.466-5.93
              0-1.31.47-2.38 1.236-3.22-.124-.304-.536-1.527.117-3.176 0 0 1.01-.322
              3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138
              3 .405 2.29-1.552 3.3-1.23 3.3-1.23 .653 1.649.242 2.872.118
              3.176.767.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.62
              -5.479 5.92.43.37.81 1.102.81 2.222 0 1.604-.014
              2.896-.014 3.286 0 .317.22.686.82.57C20.565
              22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Introduction */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus, 
        nisl at consequat tincidunt, augue orci sollicitudin nunc, in tristique 
        neque sapien a magna. Vivamus euismod, urna eu tincidunt consectetur, 
        nisi nisl aliquam nunc, eget sollicitudin nunc nisl in lorem.
      </p>

      {/* Highlights Images */}
      {galleries.highlights.map((photo, index) => (
        <div key={index} className="mb-8">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full object-cover cursor-pointer"
            onClick={() => openLightbox("highlights", index)}
          />
        </div>
      ))}

      {/* Additional Sections */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        Lorem Ipsum Dolor
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at 
        nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      </p>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Lorem Ipsum Consectetur
      </h4>
      <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          <strong>Step One:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio.
        </li>
        <li>
          <strong>Step Two:</strong> Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </li>
      </ol>

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at 
        nibh elementum imperdiet.
      </p>

      {/* Pseudocode Section */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        Pseudocode
      </h3>
      <pre className="bg-gray-800 text-gray-100 p-4 rounded text-xs overflow-auto mb-6">
{`void exampleFunction() {
  // 1. Initialize variables
  string placeholder = "Lorem Ipsum";

  // 2. Perform operations
  List<string> results = GetResults(placeholder);

  // 3. Output results
  foreach(var result in results) {
    Console.WriteLine(result);
  }
}

List<string> GetResults(string input) {
  // Simulate data processing
  return new List<string> { "Result1", "Result2", "Result3" };
}`}
      </pre>

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at 
        nibh elementum imperdiet.
      </p>

      {/* Lightbox */}
      {currentGallery && currentImageIndex !== null && (
        <Lightbox
          mainSrc={galleries[currentGallery][currentImageIndex].src}
          nextSrc={
            galleries[currentGallery][
              (currentImageIndex + 1) % galleries[currentGallery].length
            ].src
          }
          prevSrc={
            galleries[currentGallery][
              (currentImageIndex + galleries[currentGallery].length - 1) %
                galleries[currentGallery].length
            ].src
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={handlePrevImage}
          onMoveNextRequest={handleNextImage}
          imageTitle={`Image ${currentImageIndex + 1} of ${
            galleries[currentGallery].length
          }`}
        />
      )}
    </section>
  );
};

export default SecondProject;
