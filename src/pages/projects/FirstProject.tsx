import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhotoAlbum, { Photo } from "react-photo-album";
import Lightbox from "react-18-image-lightbox";
import "react-photo-album/styles.css";
import "react-18-image-lightbox/style.css";
import { Globe } from "lucide-react";

// Define the type for galleries
type Galleries = {
  introduction: Photo[];
  methodological: Photo[];
  additional: Photo[];
  conclusion: Photo[];
  acknowledgements: Photo[];
};

// Galleries data with placeholder images
const galleries: Galleries = {
  introduction: [
    {
      src: "https://placecats.com/234/234",
      width: 286,
      height: 285,
      alt: "Introduction Image 1",
    },
    {
      src: "https://placecats.com/295/295",
      width: 286,
      height: 285,
      alt: "Introduction Image 2",
    },
    {
      src: "https://placecats.com/285/285",
      width: 285,
      height: 285,
      alt: "Introduction Image 3",
    },
  ],

  methodological: [
    {
      src: "https://placecats.com/300/145",
      width: 3000,
      height: 1457,
      alt: "Methodological Image 1",
    },
    {
      src: "https://placecats.com/453/254",
      width: 453,
      height: 254,
      alt: "Methodological Image 2",
    },
    {
      src: "https://placecats.com/453/254",
      width: 453,
      height: 254,
      alt: "Methodological Image 3",
    },
  ],

  additional: [
    {
      src: "https://placecats.com/499/280",
      width: 499,
      height: 280,
      alt: "Additional Image 1",
    },
    {
      src: "https://placecats.com/400/224",
      width: 400,
      height: 224,
      alt: "Additional Image 2",
    },
  ],

  conclusion: [
    {
      src: "https://placecats.com/425/180",
      width: 425,
      height: 180,
      alt: "conclusion Support Image 1",
    },
    {
      src: "https://placecats.com/505/260",
      width: 505,
      height: 260,
      alt: "conclusion Support Image 2",
    },
  ],

  acknowledgements: [
    {
      src: "https://placecats.com/965/408",
      width: 965,
      height: 408,
      alt: "Acknowledgements Image 1",
    },
    {
      src: "https://placecats.com/458/258",
      width: 458,
      height: 258,
      alt: "Acknowledgements Image 2",
    },
    {
      src: "https://placecats.com/458/258",
      width: 458,
      height: 258,
      alt: "Acknowledgements Image 3",
    },
    {
      src: "https://placecats.com/921/518",
      width: 921,
      height: 518,
      alt: "Acknowledgements Image 4",
    },
    {
      src: "https://placecats.com/452/254",
      width: 452,
      height: 254,
      alt: "Acknowledgements Image 5",
    },
    {
      src: "https://placecats.com/452/254",
      width: 452,
      height: 254,
      alt: "Acknowledgements Image 6",
    },
    {
      src: "https://placecats.com/464/347",
      width: 464,
      height: 347,
      alt: "Acknowledgements Image 7",
    },
    {
      src: "https://placecats.com/244/161",
      width: 244,
      height: 161,
      alt: "Acknowledgements Image 8",
    },
    {
      src: "https://placecats.com/215/161",
      width: 215,
      height: 161,
      alt: "Acknowledgements Image 9",
    },
    {
      src: "https://placecats.com/921/388",
      width: 921,
      height: 388,
      alt: "Acknowledgements Image 10",
    },
    {
      src: "https://placecats.com/407/305",
      width: 407,
      height: 305,
      alt: "Acknowledgements Image 11",
    },
    {
      src: "https://placecats.com/509/305",
      width: 509,
      height: 305,
      alt: "Acknowledgements Image 12",
    },
    {
      src: "https://placecats.com/921/383",
      width: 921,
      height: 383,
      alt: "Acknowledgements Image 13",
    },
    {
      src: "https://placecats.com/458/458",
      width: 458,
      height: 611,
      alt: "Acknowledgements Image 14",
    },
    {
      src: "https://placecats.com/458/611",
      width: 458,
      height: 611,
      alt: "Acknowledgements Image 15",
    },
  ],
};

