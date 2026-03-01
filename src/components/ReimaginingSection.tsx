"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReimaginingSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scribbleRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const featureTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const scribble = scribbleRef.current;
        const text = textRef.current;
        const imageBox = imageBoxRef.current;
        const featureText = featureTextRef.current;

        if (!section || !scribble || !text || !imageBox || !featureText) return;

        // Setup SVG Path for drawing animation
        const length = scribble.getTotalLength();
        gsap.set(scribble, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
        });

        // Scribble Animation
        gsap.to(scribble, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%", // Start when title is 80% down the viewport
                end: "bottom 50%",
                scrub: 1, // Smooth scrub
            },
            strokeDashoffset: 0,
            ease: "none"
        });

        // Reveal animations for the image box and secondary text
        gsap.fromTo(imageBox,
            { y: 100, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: imageBox,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );

        gsap.fromTo(featureText,
            { x: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: imageBox,
                    start: "top 85%",
                },
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="relative z-10 bg-white text-black rounded-t-[40px] -mt-10 pt-32 pb-20 px-6 min-h-screen border-t border-neutral-200 shadow-2xl">
            <section id="about-us" className="max-w-6xl mx-auto py-10">
                <h2 ref={textRef} className="text-6xl md:text-8xl font-bold mb-10 tracking-tight leading-tight">
                    <span className="relative inline-block z-10">
                        Reimagining
                        <svg className="absolute w-[110%] h-6 -bottom-2 -left-2 text-accent -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path
                                ref={scribbleRef}
                                d="M 0 10 Q 25 20 50 10 T 100 10"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                fill="none"
                                className="opacity-0"
                            />
                        </svg>
                    </span>{" "}
                    <br className="hidden md:block" />
                    Education.
                </h2>
                <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed max-w-4xl font-light">
                    Traditional learning is static. We are building a dynamic, living ecosystem where knowledge adapts to you.
                    Interactive, engaging, and built for the future.
                </p>
            </section>

            <section id="features" className="max-w-6xl mx-auto py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div
                    ref={imageBoxRef}
                    className="bg-neutral-100 rounded-[40px] h-[500px] overflow-hidden relative shadow-lg group"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold">Immersive Learning</h4>
                    </div>
                </div>

                <div ref={featureTextRef} className="flex flex-col justify-center">
                    <span className="text-accent uppercase tracking-widest font-bold mb-4">Features</span>
                    <h3 className="text-5xl font-bold mb-8 tracking-tight">Interactive by design.</h3>
                    <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                        No more passive watching. Engage with 3D models, real-time code execution, and AI-driven feedback loops.
                        Our platform reacts to your progress, adjusting the difficulty and learning style to match yours perfectly.
                    </p>
                    <button className="self-start px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                        Explore Features
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
}
