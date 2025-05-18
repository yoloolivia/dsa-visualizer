
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, SkipBack, StepBack, SkipForward, StepForward } from 'lucide-react';

interface VisualizerControlsProps {
  onPush: (value: number) => void;
  onPop: () => void;
  onClear: () => void;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  isPlaying: boolean;
  canStepForward: boolean;
  canStepBackward: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  dataStructure?: string;
}

const VisualizerControls = ({
  onPush,
  onPop,
  onClear,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  isPlaying,
  canStepForward,
  canStepBackward,
  inputValue,
  setInputValue,
  dataStructure = 'stack',
}: VisualizerControlsProps) => {
  const handlePush = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      onPush(value);
      setInputValue('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePush();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-28 bg-muted border-dsavis-secondary"
          />
          <Button 
            onClick={handlePush} 
            type="button"
            className="bg-dsavis-primary hover:bg-dsavis-secondary text-white"
          >
            Push
          </Button>
        </form>
        <Button 
          onClick={onPop} 
          variant="outline"
          className="border-dsavis-secondary text-dsavis-light hover:bg-dsavis-secondary hover:text-white"
        >
          Pop
        </Button>
        <Button 
          onClick={onClear}
          variant="outline" 
          className="border-dsavis-secondary text-dsavis-light hover:bg-dsavis-secondary hover:text-white"
        >
          Clear
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={onStepBackward}
          disabled={!canStepBackward}
          size="icon"
          variant="outline"
          className="border-dsavis-secondary text-dsavis-light hover:bg-dsavis-secondary hover:text-white disabled:opacity-50"
        >
          <StepBack className="h-4 w-4" />
        </Button>
        
        {isPlaying ? (
          <Button
            onClick={onPause}
            size="icon"
            className="bg-dsavis-primary hover:bg-dsavis-secondary text-white"
          >
            <Pause className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onPlay}
            size="icon"
            disabled={!canStepForward}
            className="bg-dsavis-primary hover:bg-dsavis-secondary text-white disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          onClick={onStepForward}
          disabled={!canStepForward}
          size="icon"
          variant="outline"
          className="border-dsavis-secondary text-dsavis-light hover:bg-dsavis-secondary hover:text-white disabled:opacity-50"
        >
          <StepForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VisualizerControls;
