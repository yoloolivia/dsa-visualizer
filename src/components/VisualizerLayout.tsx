
import React from 'react';
import Navbar from './Navbar';
import { Separator } from '@/components/ui/separator';

interface VisualizerLayoutProps {
  title: string;
  children: React.ReactNode;
}

const VisualizerLayout = ({ title, children }: VisualizerLayoutProps) => {
  return (
    <div className="min-h-screen bg-dsavis-dark flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-dsavis-primary mb-2">{title}</h1>
        <Separator className="bg-dsavis-secondary mb-6" />
        
        {children}
      </main>
    </div>
  );
};

export default VisualizerLayout;
