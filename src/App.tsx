import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Press from './sections/Press';
import Publications from './sections/Publications';
import Contact from './sections/Contact';

// Projects
import FirstProject from 'pages/projects/FirstProject';
import SecondProject from 'pages/projects/SecondProject';

import Login from 'pages/Login';
import TSXEditor from 'pages/Edit';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/edit" element={<TSXEditor />} />

            {/* Projects */}
            <Route
              path="/projects/first-project"
              element={<FirstProject theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/projects/second-project"
              element={<SecondProject theme={theme} toggleTheme={toggleTheme} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
