
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import LinkedListVisualizer from '@/components/LinkedListVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const LinkedListPage = () => {
  const linkedListExampleCode = `// JavaScript Linked List implementation
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a node to the end
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
  }
  
  // Search for a node
  search(value) {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.value === value) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
}`;

  return (
    <VisualizerLayout title="Linked List">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-dsavis-primary mb-4">Linked List Visualizer</h2>
          <LinkedListVisualizer />
        </div>
        
        <ComplexityInfo
          title="Linked List"
          description="A linked list is a linear data structure where each element (node) contains a value and a reference to the next node. It allows for efficient insertions and deletions without reorganizing the entire data structure."
          timeComplexity={[
            { operation: "Access", complexity: "O(n)" },
            { operation: "Search", complexity: "O(n)" },
            { operation: "Insert (beginning)", complexity: "O(1)" },
            { operation: "Insert (end)", complexity: "O(n)" },
            { operation: "Delete (beginning)", complexity: "O(1)" },
            { operation: "Delete (end)", complexity: "O(n)" }
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "When insertions and deletions are frequent",
            "Implementing other data structures (stacks, queues, etc.)",
            "When memory needs to be allocated dynamically",
            "When the size of the data structure is not known in advance"
          ]}
          exampleCode={linkedListExampleCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default LinkedListPage;