const FirstProject: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string | null>(null);

  const openLightbox = (galleryKey: string, imageIndex: number) => {
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
    <section
      className="py-16 px-6 min-h-screen max-w-5xl mx-auto mt-8"
      // Removed data-oid for generalization
    >
      {/* Portfolio Link */}
      <div className="mb-8">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
        >
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Project Titles and Details */}
      <div className="mb-2">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
          FirstProject
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Lorem Ipsum Dolor Sit Amet
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Presented at Placeholder Conference 2024</strong>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Team:</strong> John Doe
          </p>
        </div>

        {/* Website and GitHub Buttons */}
        <div className="mt-2 md:mt-0 flex flex-col space-y-2">
          <a
            href="https://placeholder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <Globe size={16} className="mr-2" />
            Website
          </a>
          <a
            href="https://github.com/placeholder/firstproject"
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
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303
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
                22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Introduction Section */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        INTRODUCTION
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit.
      </p>

      {/* Introduction Gallery */}
      <PhotoAlbum
        layout="rows"
        photos={galleries.introduction}
        onClick={({ index }) => openLightbox("introduction", index)}
        componentsProps={{
          image: { className: "object-cover w-full h-full" }, // Applied object-fit: cover
        }}
      />

      {/* Initial Concept */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        INITIAL CONCEPT
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
        libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
        porta.
      </p>

      {/* Methodological Innovations */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        METHODOLOGICAL INNOVATIONS
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
        libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. Duis sagittis ipsum.
      </p>

      {/* Methodological Gallery */}
      <div className="flex flex-col space-y-4">
        {/* First Photo - Full Width */}
        <img
          src={galleries.methodological[0].src}
          alt={galleries.methodological[0].alt}
          className="w-full object-cover cursor-pointer"
          onClick={() => openLightbox("methodological", 0)}
        />

        {/* Next Two Photos - Side by Side */}
        <div className="flex space-x-4">
          {galleries.methodological.slice(1, 3).map((photo, index) => (
            <div className="w-1/2" key={index}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover cursor-pointer"
                onClick={() => openLightbox("methodological", index + 1)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Technical Challenges & Solutions */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        TECHNICAL CHALLENGES & SOLUTIONS
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit.
      </p>

      {/* Technical Gallery */}
      <div className="flex space-x-4">
        <img
          src={galleries.additional[0].src}
          alt={galleries.additional[0].alt}
          className="w-1/2 object-cover cursor-pointer"
          onClick={() => openLightbox("additional", 0)}
        />

        <img
          src={galleries.additional[1].src}
          alt={galleries.additional[1].alt}
          className="w-1/2 object-cover cursor-pointer self-center"
          onClick={() => openLightbox("additional", 1)}
        />
      </div>

      {/* Conclusion */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        CONCLUSION
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
        libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
        porta. <a
          href="https://placeholder.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Visit our Website
        </a>.
      </p>

      {/* Additional Gallery */}
      <div className="flex space-x-4">
        <img
          src={galleries.conclusion[0].src}
          alt={galleries.conclusion[0].alt}
          className="w-1/2 object-cover cursor-pointer"
          onClick={() => openLightbox("conclusion", 0)}
        />

        <img
          src={galleries.conclusion[1].src}
          alt={galleries.conclusion[1].alt}
          className="w-1/2 object-cover cursor-pointer self-center"
          onClick={() => openLightbox("conclusion", 1)}
        />
      </div>

      {/* Video Section */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        VIDEO
      </h3>

      <video controls preload="metadata" className="w-full h-auto mb-8">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Acknowledgements */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-12 mb-4">
        ACKNOWLEDGEMENTS
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        This project uses data from Placeholder Corp. © 2024 Placeholder LLC, used under
        fair use.
      </p>
      {/* Footer Image */}
      <img
        src="https://placecats.com/965/408"
        alt="Acknowledgements Footer Image"
        className="w-full object-cover my-8 cursor-pointer"
        onClick={() => openLightbox("acknowledgements", 0)}
      />

      <PhotoAlbum
        layout="rows"
        photos={galleries.acknowledgements.slice(1)} // Exclude the first image
        onClick={({ index }) => openLightbox("acknowledgements", index + 1)} // Adjust index
      />

      {/* Lightbox */}
      {currentGallery !== null && currentImageIndex !== null && (
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

export default FirstProject;
