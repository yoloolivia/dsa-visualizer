
import React, { useState, useEffect } from 'react';
import VisualizerControls from './VisualizerControls';
import { toast } from 'sonner';

interface ArrayVisualizerProps {
  initialArray?: number[];
}

const ArrayVisualizer = ({ initialArray = [5, 10, 15, 20, 25] }: ArrayVisualizerProps) => {
  const [array, setArray] = useState<number[]>(initialArray);
  const [history, setHistory] = useState<number[][]>([initialArray]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<number | null>(null);
  
  // For animation playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < history.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setArray(history[currentStep + 1]);
      }, 800);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, history]);
  
  const handleAdd = (value: number) => {
    if (array.length >= 12) {
      toast.error("Maximum array size reached (12 elements)");
      return;
    }
    
    const newArray = [...array, value];
    setArray(newArray);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), newArray];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success(`Added ${value} to the array`);
  };
  
  const handleRemove = () => {
    if (array.length === 0) {
      toast.error("Array is empty");
      return;
    }
    
    const newArray = array.slice(0, -1);
    setArray(newArray);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), newArray];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success("Removed last element from the array");
  };
  
  const handleClear = () => {
    setArray([]);
    
    // Add to history
    const newHistory = [...history.slice(0, currentStep + 1), []];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    toast.success("Array cleared");
  };
  
  const handleSearch = (value: number) => {
    setSearchValue(value);
    
    // Simple linear search animation
    let index = 0;
    const findElement = () => {
      if (index >= array.length) {
        toast.error(`Value ${value} not found in array`);
        setHighlightIndex(null);
        setSearchValue(null);
        return;
      }
      
      setHighlightIndex(index);
      
      if (array[index] === value) {
        setTimeout(() => {
          toast.success(`Found ${value} at index ${index}`);
          setHighlightIndex(null);
          setSearchValue(null);
        }, 1000);
      } else {
        setTimeout(findElement, 800);
        index++;
      }
    };
    
    findElement();
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
      setArray(history[currentStep + 1]);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setArray(history[currentStep - 1]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full p-4 bg-muted rounded-lg mb-4 min-h-[200px] flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {array.map((value, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-md text-lg font-mono border-2
                ${highlightIndex === index ? 'bg-dsavis-primary text-white border-white' : 'bg-card text-dsavis-light border-dsavis-secondary'}
                ${searchValue !== null && value === searchValue ? 'ring-2 ring-dsavis-primary' : ''}`}
              >
                <div>
                  <span className="text-lg">{value}</span>
                  <span className="block text-xs text-dsavis-light mt-1">i: {index}</span>
                </div>
              </div>
            ))}
            {array.length === 0 && (
              <div className="text-dsavis-light">Empty Array</div>
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
              dataStructure="array"
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
              {highlightIndex !== null ? (
                `Searching at index: ${highlightIndex}`
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

export default ArrayVisualizer;
