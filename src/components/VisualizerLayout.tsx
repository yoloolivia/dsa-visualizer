
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Layout from './Layout';

interface VisualizerLayoutProps {
  title: string;
  children: React.ReactNode;
}

const VisualizerLayout = ({ title, children }: VisualizerLayoutProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-dsavis-primary mb-2">{title}</h1>
        <Separator className="bg-dsavis-secondary mb-6" />
        
        {children}
      </div>
    </Layout>
  );
};

export default VisualizerLayout;
