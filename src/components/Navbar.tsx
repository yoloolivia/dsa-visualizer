
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const categories = [
    { name: 'Linear Structures', path: '/category/linear' },
    { name: 'Tree Structures', path: '/category/trees' },
    { name: 'Sorting', path: '/category/sorting' },
    { name: 'Searching', path: '/category/searching' },
    { name: 'Graph', path: '/category/graph' },
    { name: 'Hash', path: '/category/hash' }
  ];
  
  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-6">
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
      
      <div className="flex items-center">
        <SearchBar size="sm" />
      </div>
    </div>
  );
};

export default Navbar;
