"use client";

import { useState } from "react";
import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { courses } from "@/data/courses";
import { Clock, BookOpen, Users, ArrowRight, Filter, Star } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { RegionSelector } from "@/components/RegionSelector";

export default function CoursesPage() {
    const { currency, setCurrency, convertPrice, symbol } = useCurrency();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<number>(100);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('popular');

    let filteredCourses = courses.filter(course => {
        const matchCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchPrice = course.price <= priceRange;
        const matchLanguage = selectedLanguage === 'all' || course.languages?.includes(selectedLanguage) || (!course.languages && selectedLanguage === 'English');
        const matchRating = course.rating >= selectedRating;

        return matchCategory && matchPrice && matchLanguage && matchRating;
    });

    filteredCourses = filteredCourses.sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.students - a.students; // default: popular
    });

    const categories = [
        { id: 'all', label: 'All Courses' },
        { id: 'programming', label: 'Programming' },
        { id: 'data-science', label: 'Data Science' },
        { id: 'design', label: 'Design' },
        { id: 'business', label: 'Business' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'mobile', label: 'Mobile App' },
    ];
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Explore <span className="text-accent">Programs</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Comprehensive, industry-aligned courses designed to launch or accelerate your career.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-32">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1 border-r border-neutral-800/50 pr-8">
                            <div className="sticky top-32">
                                <div className="flex items-center gap-2 mb-8 text-white justify-between">
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-accent" />
                                        <h2 className="text-xl font-bold uppercase tracking-wider">Filters</h2>
                                    </div>
                                    <RegionSelector />
                                </div>

                                {/* Category Filter */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Category</h3>
                                    <div className="flex flex-col gap-3">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`text-left text-sm transition-colors ${selectedCategory === cat.id ? 'text-accent font-bold' : 'text-neutral-500 hover:text-white'}`}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Price / {symbol}</h3>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                                        <span>{symbol}0</span>
                                        <span>Up to {symbol}{(convertPrice(priceRange)).toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Rating</h3>

                                    <div className="flex flex-col gap-4">
                                        <div
                                            className="flex gap-1"
                                            onMouseLeave={() => setHoveredRating(0)}
                                        >
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setSelectedRating(star)}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-6 h-6 transition-colors duration-200 ${(hoveredRating || selectedRating) >= star ? 'fill-accent text-accent' : 'text-neutral-700'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <span className="text-neutral-400">
                                                {selectedRating > 0 ? `${selectedRating} Stars & Up` : 'Select a rating'}
                                            </span>
                                            {selectedRating > 0 && (
                                                <button
                                                    onClick={() => setSelectedRating(0)}
                                                    className="text-neutral-500 hover:text-white transition-colors uppercase tracking-wider text-[10px]"
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Language Filter */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Language</h3>
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl focus:ring-accent focus:border-accent block p-3 outline-none"
                                    >
                                        <option value="all">All Languages</option>
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="lg:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-neutral-400 text-sm">Showing {filteredCourses.length} courses</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Sort By:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl focus:ring-accent focus:border-accent block p-2 outline-none font-medium"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            {filteredCourses.length === 0 ? (
                                <div className="text-center py-20 text-neutral-500">
                                    No courses found matching your criteria.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredCourses.map((course) => (
                                        <Link
                                            href={`/courses/${course.id}`}
                                            key={course.id}
                                            className="group relative bg-neutral-900 border border-neutral-800 rounded-[32px] overflow-hidden flex flex-col hover:border-accent/50 transition-colors"
                                        >
                                            <div className="aspect-[4/3] relative overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                    style={{ backgroundImage: `url(${course.image})` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                                                <div className="absolute top-6 left-6">
                                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                                                        {course.category}
                                                    </span>
                                                </div>
                                                <div className="absolute top-6 right-6">
                                                    <div className="px-3 py-1.5 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-accent/20">
                                                        {symbol}{(convertPrice(course.price)).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-8 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
                                                    {course.name}
                                                </h3>
                                                <p className="text-neutral-400 font-light text-sm line-clamp-2 mb-5 flex-grow">
                                                    {course.description}
                                                </p>

                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-accent text-accent' : 'text-neutral-800'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-white font-bold text-sm">{course.rating.toFixed(1)}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-y-4 text-xs text-neutral-500 mb-8">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-neutral-400" />
                                                        <span>{course.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-neutral-400" />
                                                        <span>{course.level}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-neutral-400" />
                                                        <span>{course.students.toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-800">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">
                                                            {course.instructor.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-white">{course.instructor}</span>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-accent transition-colors group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
