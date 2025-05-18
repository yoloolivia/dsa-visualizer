
import React, { useState, useEffect, useRef } from 'react';
import VisualizerControls from './VisualizerControls';
import { toast } from 'sonner';

interface StackOperation {
  type: 'push' | 'pop' | 'clear';
  value?: number;
}

interface StackState {
  items: number[];
  operations: StackOperation[];
  currentStep: number;
}

const StackVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [stackState, setStackState] = useState<StackState>({
    items: [],
    operations: [],
    currentStep: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');
  const animationRef = useRef<number>();
  const maxStackSize = 7;

  const handlePush = (value: number) => {
    if (stackState.items.length >= maxStackSize) {
      toast.error("Stack overflow! Cannot push more items.");
      return;
    }
    
    const newOperation: StackOperation = { type: 'push', value };
    const newOperations = [...stackState.operations.slice(0, stackState.currentStep), newOperation];
    
    setStackState(prev => ({
      items: [...prev.items, value],
      operations: newOperations,
      currentStep: prev.currentStep + 1,
    }));
    
    setCurrentDescription(`Pushed ${value} onto the stack`);
    toast.success(`Pushed ${value} onto the stack`);
  };

  const handlePop = () => {
    if (stackState.items.length === 0) {
      toast.error("Stack underflow! Cannot pop from an empty stack.");
      return;
    }
    
    const newOperation: StackOperation = { type: 'pop' };
    const newOperations = [...stackState.operations.slice(0, stackState.currentStep), newOperation];
    const poppedValue = stackState.items[stackState.items.length - 1];
    
    setStackState(prev => ({
      items: prev.items.slice(0, -1),
      operations: newOperations,
      currentStep: prev.currentStep + 1,
    }));
    
    setCurrentDescription(`Popped ${poppedValue} from the stack`);
    toast.info(`Popped ${poppedValue} from the stack`);
  };

  const handleClear = () => {
    if (stackState.items.length === 0) {
      toast("Stack is already empty!");
      return;
    }
    
    const newOperation: StackOperation = { type: 'clear' };
    const newOperations = [...stackState.operations.slice(0, stackState.currentStep), newOperation];
    
    setStackState({
      items: [],
      operations: newOperations,
      currentStep: stackState.currentStep + 1,
    });
    
    setCurrentDescription('Cleared the stack');
    toast("Stack cleared!");
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleStepForward = () => {
    if (stackState.currentStep >= stackState.operations.length) {
      return;
    }
    
    applyOperation(stackState.operations[stackState.currentStep]);
    setStackState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const handleStepBackward = () => {
    if (stackState.currentStep <= 0) {
      return;
    }
    
    const newStep = stackState.currentStep - 1;
    const replayState = replayOperations(stackState.operations.slice(0, newStep));
    
    setStackState({
      items: replayState,
      operations: stackState.operations,
      currentStep: newStep,
    });
    
    setCurrentDescription('Stepped backward');
  };

  const applyOperation = (operation: StackOperation) => {
    switch (operation.type) {
      case 'push':
        if (operation.value !== undefined) {
          setStackState(prev => ({
            ...prev,
            items: [...prev.items, operation.value!],
          }));
          setCurrentDescription(`Pushed ${operation.value} onto the stack`);
        }
        break;
      case 'pop':
        if (stackState.items.length > 0) {
          const poppedValue = stackState.items[stackState.items.length - 1];
          setStackState(prev => ({
            ...prev,
            items: prev.items.slice(0, -1),
          }));
          setCurrentDescription(`Popped ${poppedValue} from the stack`);
        }
        break;
      case 'clear':
        setStackState(prev => ({
          ...prev,
          items: [],
        }));
        setCurrentDescription('Cleared the stack');
        break;
    }
  };

  const replayOperations = (operations: StackOperation[]): number[] => {
    let replayStack: number[] = [];
    
    operations.forEach(op => {
      switch (op.type) {
        case 'push':
          if (op.value !== undefined) {
            replayStack = [...replayStack, op.value];
          }
          break;
        case 'pop':
          if (replayStack.length > 0) {
            replayStack = replayStack.slice(0, -1);
          }
          break;
        case 'clear':
          replayStack = [];
          break;
      }
    });
    
    return replayStack;
  };

  useEffect(() => {
    if (isPlaying) {
      const playNextStep = () => {
        if (stackState.currentStep < stackState.operations.length) {
          handleStepForward();
          animationRef.current = requestAnimationFrame(() => {
            setTimeout(playNextStep, 1000);
          });
        } else {
          setIsPlaying(false);
        }
      };

      animationRef.current = requestAnimationFrame(() => {
        setTimeout(playNextStep, 500);
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, stackState.currentStep, stackState.operations.length]);

  return (
    <div className="space-y-6">
      <div className="visualizer-container min-h-[300px] flex flex-col items-center justify-center">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-dsavis-light mb-1">Stack Visualization</h2>
          {currentDescription && (
            <p className="text-sm text-dsavis-accent">{currentDescription}</p>
          )}
        </div>
        
        <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4">
          {stackState.items.map((item, index) => (
            <div 
              key={index} 
              className={`stack-item w-28 h-12 ${
                index === stackState.items.length - 1 ? 'border-dsavis-primary bg-dsavis-primary bg-opacity-20 text-dsavis-light' : ''
              }`}
              style={{
                opacity: index === stackState.items.length - 1 ? 1 : 0.8 - 0.1 * (stackState.items.length - 1 - index)
              }}
            >
              {item}
            </div>
          ))}
          
          {stackState.items.length === 0 && (
            <div className="text-muted-foreground italic">Stack is empty</div>
          )}
          
          <div className="border-b-2 border-dsavis-secondary w-32 mt-2"></div>
        </div>
        
        <VisualizerControls
          onPush={handlePush}
          onPop={handlePop}
          onClear={handleClear}
          onPlay={handlePlay}
          onPause={handlePause}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          isPlaying={isPlaying}
          canStepForward={stackState.currentStep < stackState.operations.length}
          canStepBackward={stackState.currentStep > 0}
          inputValue={inputValue}
          setInputValue={setInputValue}
          dataStructure="stack"
        />
      </div>
    </div>
  );
};

export default StackVisualizer;
