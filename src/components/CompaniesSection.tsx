"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companies = [
    "Google", "Microsoft", "Meta", "Amazon", "Apple", "Netflix", "Tesla", "Adobe"
];

export default function CompaniesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        // Fade and scale in animation on scroll
        gsap.fromTo(
            content,
            { opacity: 0, scale: 0.9, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Start when top of section hits 80% down the viewport
                    toggleActions: "play none none reverse",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-primary relative z-10 w-full overflow-hidden border-y border-neutral-900"
        >
            <div ref={contentRef} className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
                <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase mb-10 text-center">
                    Trusted by industry leaders worldwide
                </p>

                {/* Infinite Marquee for Companies */}
                <div className="w-full relative overflow-hidden">
                    {/* Gradient Fades for edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

                    <div className="flex gap-16 md:gap-32 w-max pb-4 animate-scroll-right will-change-transform">
                        {/* Duplicate lists for seamless looping */}
                        {[...companies, ...companies, ...companies].map((company, i) => (
                            <div
                                key={`${company}-${i}`}
                                className="text-2xl md:text-4xl font-bold text-neutral-800 shrink-0 font-sans tracking-tight"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
