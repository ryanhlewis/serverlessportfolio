// src/components/PortfolioItem.tsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PortfolioItemProps {
  data: {
    title: string;
    description: string;
    category: string;
    icon: React.ReactElement;
    image: string;
    video?: string;
    link: string;
    size: 'small' | 'large';
  };
  className?: string;
}

/**
 * PortfolioItem component
 * - Lazy-loads images (using `loading="lazy"`).
 * - Uses Intersection Observer to only load and autoplay videos when in view.
 * - Pauses the video when it's out of the viewport.
 */
const PortfolioItem: React.FC<PortfolioItemProps> = ({ data, className }) => {
  const [wrapperRef, isVisible] = useIntersectionObserver({
    rootMargin: '0px 0px 100px 0px', // Adjust threshold as needed
    threshold: 0.25,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    // If it's visible, play the video; otherwise, pause it
    if (isVisible) {
      // Start loading if not already
      if (videoRef.current.preload !== 'auto' && data.video) {
        videoRef.current.preload = 'auto';
        videoRef.current.src = data.video; // set the actual src in view
      }
      videoRef.current.play().catch(() => {
        // Some browsers may block autoplay without user gesture
        // handle the error if needed
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, data.video]);

  return (
    <a
      ref={wrapperRef as React.Ref<HTMLAnchorElement>}
      href={data.link}
      rel="noopener noreferrer"
      className={clsx(
        'group portfolio-item block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 relative flex flex-col',
        className
      )}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '500px',
      }}
    >
      {/* Media Section */}
      <div
        className="flex-1 overflow-hidden rounded-t-lg relative"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '250px',
        }}
      >
        {data.video ? (
          <video
            ref={videoRef}
            // Initially do not load the actual video to save bandwidth
            preload="none"
            loop
            muted
            playsInline
            // We only set src when in view (in the useEffect above)
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={data.image}
            alt={`${data.title} Project Overview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Category Label */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full flex items-center">
          {data.icon}
          <span className="ml-2">{data.category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {data.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {data.description}
        </p>
      </div>
    </a>
  );
};

export default PortfolioItem;
