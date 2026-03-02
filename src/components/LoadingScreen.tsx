"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const codeLines = [
    "import { Future } from '@edulearnr/core';",
    "import { Knowledge } from 'brain';",
    "// Initializing neural pathways...",
    "const system = new EducationSystem();",
    "await system.optimize({ speed: '100x' });",
    "// Rendering 3D Environment...",
    "<EduLearnr version='2.0' />",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentLine = 0;

        const typeLine = () => {
            if (currentLine >= codeLines.length) {
                // Animation sequence complete
                setTimeout(() => {
                    sessionStorage.setItem("edulearnr_visited", "true");
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: onComplete
                    });
                }, 800);
                return;
            }

            setLines(prev => [...prev, codeLines[currentLine]]);
            currentLine++;

            // Random typing delay for realism
            setTimeout(typeLine, Math.random() * 300 + 400);
        };

        // Check if user has already visited in this session
        const hasVisited = sessionStorage.getItem("edulearnr_visited");
        if (hasVisited) {
            onComplete();
            return;
        }

        const timeout = setTimeout(typeLine, 500);
        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-accent font-mono text-sm sm:text-base p-8 w-screen h-screen m-0"
        >
            <div className="max-w-xl w-full" ref={textRef}>
                {lines.map((line, index) => (
                    <div key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                        <span className="opacity-50 mr-4">{index + 1}</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse mt-2">_</div>
            </div>

            <div className="absolute bottom-8 right-8 text-neutral-500 text-xs">
                Compiling modules... {Math.min(lines.length / codeLines.length * 100, 100).toFixed(0)}%
            </div>

            <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
