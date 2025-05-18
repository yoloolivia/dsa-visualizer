
import React, { useState, useEffect } from 'react';
import VisualizerControls from './VisualizerControls';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

interface Node {
  value: number;
  highlighted?: boolean;
}

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { value: 10 },
    { value: 20 },
    { value: 30 }
  ]);
  const [history, setHistory] = useState<Node[][]>([[
    { value: 10 },
    { value: 20 },
    { value: 30 }
  ]]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // For animation playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < history.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setNodes(history[currentStep + 1]);
      }, 800);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, history]);

  const handleAdd = (value: number) => {
    if (nodes.length >= 8) {
      toast.error("Maximum list size reached (8 nodes)");
      return;
    }
    
    const newNodes = [...nodes, { value }];
    setNodes(newNodes);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), newNodes];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success(`Added node with value ${value}`);
  };

  const handleRemove = () => {
    if (nodes.length === 0) {
      toast.error("List is empty");
      return;
    }
    
    const newNodes = nodes.slice(0, -1);
    setNodes(newNodes);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), newNodes];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success("Removed last node");
  };

  const handleClear = () => {
    setNodes([]);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), []];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success("List cleared");
  };

  const handleSearch = (value: number) => {
    setSearchValue(value);
    
    // Simulate linked list traversal for search
    let index = 0;
    const findNode = () => {
      if (index >= nodes.length) {
        toast.error(`Value ${value} not found in list`);
        setCurrentIndex(null);
        
        const resettedNodes = nodes.map(node => ({ value: node.value }));
        setNodes(resettedNodes);
        return;
      }
      
      // Highlight current node
      const updatedNodes = nodes.map((node, i) => ({
        value: node.value,
        highlighted: i === index
      }));
      setNodes(updatedNodes);
      setCurrentIndex(index);
      
      if (nodes[index].value === value) {
        setTimeout(() => {
          toast.success(`Found value ${value} at position ${index}`);
          
          // Reset highlights after a moment
          setTimeout(() => {
            const resettedNodes = nodes.map(node => ({ value: node.value }));
            setNodes(resettedNodes);
            setCurrentIndex(null);
          }, 1000);
        }, 500);
      } else {
        setTimeout(findNode, 800);
        index++;
      }
    };
    
    findNode();
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
      setNodes(history[currentStep + 1]);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setNodes(history[currentStep - 1]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full p-4 bg-muted rounded-lg mb-4 min-h-[200px] flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4 overflow-x-auto py-6">
            {nodes.length > 0 ? (
              nodes.map((node, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`min-w-[100px] h-16 flex flex-col items-center justify-center rounded-md text-lg font-mono border-2
                    ${node.highlighted ? 'bg-dsavis-primary text-white border-white' : 'bg-card text-dsavis-light border-dsavis-secondary'}`}
                  >
                    <span className="text-lg">{node.value}</span>
                    <span className="block text-xs text-dsavis-light mt-1">pos: {index}</span>
                  </div>
                  
                  {index < nodes.length - 1 && (
                    <ArrowRight className="mx-1 text-dsavis-primary" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="text-dsavis-light">Empty List</div>
            )}
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
              dataStructure="linked-list"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Search value"
                className="w-full px-3 py-2 bg-muted border border-dsavis-secondary rounded focus:outline-none focus:ring-1 focus:ring-dsavis-primary"
                value={searchValue !== null ? searchValue.toString() : ''}
                onChange={(e) => setSearchValue(e.target.value ? parseInt(e.target.value) : null)}
              />
              <button
                onClick={() => searchValue !== null && handleSearch(searchValue)}
                className="px-4 py-2 bg-dsavis-primary hover:bg-dsavis-secondary text-white rounded transition-colors"
                disabled={searchValue === null}
              >
                Search
              </button>
            </div>
            <p className="text-sm text-dsavis-light">
              {currentIndex !== null ? (
                `Traversing node at position: ${currentIndex}`
              ) : (
                "Enter a value to search"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
