
import React from 'react';
import VisualizerLayout from '@/components/VisualizerLayout';
import BinaryTreeVisualizer from '@/components/BinaryTreeVisualizer';
import ComplexityInfo from '@/components/ComplexityInfo';

const BinaryTreePage = () => {
  const binaryTreeExampleCode = `// JavaScript Binary Tree implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a node in level order
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      
      if (!node.left) {
        node.left = newNode;
        return;
      }
      if (!node.right) {
        node.right = newNode;
        return;
      }
      
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  
  // Inorder traversal (left, root, right)
  inorderTraversal(node = this.root, result = []) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
    return result;
  }
  
  // Preorder traversal (root, left, right)
  preorderTraversal(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
    return result;
  }
  
  // Postorder traversal (left, right, root)
  postorderTraversal(node = this.root, result = []) {
    if (node) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}`;

  return (
    <VisualizerLayout title="Binary Tree">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-dsavis-primary mb-4">Binary Tree Visualizer</h2>
          <BinaryTreeVisualizer />
        </div>
        
        <ComplexityInfo
          title="Binary Tree"
          description="A binary tree is a hierarchical data structure where each node has at most two children, referred to as the left child and right child. It is used to represent hierarchical relationships."
          timeComplexity={[
            { operation: "Access", complexity: "O(n)" },
            { operation: "Search", complexity: "O(n)" },
            { operation: "Insertion", complexity: "O(n)" },
            { operation: "Deletion", complexity: "O(n)" },
            { operation: "Traversal", complexity: "O(n)" }
          ]}
          spaceComplexity="O(n)"
          useCases={[
            "Expression evaluation and syntax trees",
            "Huffman coding for data compression",
            "Priority queues",
            "Hierarchical data representation"
          ]}
          exampleCode={binaryTreeExampleCode}
        />
      </div>
    </VisualizerLayout>
  );
};

export default BinaryTreePage;
