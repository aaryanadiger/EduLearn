"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Code, Palette, Database, Briefcase, Megaphone, Smartphone, Download, Star } from "lucide-react";

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-24 relative">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 relative inline-block">
                            Resource <span className="text-accent">Library</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Access exclusive learning materials and tools
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Code, title: "Programming", desc: "Code examples & templates", count: "125", color: "text-blue-500" },
                                { icon: Palette, title: "Design", desc: "Design assets & tools", count: "89", color: "text-purple-500" },
                                { icon: Database, title: "Data Science", desc: "Datasets & analysis tools", count: "67", color: "text-green-500" },
                                { icon: Briefcase, title: "Business", desc: "Case studies & guides", count: "45", color: "text-yellow-500" },
                                { icon: Megaphone, title: "Marketing", desc: "Strategies & templates", count: "78", color: "text-red-500" },
                                { icon: Smartphone, title: "Mobile Dev", desc: "App templates", count: "52", color: "text-teal-500" },
                            ].map((cat, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl text-center hover:bg-neutral-800 group transition-colors cursor-pointer">
                                    <cat.icon className={`w-12 h-12 ${cat.color} mx-auto mb-6 group-hover:scale-110 transition-transform`} />
                                    <h3 className="text-xl font-bold mb-2 text-white">{cat.title}</h3>
                                    <p className="text-neutral-400 text-sm mb-6">{cat.desc}</p>
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-medium">
                                        {cat.count} Resources
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Resources */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Featured Resources</h2>
                            <p className="text-neutral-400 font-light">Most popular and highly-rated resources</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { tag: "Programming", title: "React Component Library", desc: "A comprehensive collection of reusable React components.", rating: 4.8, dls: "2,340" },
                                { tag: "Design", title: "UI Design System", desc: "Complete design system with components, patterns, and guidelines.", rating: 4.9, dls: "1,890" },
                                { tag: "Data Science", title: "Machine Learning Dataset", desc: "Curated dataset for practicing ML algorithms.", rating: 4.7, dls: "3,120" },
                                { tag: "Business", title: "Business Plan Template", desc: "Professional business plan template with financial projections.", rating: 4.6, dls: "1,567" },
                                { tag: "Marketing", title: "Social Media Toolkit", desc: "Complete toolkit with templates, calendars, and analytics.", rating: 4.8, dls: "2,789" },
                                { tag: "Mobile", title: "Mobile App UI Kit", desc: "Modern UI components and screens for mobile app projects.", rating: 4.7, dls: "1,934" },
                            ].map((res, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl flex flex-col justify-between hover:border-neutral-700 transition-colors group relative overflow-hidden">
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent">{res.tag}</span>
                                            <div className="flex items-center gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                                                <span className="text-xs font-medium text-white">{res.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-white leading-tight">{res.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed mb-8">{res.desc}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t border-neutral-800/50 mt-auto">
                                        <div className="text-xs text-neutral-500 font-medium">
                                            {res.dls} Downloads
                                        </div>
                                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-accent hover:text-white transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
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
