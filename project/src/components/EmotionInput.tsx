import { Church, Moon, BookOpen, Send } from "lucide-react";
import React, { useState } from "react";

import type { Faith } from "../types";
import clsx from "clsx";

interface EmotionInputProps {
    onSubmit: (text: string, faith: Faith) => void;
    isLoading: boolean;
}

const faithOptions = [
    { value: "Both", icon: BookOpen },
    { value: "Christian", icon: Church },
    { value: "Islamic", icon: Moon },
] as const;

export function EmotionInput({ onSubmit, isLoading }: EmotionInputProps) {
    const [text, setText] = useState("");
    const [faith, setFaith] = useState<Faith>("Both");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text, faith);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-white rounded-3xl shadow-sm border transition-colors duration-200 focus-within:border-pink-200 focus-within:ring-pink-500 focus-within:ring-1 focus-within:border-2">
                <div className="flex flex-col gap-4">
                    <div className="relative flex items-center p-4">
                        <div className="flex-grow w-full text-center">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="How are you feeling?"
                                className="block w-full text-gray-900 placeholder:text-gray-500 outline-none bg-transparent resize-none py-2 rounded-lg"
                                rows={2}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="px-4 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
                            {faithOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFaith(option.value)}
                                    className={clsx(
                                        "px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2",
                                        "transition-all duration-300 ease-in-out transform",
                                        faith === option.value
                                            ? "bg-pink-500 text-white border-pink-500 shadow-md scale-105"
                                            : "bg-white text-gray-500 hover:bg-gray-50 hover:border-pink-200 hover:scale-102"
                                    )}
                                >
                                    <option.icon className="size-5" />
                                    <span
                                        className={clsx(
                                            faith === option.value
                                                ? ""
                                                : "hidden sm:block"
                                        )}
                                    >
                                        {option.value}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !text.trim()}
                            className={clsx(
                                "w-full sm:w-auto px-5 py-2 rounded-full transition-all duration-200 flex items-center justify-center gap-2",
                                isLoading || !text.trim()
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-pink-500 text-white hover:bg-pink-600 shadow-sm"
                            )}
                        >
                            <Send className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
