
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import VisualizerControls from './VisualizerControls';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  highlighted?: boolean;
}

const BinarySearchTreeVisualizer = () => {
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
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [searchPath, setSearchPath] = useState<number[]>([]);

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

  const insertNode = (tree: TreeNode | null, value: number): TreeNode => {
    if (tree === null) {
      return { value, left: null, right: null };
    }

    if (value < tree.value) {
      tree.left = insertNode(tree.left, value);
    } else if (value > tree.value) {
      tree.right = insertNode(tree.right, value);
    }
    // If value is equal, we're ignoring (no duplicates in this BST)

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

    // Check if value already exists
    const searchResult = searchTree(root, value);
    if (searchResult) {
      toast.error(`Value ${value} already exists in the tree`);
      return;
    }
    
    const newRoot = deepCloneTree(root);
    const updatedTree = insertNode(newRoot, value);
    
    setRoot(updatedTree);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), updatedTree];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success(`Added node with value ${value}`);
  };

  const deleteNode = (tree: TreeNode | null, value: number): TreeNode | null => {
    // Base case: tree is null
    if (tree === null) return null;

    // Navigate to the node to delete
    if (value < tree.value) {
      tree.left = deleteNode(tree.left, value);
    } else if (value > tree.value) {
      tree.right = deleteNode(tree.right, value);
    } else {
      // Found the node to delete

      // Case 1: Leaf node (no children)
      if (tree.left === null && tree.right === null) {
        return null;
      }
      
      // Case 2: One child
      if (tree.left === null) {
        return tree.right;
      }
      if (tree.right === null) {
        return tree.left;
      }
      
      // Case 3: Two children
      // Find the minimum value in right subtree (successor)
      let successor = tree.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      
      // Replace current node's value with successor value
      tree.value = successor.value;
      
      // Delete the successor
      tree.right = deleteNode(tree.right, successor.value);
    }
    
    return tree;
  };

  const handleRemove = () => {
    if (root === null) {
      toast.error("Tree is empty");
      return;
    }
    
    if (searchValue === null) {
      toast.error("Please enter a value to delete");
      return;
    }
    
    // Check if value exists
    const searchResult = searchTree(root, searchValue);
    if (!searchResult) {
      toast.error(`Value ${searchValue} not found in tree`);
      return;
    }
    
    const newRoot = deepCloneTree(root);
    const updatedTree = deleteNode(newRoot, searchValue);
    
    setRoot(updatedTree);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), updatedTree];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success(`Deleted node with value ${searchValue}`);
    setSearchValue(null);
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
    setSearchPath([]);
  };

  const searchTree = (node: TreeNode | null, value: number): boolean => {
    if (node === null) return false;
    if (node.value === value) return true;
    
    if (value < node.value) {
      return searchTree(node.left, value);
    } else {
      return searchTree(node.right, value);
    }
  };

  const searchTreeWithPath = (node: TreeNode | null, value: number, path: number[] = []): number[] => {
    if (node === null) return path;
    
    path.push(node.value);
    
    if (node.value === value) return path;
    
    if (value < node.value) {
      return searchTreeWithPath(node.left, value, path);
    } else {
      return searchTreeWithPath(node.right, value, path);
    }
  };

  const handleSearch = () => {
    if (searchValue === null) {
      toast.error("Please enter a value to search");
      return;
    }
    
    const searchPath = searchTreeWithPath(root, searchValue);
    setSearchPath(searchPath);
    
    // Highlight the search path
    let currentNode = root;
    let foundValue = false;
    
    const animatePath = (pathIndex = 0) => {
      if (pathIndex >= searchPath.length) {
        setTimeout(() => {
          const clearedTree = resetHighlights(root);
          setRoot(clearedTree);
          
          if (!foundValue) {
            toast.error(`Value ${searchValue} not found in tree`);
          }
        }, 1000);
        return;
      }
      
      const currentValue = searchPath[pathIndex];
      
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
      
      // Check if found
      if (currentValue === searchValue) {
        foundValue = true;
        toast.success(`Found value ${searchValue}`);
      }
      
      setTimeout(() => animatePath(pathIndex + 1), 1000);
    };
    
    animatePath();
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
              onPop={handleRemove}
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
              dataStructure="bst"
            />
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Search value"
                  className="w-full px-3 py-2 bg-muted border border-dsavis-secondary rounded focus:outline-none focus:ring-1 focus:ring-dsavis-primary"
                  value={searchValue !== null ? searchValue : ''}
                  onChange={(e) => setSearchValue(e.target.value ? parseInt(e.target.value) : null)}
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-dsavis-primary hover:bg-dsavis-secondary text-white rounded transition-colors"
                  disabled={searchValue === null}
                >
                  Search
                </button>
              </div>
              
              {searchPath.length > 0 && (
                <div className="mt-4">
                  <p className="text-dsavis-light text-sm mb-2">Search Path:</p>
                  <div className="flex flex-wrap gap-2 bg-card p-3 rounded border border-dsavis-secondary">
                    {searchPath.map((value, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded text-sm ${
                          value === searchValue ? 'bg-dsavis-primary text-white' : 'bg-muted text-dsavis-light'
                        }`}
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

export default BinarySearchTreeVisualizer;
