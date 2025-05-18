
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import QueueVisualizer from '@/components/QueueVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const QueuePage = () => {
  const queueCode = `class Queue {
  constructor() {
    this.items = [];
  }
    
  enqueue(element) {
    this.items.push(element);
  }
    
  dequeue() {
    if (this.items.length === 0)
      return "Underflow";
    return this.items.shift();
  }
    
  front() {
    if (this.items.length === 0)
      return "Queue is empty";
    return this.items[0];
  }
    
  isEmpty() {
    return this.items.length === 0;
  }
}

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.dequeue()); // 10`;

  return (
    <VisualizerLayout title="Queue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QueueVisualizer />
        
        <ComplexityInfo
          title="Queue"
          description="A queue is a linear data structure that follows the First In First Out (FIFO) principle. The first element inserted into the queue is the first one to be removed."
          timeComplexity={[
            { operation: "Enqueue", complexity: "O(1)" },
            { operation: "Dequeue", complexity: "O(1)" },
            { operation: "Front", complexity: "O(1)" },
            { operation: "Search", complexity: "O(n)" },
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "CPU Task Scheduling",
            "Handling of interrupts in real-time systems",
            "Breadth-First Search algorithm implementation",
            "Print queue management",
            "Call center phone systems"
          ]}
          exampleCode={queueCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default QueuePage;
