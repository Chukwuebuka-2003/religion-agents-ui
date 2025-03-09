export type Faith = 'Christian' | 'Islamic' | 'Both';

export interface Emotion {
  primary_emotion: string;
  intensity: number;
  context: string | null;
}

export interface BibleVerse {
  verse_ref: string;
  verse_text: string;
  relevance_explanation: string;
}

export interface QuranVerse {
  verse_ref: string;
  verse_text: string;
  relevance_explanation: string;
}

export interface ChristianResponse {
  detect_emotion: Emotion;
  bible_verse: BibleVerse;
  compassion_message: string;
}

export interface IslamicResponse {
  detect_emotion: Emotion;
  quran_verse: QuranVerse;
  compassion_message: string;
}

export interface CombinedResponse {
  detect_emotion: Emotion;
  bible_verse: BibleVerse;
  quran_verse: QuranVerse;
  compassion_message: string;
}

export type ApiResponse = ChristianResponse | IslamicResponse | CombinedResponse;