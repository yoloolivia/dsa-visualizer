
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { categoriesData } from '@/data/categoriesData';

const CategoryCard = ({ title, description, path, icon }: { 
  title: string; 
  description: string; 
  path: string;
  icon: string;
}) => (
  <Link to={path} className="block">
    <Card className="bg-card hover:bg-muted transition-colors border-dsavis-secondary h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 bg-dsavis-primary bg-opacity-10 p-3 rounded-full">
          <span className="text-dsavis-primary text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-dsavis-primary mb-2">{title}</h3>
        <p className="text-dsavis-light text-sm">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

const Index = () => {
  const popularAlgorithms = [
    { name: "Stack", path: "/visualizer/stack", icon: "📚" },
    { name: "Queue", path: "/visualizer/queue", icon: "🧵" },
    { name: "Binary Search Tree", path: "/visualizer/bst", icon: "🌳" },
    { name: "Bubble Sort", path: "/visualizer/bubble-sort", icon: "🫧" }
  ];

  return (
    <Layout>
      <header className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dsavis-primary mb-6">
            DSA Visualizer
          </h1>
          <p className="text-lg md:text-xl text-dsavis-light max-w-2xl mx-auto mb-8">
            Interactive visualizations to help you understand data structures and algorithms
          </p>
          
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {popularAlgorithms.map((algo, index) => (
              <Link
                key={index}
                to={algo.path}
                className="flex items-center bg-muted px-4 py-2 rounded-full hover:bg-dsavis-primary hover:bg-opacity-20 transition-colors"
              >
                <span className="mr-2">{algo.icon}</span>
                {algo.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dsavis-primary mb-8">
          Explore by Category
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              description={category.description}
              path={category.path}
              icon={category.items[0]?.icon || "📊"}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Index;
