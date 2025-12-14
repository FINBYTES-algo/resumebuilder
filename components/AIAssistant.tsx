import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from './Button';

interface AIAssistantProps {
  onGenerate: () => Promise<string>;
  onAccept: (text: string) => void;
  label?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onGenerate, onAccept, label = "Enhance with AI" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await onGenerate();
      onAccept(result);
    } catch (e) {
      setError('Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={handleClick}
        isLoading={loading}
        className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      >
        <Wand2 className="w-3 h-3 mr-1.5" />
        {label}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};