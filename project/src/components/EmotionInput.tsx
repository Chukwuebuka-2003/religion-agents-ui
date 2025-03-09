import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import type { Faith } from '../types';

interface EmotionInputProps {
  onSubmit: (text: string, faith: Faith) => void;
  isLoading: boolean;
}

export function EmotionInput({ onSubmit, isLoading }: EmotionInputProps) {
  const [text, setText] = useState('');
  const [faith, setFaith] = useState<Faith>('Both');

  const handleFaithChange = (value: string) => {
    const formattedFaith = (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) as Faith;
    setFaith(formattedFaith);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text, faith);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <div className="relative">
        <Heart className="absolute top-3 left-3 text-pink-500 w-6 h-6" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share how you're feeling..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label>Faith:</label>
        <select value={faith} onChange={(e) => handleFaithChange(e.target.value)} className="border p-2 rounded">
          <option value="Christian">Christian</option>
          <option value="Islamic">Islamic</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
      >
        {isLoading ? 'Loading...' : 'Submit'}
        <Send className="ml-2 w-5 h-5" />
      </button>
    </form>
  );
}
