
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import VisualizerControls from './VisualizerControls';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  highlighted?: boolean;
}

const BinaryTreeVisualizer = () => {
  const initialTree: TreeNode = {
    value: 50,
    left: {
      value: 30,
      left: {
        value: 20,
        left: null,
        right: null
      },
      right: {
        value: 40,
        left: null,
        right: null
      }
    },
    right: {
      value: 70,
      left: {
        value: 60,
        left: null,
        right: null
      },
      right: {
        value: 80,
        left: null,
        right: null
      }
    }
  };

  const [root, setRoot] = useState<TreeNode | null>(initialTree);
  const [history, setHistory] = useState<(TreeNode | null)[]>([initialTree]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [traversalOrder, setTraversalOrder] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  // For animation playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < history.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setRoot(history[currentStep + 1]);
      }, 800);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, history]);

  const deepCloneTree = (node: TreeNode | null): TreeNode | null => {
    if (node === null) return null;
    return {
      value: node.value,
      left: deepCloneTree(node.left),
      right: deepCloneTree(node.right),
      highlighted: node.highlighted
    };
  };

  const addNode = (tree: TreeNode | null, value: number): TreeNode => {
    if (tree === null) {
      return { value, left: null, right: null };
    }

    if (value < tree.value) {
      tree.left = addNode(tree.left, value);
    } else if (value > tree.value) {
      tree.right = addNode(tree.right, value);
    }

    return tree;
  };

  const countNodes = (node: TreeNode | null): number => {
    if (node === null) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  const handleAdd = (value: number) => {
    if (countNodes(root) >= 15) {
      toast.error("Maximum tree size reached (15 nodes)");
      return;
    }
    
    const newRoot = deepCloneTree(root);
    const updatedTree = addNode(newRoot, value);
    
    setRoot(updatedTree);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), updatedTree];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success(`Added node with value ${value}`);
  };

  const resetHighlights = (node: TreeNode | null): TreeNode | null => {
    if (node === null) return null;
    
    return {
      value: node.value,
      left: resetHighlights(node.left),
      right: resetHighlights(node.right),
      highlighted: false
    };
  };

  const handleClear = () => {
    setRoot(null);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), null];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success("Tree cleared");
    setTraversalOrder([]);
  };

  const inorderTraversal = (node: TreeNode | null, result: number[] = []) => {
    if (node !== null) {
      inorderTraversal(node.left, result);
      result.push(node.value);
      inorderTraversal(node.right, result);
    }
    return result;
  };

  const preorderTraversal = (node: TreeNode | null, result: number[] = []) => {
    if (node !== null) {
      result.push(node.value);
      preorderTraversal(node.left, result);
      preorderTraversal(node.right, result);
    }
    return result;
  };

  const postorderTraversal = (node: TreeNode | null, result: number[] = []) => {
    if (node !== null) {
      postorderTraversal(node.left, result);
      postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  };

  const handleTraversal = () => {
    let traversalResult: number[] = [];
    
    if (traversalType === 'inorder') {
      traversalResult = inorderTraversal(root);
      toast.success("Inorder traversal started");
    } else if (traversalType === 'preorder') {
      traversalResult = preorderTraversal(root);
      toast.success("Preorder traversal started");
    } else {
      traversalResult = postorderTraversal(root);
      toast.success("Postorder traversal started");
    }
    
    setTraversalOrder(traversalResult);
    
    // Animate the traversal by highlighting nodes
    let index = 0;
    
    const animateTraversal = () => {
      if (index >= traversalResult.length) {
        // Reset all highlights when done
        const clearedTree = resetHighlights(root);
        setRoot(clearedTree);
        return;
      }
      
      const currentValue = traversalResult[index];
      
      // Find and highlight the node with currentValue
      const highlightNode = (node: TreeNode | null): TreeNode | null => {
        if (node === null) return null;
        
        const newNode = {
          ...node,
          left: highlightNode(node.left),
          right: highlightNode(node.right),
          highlighted: node.value === currentValue
        };
        
        return newNode;
      };
      
      const highlightedTree = highlightNode(deepCloneTree(root));
      setRoot(highlightedTree);
      
      setTimeout(animateTraversal, 1000);
      index++;
    };
    
    animateTraversal();
  };

  const handlePlay = () => {
    if (currentStep < history.length - 1) {
      setIsPlaying(true);
    } else {
      toast("End of history reached");
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setRoot(history[currentStep + 1]);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setRoot(history[currentStep - 1]);
    }
  };

  // Render tree node with positions
  const renderTree = (node: TreeNode | null, x: number, y: number, level: number) => {
    if (!node) return null;
    
    const horizontalSpacing = 55 / Math.pow(1.8, level); // Adjust spacing based on level
    
    return (
      <g key={`${x}-${y}`}>
        {/* Draw connecting lines to children */}
        {node.left && (
          <line
            x1={x}
            y1={y + 10}
            x2={x - horizontalSpacing}
            y2={y + 40}
            stroke="#6E59A5"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y + 10}
            x2={x + horizontalSpacing}
            y2={y + 40}
            stroke="#6E59A5"
            strokeWidth="2"
          />
        )}
        
        {/* Render node */}
        <circle
          cx={x}
          cy={y}
          r={16}
          fill={node.highlighted ? "#9B87F5" : "#1A1F2C"}
          stroke={node.highlighted ? "white" : "#6E59A5"}
          strokeWidth="2"
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill={node.highlighted ? "white" : "#D6BCFA"}
          fontSize="12"
          fontWeight="bold"
        >
          {node.value}
        </text>
        
        {/* Render children */}
        {node.left && renderTree(node.left, x - horizontalSpacing, y + 50, level + 1)}
        {node.right && renderTree(node.right, x + horizontalSpacing, y + 50, level + 1)}
      </g>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full bg-muted rounded-lg mb-4 overflow-x-auto">
          <div className="min-h-[300px] p-4 flex justify-center">
            <svg width="100%" height="300" viewBox="0 0 420 300">
              <g transform="translate(210, 30)">
                {root ? renderTree(root, 0, 0, 0) : <text x="0" y="20" textAnchor="middle" fill="#D6BCFA">Empty Tree</text>}
              </g>
            </svg>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <VisualizerControls
              onPush={handleAdd}
              onPop={() => {}} // Not implementing delete for simplicity
              onClear={handleClear}
              onPlay={handlePlay}
              onPause={handlePause}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              isPlaying={isPlaying}
              canStepForward={currentStep < history.length - 1}
              canStepBackward={currentStep > 0}
              inputValue={inputValue}
              setInputValue={setInputValue}
              dataStructure="binary-tree"
            />
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <select
                  value={traversalType}
                  onChange={(e) => setTraversalType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-muted border border-dsavis-secondary rounded focus:outline-none focus:ring-1 focus:ring-dsavis-primary"
                >
                  <option value="inorder">Inorder Traversal</option>
                  <option value="preorder">Preorder Traversal</option>
                  <option value="postorder">Postorder Traversal</option>
                </select>
                <button
                  onClick={handleTraversal}
                  className="px-4 py-2 bg-dsavis-primary hover:bg-dsavis-secondary text-white rounded transition-colors"
                >
                  Traverse
                </button>
              </div>
              
              {traversalOrder.length > 0 && (
                <div className="mt-4">
                  <p className="text-dsavis-light text-sm mb-2">Traversal Order:</p>
                  <div className="flex flex-wrap gap-2 bg-card p-3 rounded border border-dsavis-secondary">
                    {traversalOrder.map((value, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted rounded text-dsavis-light text-sm"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;
