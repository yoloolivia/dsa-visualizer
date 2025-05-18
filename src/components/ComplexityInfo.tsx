
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ComplexityInfoProps {
  title: string;
  description: string;
  timeComplexity: {
    operation: string;
    complexity: string;
  }[];
  spaceComplexity: string;
  useCases: string[];
  exampleCode?: string;
}

const ComplexityInfo = ({
  title,
  description,
  timeComplexity,
  spaceComplexity,
  useCases,
  exampleCode,
}: ComplexityInfoProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-dsavis-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-dsavis-primary font-bold text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dsavis-light mb-4">{description}</p>
          
          <h3 className="font-bold text-dsavis-primary mb-2">Time Complexity</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {timeComplexity.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.operation}:</span>
                <span className="font-mono">{item.complexity}</span>
              </div>
            ))}
          </div>
          
          <h3 className="font-bold text-dsavis-primary mb-2">Space Complexity</h3>
          <p className="font-mono mb-4">{spaceComplexity}</p>
          
          <h3 className="font-bold text-dsavis-primary mb-2">Common Use Cases</h3>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            {useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
          
          {exampleCode && (
            <>
              <h3 className="font-bold text-dsavis-primary mb-2">Example Code</h3>
              <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                <code>{exampleCode}</code>
              </pre>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplexityInfo;
