import React from 'react';
import { Linkedin, Github, FileText, GitFork } from 'lucide-react';
import Scholar from 'logos/Scholar';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://linkedin.com/in/ryanhardestylewis"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/ryanhlewis"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://scholar.google.com/citations?user=c1KcQKQAAAAJ&hl=en&authuser=2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Scholar className="w-6 h-6" />
          </a>
          {/* <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FileText className="w-6 h-6" />
          </a> */}
        </div>
        <p className="text-sm text-gray-400">
          Created by Ryan Hardesty Lewis.
          <a href="https://github.com/ryanhlewis/serverlessportfolio" className="ml-1 hover:text-white transition-colors cursor-pointer">
          <GitFork className="w-4 h-4 inline-block mr-1 mb-2" />
          Fork on GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
