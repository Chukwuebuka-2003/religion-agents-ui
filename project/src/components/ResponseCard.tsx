import { Book, Bookmark, Heart } from "lucide-react";

import type { ApiResponse } from "../types";
import { clsx } from "clsx";

interface ResponseCardProps {
    response: ApiResponse;
}

export function ResponseCard({ response }: ResponseCardProps) {
    const { detect_emotion, compassion_message } = response;
    const hasBoth = "bible_verse" in response && "quran_verse" in response;
    const hasChristian = "bible_verse" in response;
    const hasIslamic = "quran_verse" in response;

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-md border overflow-hidden shadow-gray-200">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Heart className="text-pink-500 w-8 h-8" />
                            <div className="absolute -inset-1 bg-pink-500 rounded-full animate-ping opacity-20" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-900">
                                {detect_emotion.primary_emotion}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                                        style={{
                                            width: `${
                                                detect_emotion.intensity * 10
                                            }%`,
                                        }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600">
                                    Intensity: {detect_emotion.intensity}/10
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {hasChristian && (
                        <div className="space-y-3 transform transition-all duration-300 hover:translate-x-1">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Book className="w-5 h-5" />
                                <h4 className="font-semibold">Bible Verse</h4>
                            </div>
                            <blockquote className="pl-4 border-l-4 border-blue-200 py-2">
                                <p className="text-gray-700 font-medium">
                                    {response.bible_verse.verse_text}
                                </p>
                                <cite className="block mt-2 text-sm text-gray-500 font-normal">
                                    — {response.bible_verse.verse_ref}
                                </cite>
                            </blockquote>
                            <p className="text-sm text-gray-600 italic pl-4">
                                {response.bible_verse.relevance_explanation}
                            </p>
                        </div>
                    )}

                    {hasIslamic && (
                        <div className="space-y-3 transform transition-all duration-300 hover:translate-x-1">
                            <div className="flex items-center gap-2 text-green-600">
                                <Bookmark className="w-5 h-5" />
                                <h4 className="font-semibold">Quran Verse</h4>
                            </div>
                            <blockquote className="pl-4 border-l-4 border-green-200 py-2">
                                <p className="text-gray-700 font-medium">
                                    {response.quran_verse.verse_text}
                                </p>
                                <cite className="block mt-2 text-sm text-gray-500 font-normal">
                                    — {response.quran_verse.verse_ref}
                                </cite>
                            </blockquote>
                            <p className="text-sm text-gray-600 italic pl-4">
                                {response.quran_verse.relevance_explanation}
                            </p>
                        </div>
                    )}

                    <div
                        className={clsx(
                            "mt-8 p-6 rounded-xl shadow-inner border",
                            hasBoth
                                ? "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50"
                                : hasChristian
                                ? "bg-gradient-to-r from-blue-50 to-purple-50"
                                : "bg-gradient-to-r from-green-50 to-purple-50"
                        )}
                    >
                        <p className="text-gray-700 font-medium leading-relaxed">
                            {compassion_message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
