import React, { useState } from 'react';
import axios from 'axios';
import { Heart, BookOpen } from 'lucide-react';
import { EmotionInput } from './components/EmotionInput';
import { ResponseCard } from './components/ResponseCard';
import type { ApiResponse, Faith } from './types';

const API_URL = 'http://localhost:8000';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string, faith: Faith) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<ApiResponse>(`${API_URL}/analyze-emotion/`, {
        text,
        faith
      });
      setResponse(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.status === 422
          ? 'Invalid input format. Please try again.'
          : 'Failed to analyze emotion. Please try again.';
        setError(errorMessage);
        console.error('Error details:', {
          status: err.response?.status,
          message: err.message,
          data: err.response?.data
        });
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error occurred:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-pink-500 w-8 h-8" />
            <BookOpen className="text-purple-500 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Interfaith Emotional Guidance
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your feelings and receive compassionate guidance through verses
            from the Bible and Quran, offering comfort and wisdom from both
            traditions.
          </p>
        </header>

        <main className="flex flex-col items-center gap-8">
          <EmotionInput onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {response && <ResponseCard response={response} />}
        </main>
      </div>
    </div>
  );
}

export default App;