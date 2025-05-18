
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import StackVisualizer from '@/components/StackVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const StackPage = () => {
  const stackCode = `class Stack {
  constructor() {
    this.items = [];
  }
    
  push(element) {
    this.items.push(element);
  }
    
  pop() {
    if (this.items.length === 0)
      return "Underflow";
    return this.items.pop();
  }
    
  peek() {
    return this.items[this.items.length - 1];
  }
    
  isEmpty() {
    return this.items.length === 0;
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // 20`;

  return (
    <VisualizerLayout title="Stack">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StackVisualizer />
        
        <ComplexityInfo
          title="Stack"
          description="A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The last element inserted into the stack is the first one to be removed."
          timeComplexity={[
            { operation: "Push", complexity: "O(1)" },
            { operation: "Pop", complexity: "O(1)" },
            { operation: "Peek", complexity: "O(1)" },
            { operation: "Search", complexity: "O(n)" },
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "Function call management (Call Stack)",
            "Expression evaluation and syntax parsing",
            "Undo mechanisms in text editors",
            "Browser history (back button functionality)",
            "Backtracking algorithms"
          ]}
          exampleCode={stackCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default StackPage;
