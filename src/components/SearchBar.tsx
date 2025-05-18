
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  size?: 'sm' | 'lg';
  placeholder?: string;
}

const SearchBar = ({ size = 'lg', placeholder = 'Search data structures and algorithms...' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Mock data for autocomplete suggestions
  const suggestions = [
    { name: 'Stack', path: '/visualizer/stack' },
    { name: 'Queue', path: '/visualizer/queue' },
    { name: 'Linked List', path: '/visualizer/linked-list' },
    { name: 'Binary Search Tree', path: '/visualizer/bst' },
    { name: 'Bubble Sort', path: '/visualizer/bubble-sort' },
    { name: 'Quick Sort', path: '/visualizer/quick-sort' },
    { name: 'Merge Sort', path: '/visualizer/merge-sort' },
  ];
  
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof suggestions>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual search logic here
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = suggestions.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (path: string) => {
    navigate(path);
    setShowSuggestions(false);
    setSearchTerm('');
  };
  
  return (
    <div className={`relative ${size === 'lg' ? 'w-full max-w-2xl' : 'w-64'}`}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-muted border border-dsavis-secondary rounded-full px-4 
                    ${size === 'lg' ? 'py-3 text-lg' : 'py-1.5 text-sm'} 
                    pr-10 text-dsavis-light placeholder:text-muted-foreground focus:border-dsavis-primary
                    focus:outline-none focus:ring-1 focus:ring-dsavis-primary transition-colors`}
          onFocus={() => setShowSuggestions(!!searchTerm.trim())}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dsavis-primary"
          aria-label="Search"
        >
          <Search size={size === 'lg' ? 20 : 16} />
        </button>
      </form>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-card rounded-md shadow-lg border border-dsavis-secondary z-50">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-muted cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion.path)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
