import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
    onCancel?: () => void;
}

export function LoadingSpinner({ onCancel }: LoadingSpinnerProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const expectedDuration = 10000;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(
                (elapsed / expectedDuration) * 100,
                98
            );
            setProgress(newProgress);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[2px]" />
            <div className="flex flex-col items-center justify-center gap-6 p-6 bg-white/95 pt-8 rounded-2xl shadow-lg border border-gray-200/50 backdrop-blur-xl relative max-w-sm w-full mx-4">
                {onCancel && (
                    <div className="absolute -top-3 -right-3 group">
                        <button
                            onClick={onCancel}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 border border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium text-gray-700 shadow-sm"
                            aria-label="Cancel generation"
                        >
                            <X className="size-4" />
                            Cancel
                        </button>
                        <div className="absolute pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Cancel generation
                        </div>
                    </div>
                )}
                <div className="relative">
                    <div className="absolute inset-0 blur-xl">
                        <Heart className="text-pink-400/30 size-7 animate-pulse [animation-duration:2s]" />
                    </div>
                    <Heart className="relative text-pink-500 size-7 animate-bounce [animation-duration:2s]" />
                    <div className="absolute inset-0">
                        <Heart className="text-pink-500/40 size-7 animate-ping [animation-duration:3s]" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3 w-56">
                    <div className="text-gray-700 font-medium text-center">
                        Generating your response...
                    </div>

                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="text-sm text-gray-500">
                        {Math.round(progress)}% complete
                    </div>
                </div>
            </div>
        </div>
    );
}
