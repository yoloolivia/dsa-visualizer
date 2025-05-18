
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { categoriesData } from '@/data/categoriesData';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categoriesData.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-dsavis-primary mb-6">Category not found</h1>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold text-dsavis-primary mb-6">{category.name}</h1>
        <p className="text-dsavis-light mb-8">{category.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.items.map((item) => (
            <Link to={item.path} key={item.id} className="block">
              <Card className="bg-card hover:bg-muted transition-colors border-dsavis-secondary h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 bg-dsavis-primary bg-opacity-10 p-3 rounded-full">
                    <span className="text-dsavis-primary text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-dsavis-primary mb-2">{item.name}</h3>
                  <p className="text-dsavis-light text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
