// src/sections/Portfolio.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Blend, Cpu, MessageSquare } from 'lucide-react';

import PortfolioItem from '../components/PortfolioItem';

type Filter = 'all' | 'keyword 1' | 'keyword 2';

interface PortfolioData {
  id: string;
  title: string;
  description: string;
  category: Filter;
  icon: React.ReactNode;
  link: string;
  size: 'small' | 'large';
  image?: string;
  video?: string;
}

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // remove '#' to get the element ID
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'auto',
        });
      }
    }
  }, [location]);

  // Your portfolio data
  const portfolioData: PortfolioData[] = [
    {
      id: 'first-project',
      title: 'First Project',
      description: 'Presented at XYZ Conference, a first project description.',
      category: 'keyword 1',
      icon: <Blend className="w-4 h-4" />,
      image: 'assets/images/first-project.jpg',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      link: 'projects/first-project',
      size: 'large',
    },
    {
      id: 'second-project',
      title: 'Second Project',
      description: 'Published in XYZ Journal, a second project description.',
      category: 'keyword 2',
      icon: <Blend className="w-4 h-4" />,
      image: 'assets/images/second-project.jpg',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      link: 'projects/second-project',
      size: 'small',
    },
  ];

  // Filter logic
  const filteredPortfolio = portfolioData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  // Define filter buttons
  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'keyword 1', value: 'keyword 1', icon: <Blend className="w-4 h-4" /> },
    { label: 'keyword 2', value: 'keyword 2', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <>
      <section id="portfolio" className="section">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Portfolio Label at Top Left */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            Portfolio
          </h1>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 space-x-4 flex-wrap">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value as Filter)}
                className={clsx(
                  'filter-btn px-4 py-2 rounded-full flex items-center space-x-2 transition-colors mb-2',
                  {
                    'bg-blue-600 text-white hover:bg-blue-700':
                      filter === btn.value,
                    'bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white':
                      filter !== btn.value,
                  }
                )}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPortfolio.map((item) => (
              <PortfolioItem
                key={item.id}
                data={item}
                className={clsx(
                  'col-span-1',
                  item.size === 'large' && 'sm:col-span-2'
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
