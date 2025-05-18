
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import BinarySearchTreeVisualizer from '@/components/BinarySearchTreeVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const BSTPage = () => {
  const bstExampleCode = `// JavaScript Binary Search Tree implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a value into the BST
  insert(value) {
    const newNode = new Node(value);
    
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (value === current.value) return this; // No duplicates
      
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  
  // Search for a value in the BST
  search(value) {
    if (this.root === null) return false;
    
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return false;
  }
  
  // Find minimum value
  findMin() {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    
    return current.value;
  }
}`;

  return (
    <VisualizerLayout title="Binary Search Tree">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-dsavis-primary mb-4">Binary Search Tree Visualizer</h2>
          <BinarySearchTreeVisualizer />
        </div>
        
        <ComplexityInfo
          title="Binary Search Tree (BST)"
          description="A binary search tree is a binary tree with the property that for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater than the node's value."
          timeComplexity={[
            { operation: "Access", complexity: "O(log n) avg, O(n) worst" },
            { operation: "Search", complexity: "O(log n) avg, O(n) worst" },
            { operation: "Insertion", complexity: "O(log n) avg, O(n) worst" },
            { operation: "Deletion", complexity: "O(log n) avg, O(n) worst" }
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "Database indexing",
            "Priority queues",
            "Implementing associative arrays",
            "Symbol tables in compilers",
            "Hierarchical data representation with efficient searches"
          ]}
          exampleCode={bstExampleCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default BSTPage;
