// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Edit } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Whenever the navbar mounts or location changes, check localStorage
    const token = localStorage.getItem('githubToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleScroll = () => setIsShrunk(window.scrollY > 50);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Press', path: '/press' },
    { name: 'Publications', path: '/publications' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white dark:bg-gray-800 shadow',
        { 'py-2 px-4': isShrunk, 'py-4 px-6': !isShrunk }
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Title */}
        <NavLink
          to="/"
          className={clsx(
            'font-montserrat font-bold text-blue-600 dark:text-blue-400 transition-colors',
            {
              'text-lg': isShrunk,
              'text-xl': !isShrunk,
              'hover:text-blue-600 dark:hover:text-blue-400': true,
            }
          )}
        >
          John Doe
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'text-gray-700 dark:text-gray-300 px-2 py-1 transition-colors',
                  {
                    'hover:text-blue-600 dark:hover:text-blue-400': true,
                    'text-blue-600 font-semibold': isActive,
                  }
                )
              }
            >
              {link.name.toUpperCase()}
            </NavLink>
          ))}

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="focus:outline-none ml-4">
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Edit Icon if logged in */}
          {isLoggedIn && (
            <NavLink
            to="/edit"
            state={{ location }} // Directly pass state here
              className="ml-4"
              aria-label="Edit content"
            >
              <Edit className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
            </NavLink>
          )}

        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                clsx('block py-2 text-gray-700 dark:text-gray-300', {
                  'text-blue-600 font-semibold': isActive,
                  'hover:text-blue-600 dark:hover:text-blue-400': true,
                })
              }
            >
              {link.name.toUpperCase()}
            </NavLink>
          ))}
          <button onClick={toggleTheme} className="block mt-4">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          {/* Optionally, show edit link if logged in */}
          {isLoggedIn && (
            <NavLink
              to="/edit"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Edit
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
