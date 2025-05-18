
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animating, setAnimating] = useState<string>('');

  const handleEnqueue = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input is required",
        description: "Please enter a value to enqueue",
        variant: "destructive",
      });
      return;
    }

    if (queue.length >= 10) {
      toast({
        title: "Queue is full",
        description: "Cannot enqueue more items",
        variant: "destructive",
      });
      return;
    }

    setAnimating('enqueue');
    
    setTimeout(() => {
      setQueue([...queue, inputValue]);
      setInputValue('');
      setAnimating('');
      
      toast({
        title: "Item enqueued",
        description: `${inputValue} has been added to the queue`,
      });
    }, 500);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      toast({
        title: "Queue is empty",
        description: "Cannot dequeue from an empty queue",
        variant: "destructive",
      });
      return;
    }

    setAnimating('dequeue');
    const firstItem = queue[0];
    
    setTimeout(() => {
      setQueue(queue.slice(1));
      setAnimating('');
      
      toast({
        title: "Item dequeued",
        description: `${firstItem} has been removed from the queue`,
      });
    }, 500);
  };

  const handleClear = () => {
    setQueue([]);
    toast({
      title: "Queue cleared",
      description: "All items have been removed",
    });
  };

  return (
    <div className="visualizer-container">
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="bg-muted text-dsavis-light"
          />
          <Button onClick={handleEnqueue} variant="secondary">
            <ArrowRight className="mr-2 h-4 w-4" /> Enqueue
          </Button>
          <Button onClick={handleDequeue} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dequeue
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-3xl p-8 border border-dashed border-dsavis-secondary rounded-lg">
          {queue.length === 0 ? (
            <div className="text-center text-dsavis-light opacity-70">
              <p>Queue is empty. Use Enqueue to add items.</p>
            </div>
          ) : (
            <>
              {/* Front label */}
              <div className="absolute top-0 left-6 -translate-y-3 bg-dsavis-dark px-2 text-sm text-dsavis-primary">
                Front
              </div>
              
              {/* Back label */}
              <div className="absolute top-0 right-6 -translate-y-3 bg-dsavis-dark px-2 text-sm text-dsavis-primary">
                Back
              </div>
              
              <div className="flex justify-center items-center space-x-4">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`queue-item w-12 h-12 min-w-12 ${
                      animating === 'enqueue' && index === queue.length - 1
                        ? 'animate-fade-in'
                        : animating === 'dequeue' && index === 0
                        ? 'animate-fade-out'
                        : ''
                    }`}
                  >
                    {item}
                  </div>
                ))}
                
                {/* Placeholder for new item animation */}
                {animating === 'enqueue' && (
                  <div className="queue-item w-12 h-12 min-w-12 animate-fade-in">
                    {inputValue}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-dsavis-light">
            A queue follows the First In First Out (FIFO) principle.
            <br />
            Items are added to the back and removed from the front.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
