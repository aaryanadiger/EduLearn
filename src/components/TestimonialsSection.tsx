"use client";

import { useRef, useState, useEffect } from "react";
import { testimonials as staticTestimonials, Testimonial } from "@/data/testimonials";
import { courses } from "@/data/courses";
import { Star, Quote } from "lucide-react";
import { getTopReviews } from "@/lib/db";

export default function TestimonialsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(staticTestimonials);

    useEffect(() => {
        getTopReviews(10).then(reviews => {
            const mappedReviews: Testimonial[] = reviews.map(r => {
                const course = courses.find(c => c.id === r.courseId);
                return {
                    id: r.id || Math.random().toString(),
                    name: r.userName,
                    role: "Student",
                    course: course ? course.name : "EduLearn Course",
                    text: r.text,
                    stars: r.rating
                };
            });
            // Only prepend if we found any dynamic top reviews
            if (mappedReviews.length > 0) {
                setAllTestimonials([...mappedReviews, ...staticTestimonials]);
            }
        });
    }, []);

    return (
        <section
            id="testimonials"
            className="bg-black text-white py-32 flex flex-col justify-center overflow-hidden border-t border-neutral-800 relative z-10 w-full"
        >
            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <span className="text-accent uppercase tracking-widest font-bold text-sm mb-2 block">Voices of Success</span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                        What Our Students Say.
                    </h2>
                </div>

                {/* Themed Arrow Navigation - Removed */}
            </div>

            <div className="w-full relative overflow-hidden">
                {/* Gradient Fades for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 w-max pb-10 animate-scroll-right hover:[animation-play-state:paused] will-change-transform"
                >
                    {[...allTestimonials, ...allTestimonials].map((testimonial, i) => (
                        <div
                            key={`${testimonial.id}-${i}`}
                            className={`w-[350px] md:w-[450px] h-[450px] shrink-0 p-10 rounded-[32px] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 border border-neutral-800 ${i % 2 !== 0 ? 'bg-neutral-900' : 'bg-neutral-950'}`}
                        >
                            <div className="flex-1 overflow-hidden flex flex-col">
                                <Quote className="text-accent w-10 h-10 mb-6 opacity-30 shrink-0" />
                                <div className="flex gap-1 mb-6 text-accent shrink-0">
                                    {[...Array(testimonial.stars)].map((_, idx) => (
                                        <Star key={idx} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
                                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8 shrink-0 border-t border-neutral-800/50 pt-6">
                                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-xl font-bold text-white border border-neutral-700">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-accent line-clamp-1">{testimonial.role}</p>
                                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{testimonial.course}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Navigation Controls - Removed */}
        </section>
    );
}
