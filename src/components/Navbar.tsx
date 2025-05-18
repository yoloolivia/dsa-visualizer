
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const categories = [
    { name: 'Data Structures', path: '/category/data-structures' },
    { name: 'Sorting', path: '/category/sorting' },
    { name: 'Searching', path: '/category/searching' },
    { name: 'Graph', path: '/category/graph' }
  ];
  
  return (
    <nav className="bg-dsavis-dark border-b border-dsavis-secondary sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-dsavis-primary mr-4">DSA Visualizer</h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {categories.map((category) => (
                <NavLink
                  key={category.name}
                  to={category.path}
                  className={({ isActive }) => 
                    `px-2 py-1 text-sm font-medium rounded hover:text-dsavis-primary transition-colors ${
                      isActive ? 'text-dsavis-primary' : 'text-dsavis-light'
                    }`
                  }
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <SearchBar size="sm" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
