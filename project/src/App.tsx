"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Heart, BookOpen } from "lucide-react";
import { EmotionInput } from "./components/EmotionInput";
import { ResponseCard } from "./components/ResponseCard";
import { LoadingSpinner } from "./components/LoadingSpinner";
import type { ApiResponse, Faith } from "./types";

const API_URL = "https://religion-ai-agents.onrender.com";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const responseRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToResponse = () => {
        if (responseRef.current) {
            setTimeout(() => {
                const yOffset = -100;
                const element = responseRef.current;
                if (element) {
                    const y =
                        element.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }, 100);
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
            setError("Request cancelled");
        }
    };

    const handleSubmit = async (text: string, faith: Faith) => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        abortControllerRef.current = new AbortController();

        try {
            const { data } = await axios.post<ApiResponse>(
                `${API_URL}/analyze-emotion/`,
                {
                    text,
                    faith,
                },
                {
                    signal: abortControllerRef.current.signal,
                }
            );
            setResponse(data);
            setTimeout(scrollToResponse, 100);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.code === "ERR_CANCELED") {
                    return;
                }
                const errorMessage =
                    err.response?.status === 422
                        ? "Invalid input format. Please try again."
                        : "Failed to analyze emotion. Please try again.";
                setError(errorMessage);
                console.error("Error details:", {
                    status: err.response?.status,
                    message: err.message,
                    data: err.response?.data,
                });
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("Unexpected error occurred:", err);
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <div className="container mx-auto px-6 py-16 relative">
                <header className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-6 sm:mb-8 p-3 rounded-3xl bg-white/40 backdrop-blur-sm border shadow-sm transform hover:scale-105 transition-transform duration-300">
                        <Heart className="text-pink-500 size-9 animate-pulse" />
                        <BookOpen className="text-purple-500 size-9 animate-pulse" />
                    </div>
                    <div className="inline-block relative sm:p-4 pt-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent tracking-tighter leading-tight">
                            Interfaith Emotional Guidance
                        </h1>
                        <p className="sm:text-lg text-gray-500 max-w-3xl mx-auto pt-4 leading-relaxed font-light">
                            Share your feelings and receive compassionate
                            guidance through verses from the Bible and Quran.
                        </p>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto space-y-8 flex flex-col items-center mt-8">
                    {isLoading && <LoadingSpinner onCancel={handleCancel} />}
                    <EmotionInput
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />

                    {error && (
                        <div className="rounded-2xl bg-red-50 ring-1 ring-red-200/50 p-4 animate-fadeIn">
                            <div className="flex items-center gap-3 text-red-700">
                                <svg
                                    className="size-5 flex-shrink-0"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <div ref={responseRef}>
                        {response && <ResponseCard response={response} />}
                    </div>
                </main>
            </div>

            <div className="relative">
                <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-200 to-blue-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
                </div>
            </div>
        </div>
    );
}

export default App;
