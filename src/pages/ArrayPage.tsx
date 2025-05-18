
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import ArrayVisualizer from '@/components/ArrayVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const ArrayPage = () => {
  const arrayExampleCode = `// JavaScript Array example
const array = [5, 10, 15, 20, 25];

// Access element (O(1))
const element = array[2]; // 15

// Search element (O(n))
const index = array.indexOf(15); // 2

// Insert at end (O(1))
array.push(30); // [5, 10, 15, 20, 25, 30]

// Delete from end (O(1))
array.pop(); // [5, 10, 15, 20, 25]

// Insert at beginning (O(n))
array.unshift(0); // [0, 5, 10, 15, 20, 25]

// Delete from beginning (O(n))
array.shift(); // [5, 10, 15, 20, 25]`;

  return (
    <VisualizerLayout title="Array">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-dsavis-primary mb-4">Array Visualizer</h2>
          <ArrayVisualizer />
        </div>
        
        <ComplexityInfo
          title="Array"
          description="An array is a collection of elements, each identified by an index. Arrays are stored in contiguous memory locations, making them efficient for accessing elements by their index."
          timeComplexity={[
            { operation: "Access", complexity: "O(1)" },
            { operation: "Search", complexity: "O(n)" },
            { operation: "Insert (end)", complexity: "O(1)" },
            { operation: "Insert (beginning/middle)", complexity: "O(n)" },
            { operation: "Delete (end)", complexity: "O(1)" },
            { operation: "Delete (beginning/middle)", complexity: "O(n)" }
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "Storing collections of items with a fixed or dynamic size",
            "Implementing other data structures like stacks, queues, etc.",
            "Temporary storage during algorithm execution",
            "Fast access when index is known"
          ]}
          exampleCode={arrayExampleCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default ArrayPage;
