"use client";

import { useRef, useState } from "react";
import { courses } from "@/data/courses";
import { Clock, BookOpen, Users, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { RegionSelector } from "@/components/RegionSelector";
import ModuleSelectionModal from "@/components/ModuleSelectionModal";

export default function DeepDiveSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { addToCart, cartItems } = useCart();
    const { currency, setCurrency, convertPrice, symbol } = useCurrency();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCourse, setActiveCourse] = useState<any>(null);

    const handleAddToCartClick = (e: React.MouseEvent, course: any) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveCourse(course);
        setIsModalOpen(true);
    };

    const handleModalConfirm = (selectedModules: string[]) => {
        if (activeCourse) {
            addToCart(activeCourse, selectedModules);
        }
    };

    return (
        <section id="courses" className="max-w-7xl mx-auto py-24 px-6 relative z-10 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>
                        Recommended <span className="text-accent">Courses</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl font-light">
                        Explore our comprehensive programs designed to transform your career.
                    </p>
                </div>

                {/* Region Selector */}
                <RegionSelector />
            </div>

            {/* Courses Carousel - Infinite Marquee */}
            <div className="overflow-hidden w-full relative">
                {/* Gradient Fades for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 pb-10 w-max animate-scroll-left hover:[animation-play-state:paused] will-change-transform"
                >
                    {[...courses, ...courses].map((course, idx) => (
                        <div
                            key={`${course.id}-${idx}`}
                            className="relative w-[320px] md:w-[400px] h-[500px] shrink-0 rounded-[32px] overflow-hidden group bg-neutral-900 border border-neutral-800 flex flex-col justify-end p-8 cursor-pointer"
                        >
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                style={{ backgroundImage: `url(${course.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-4 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                <div className="flex justify-between items-center">
                                    <span className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium backdrop-blur-md border border-accent/20 uppercase tracking-wider">
                                        {course.category}
                                    </span>
                                    <span className="text-white font-bold text-xl">{symbol}{(convertPrice(course.price)).toLocaleString()}</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                    {course.name}
                                </h3>

                                <p className="text-neutral-300 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-neutral-400 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.level}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" />
                                        <span>{course.students.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => handleAddToCartClick(e, course)}
                                    className="mt-4 w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-accent hover:text-white transition-colors uppercase tracking-widest text-sm"
                                >
                                    {cartItems.some(item => item.id === course.id) ? "Customize / In Cart" : "Enroll / Customize"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Module Selection Modal */}
            {activeCourse && (
                <ModuleSelectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleModalConfirm}
                    course={activeCourse}
                />
            )}
        </section >
    );
}
