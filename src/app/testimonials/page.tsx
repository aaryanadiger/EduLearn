"use client";

import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { testimonials } from "@/data/testimonials";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                    <div className="text-center mb-24">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Student <span className="text-accent">Success Stories</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Real stories from students who transformed their careers with EduLearn.
                        </p>
                    </div>

                    <div className="overflow-hidden w-full relative mb-12">
                        {/* Gradient Fades for edges */}
                        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none"></div>
                        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none"></div>

                        <div className="flex gap-8 w-max pb-10 animate-scroll-right hover:[animation-play-state:paused] will-change-transform">
                            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
                                <div
                                    key={`${testimonial.id}-${i}`}
                                    className="w-[320px] md:w-[450px] h-[450px] shrink-0 bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] flex flex-col justify-between hover:border-accent/50 transition-colors"
                                >
                                    <div className="flex-1 overflow-hidden flex flex-col">
                                        <Quote className="text-accent w-10 h-10 mb-6 opacity-30 shrink-0" />
                                        <div className="flex gap-1 mb-6 text-accent shrink-0">
                                            {[...Array(testimonial.stars)].map((_, idx) => (
                                                <Star key={idx} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 mb-6">
                                            <p className="text-lg text-neutral-300 leading-relaxed font-light">
                                                &quot;{testimonial.text}&quot;
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-auto border-t border-neutral-800/50 pt-6 shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg font-bold text-white border border-neutral-700">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-md text-white">{testimonial.name}</h4>
                                            <p className="text-xs text-accent">{testimonial.role}</p>
                                            <p className="text-xs text-neutral-500 mt-1">{testimonial.course}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
