
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-dsavis-dark flex flex-col">
      <header className="bg-dsavis-dark border-b border-dsavis-secondary sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-dsavis-primary mr-2" />
              <h1 className="text-xl font-bold text-dsavis-primary">DSA Visualizer</h1>
            </Link>
            
            <Navbar />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-dsavis-dark border-t border-dsavis-secondary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dsavis-light text-sm mb-4 md:mb-0">
              &copy; {currentYear} DSA Visualizer. All rights reserved.
            </p>
            <div className="flex items-center">
              <p className="text-dsavis-light text-sm mr-2">Created by Olivia Jardine</p>
              <a 
                href="https://www.linkedin.com/in/oliviajardine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dsavis-primary hover:text-dsavis-secondary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
