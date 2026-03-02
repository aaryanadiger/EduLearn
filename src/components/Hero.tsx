"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-neutral-900/50 rounded-full animate-pulse blur-3xl absolute" />
        </div>
    )
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const splineRef = useRef<HTMLDivElement>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isSplineVisible, setIsSplineVisible] = useState(true);
    const [isPowerfulDevice, setIsPowerfulDevice] = useState(true);

    const fullText = "EDULEARN";

    useEffect(() => {
        // Hardware check on mount (disable on weak mobile devices/laptops)
        setIsPowerfulDevice(
            typeof window !== 'undefined' &&
            window.innerWidth >= 768 &&
            (navigator.hardwareConcurrency || 4) >= 4
        );
    }, []);

    const onSplineLoad = () => {
        setIsLoaded(true);
    };

    // Typewriter effect after load
    useEffect(() => {
        if (!isLoaded) return;

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);

        return () => clearInterval(typingInterval);
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded || displayedText !== fullText) return;

        // Ensure elements exist
        const container = containerRef.current;
        const text = textRef.current;
        const spline = splineRef.current;

        if (!container || !text || !spline) return;

        // Initial State for Scroll Trigger (we let React handle the typing, now we handle the scroll out)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=100%", // Scroll distance
                scrub: 1,
                pin: true,
            }
        });

        // The Transformation (Hero -> Nav State)
        tl.to(text, {
            scale: 0.08, // Shrink to logo size
            y: "40vh", // Move down towards bottom nav
            opacity: 0, // Fade out as the real nav logo fades in
            ease: "power1.inOut"
        }, 0)
            .to(spline, {
                scale: 0.2, // Shrink cube
                yPercent: -20,
                opacity: 0, // Fade out the 3D model
                ease: "power1.inOut"
            }, 0);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isLoaded, displayedText]);

    // Viewport Culling Observer to aggressively free massive 1GB Memory loads when the big 3D canvas is out of screen
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If it is off-screen, completely kill the WebGL context
                setIsSplineVisible(entry.isIntersecting);
            },
            {
                // Unmount only when it is 2 full screens away (200%) to prevent rapid remount stuttering
                rootMargin: "200% 0px 200% 0px",
                threshold: 0
            }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-primary flex items-center justify-center">

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center px-10 md:px-32 z-20 pointer-events-none">

                <div className="flex justify-center items-center w-full h-full">
                    <h1
                        ref={textRef}
                        className="text-[14vw] md:text-[10vw] leading-none font-bold text-white/80 backdrop-blur-[2px] uppercase origin-center select-none tracking-tighter flex items-center"
                        style={{ fontFamily: 'var(--font-syncopate)' }}
                    >
                        <span>{displayedText}</span>
                        <span className="animate-ping bg-accent w-[2vw] h-[10vw] md:w-[1vw] md:h-[7vw] ml-2 md:ml-4 inline-block rounded-sm"></span>
                    </h1>
                </div>
            </div>

            {/* 3D Scene Background Centerpiece - Only mount if user device is strong and scene is in viewport */}
            {isPowerfulDevice && isSplineVisible && (
                <div
                    ref={splineRef}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center will-change-transform transform-gpu"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <Spline
                        scene="https://prod.spline.design/9XHUomAQ1KHtEt6g/scene.splinecode"
                        onLoad={onSplineLoad}
                        className="w-full h-full"
                        style={{ width: '100%', height: '100%' }}
                    />
                    {/* Watermark Cover - Since CSS cannot pierce the Shadow DOM easily, we use a physical overlay patch matches the background */}
                    <div className="absolute bottom-4 right-4 w-[160px] h-[45px] bg-[#141414] rounded-md z-50 pointer-events-none" />
                </div>
            )}

        </div>
    );
}
