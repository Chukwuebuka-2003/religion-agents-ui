import React from 'react';
import { Book, Bookmark, Heart } from 'lucide-react';
import type { ApiResponse } from '../types';
import { clsx } from 'clsx';

interface ResponseCardProps {
  response: ApiResponse;
}

export function ResponseCard({ response }: ResponseCardProps) {
  const { detect_emotion, compassion_message } = response;
  const hasBoth = 'bible_verse' in response && 'quran_verse' in response;
  const hasChristian = 'bible_verse' in response;
  const hasIslamic = 'quran_verse' in response;

  return (
    <div className="w-full max-w-2xl space-y-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <Heart className="text-pink-500 w-6 h-6" />
        <div>
          <h3 className="font-semibold text-gray-900">
            {detect_emotion.primary_emotion}
          </h3>
          <div className="text-sm text-gray-600">
            Intensity: {detect_emotion.intensity}/10
          </div>
        </div>
      </div>

      {hasChristian && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Book className="w-5 h-5" />
            <h4 className="font-medium">Bible Verse</h4>
          </div>
          <blockquote className="pl-4 border-l-4 border-blue-200">
            <p className="text-gray-700">{response.bible_verse.verse_text}</p>
            <cite className="block mt-2 text-sm text-gray-500">
              — {response.bible_verse.verse_ref}
            </cite>
          </blockquote>
          <p className="text-sm text-gray-600 italic">
            {response.bible_verse.relevance_explanation}
          </p>
        </div>
      )}

      {hasIslamic && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-600">
            <Bookmark className="w-5 h-5" />
            <h4 className="font-medium">Quran Verse</h4>
          </div>
          <blockquote className="pl-4 border-l-4 border-green-200">
            <p className="text-gray-700">{response.quran_verse.verse_text}</p>
            <cite className="block mt-2 text-sm text-gray-500">
              — {response.quran_verse.verse_ref}
            </cite>
          </blockquote>
          <p className="text-sm text-gray-600 italic">
            {response.quran_verse.relevance_explanation}
          </p>
        </div>
      )}

      <div className={clsx(
        "mt-6 p-4 rounded-lg",
        hasBoth ? "bg-gradient-to-r from-blue-50 to-green-50" :
        hasChristian ? "bg-blue-50" :
        "bg-green-50"
      )}>
        <p className="text-gray-700">{compassion_message}</p>
      </div>
    </div>
  );
}