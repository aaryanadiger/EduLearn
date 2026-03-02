"use client";

import { useParams } from "next/navigation";
import { courses } from "@/data/courses";
import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Clock, BookOpen, Users, Globe, CheckCircle2, PlayCircle, Star } from "lucide-react";

export default function CourseDetail() {
    const params = useParams();
    const courseId = params.id as string;
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <h1 className="text-4xl font-bold">Course Not Found</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                {/* Hero Section */}
                <div className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto border-b border-neutral-800 mb-20">
                    <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-accent/10 to-transparent -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-white uppercase tracking-wider mb-6 inline-block">
                                {course.category}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight text-white">
                                {course.name}
                            </h1>

                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300 font-medium mb-12">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-accent" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-accent" />
                                    <span>{course.level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span>{course.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-accent" />
                                    <span>{course.languages.join(", ")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Card */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundImage: `url(${course.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-end pt-40">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-5xl font-bold text-white">${course.price}</span>
                                    <div className="flex items-center gap-1 text-accent">
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <span className="text-white ml-2 text-sm">4.9 (2k+ reviews)</span>
                                    </div>
                                </div>

                                <button className="w-full py-5 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent-light transition-colors mb-4 flex items-center justify-center gap-2 group/btn">
                                    Enroll Now
                                    <PlayCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                                </button>
                                <p className="text-center text-xs text-neutral-500 font-light">30-day money-back guarantee. Full lifetime access.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="px-6 max-w-7xl mx-auto pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="col-span-2">
                            <h2 className="text-3xl font-bold text-white mb-8">What You&apos;ll Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                {course.modules.slice(0, 4).map((mod, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                        <span className="text-neutral-300 font-light">{mod}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-8">Course Curriculum</h2>
                            <div className="space-y-4">
                                {course.modules.map((mod, i) => (
                                    <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between hover:bg-neutral-800 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-neutral-500 font-bold text-sm">
                                                {i + 1}
                                            </div>
                                            <span className="text-white font-medium">{mod}</span>
                                        </div>
                                        <PlayCircle className="w-5 h-5 text-neutral-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Instructor</h3>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-2xl font-bold text-white">
                                    {course.instructor.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{course.instructor}</h4>
                                    <p className="text-sm text-neutral-400 font-light">Industry Expert</p>
                                </div>
                            </div>

                            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
                                <h3 className="font-bold text-white mb-6">This course includes:</h3>
                                <ul className="space-y-4 text-sm text-neutral-400 font-light">
                                    <li className="flex items-center gap-3"><PlayCircle className="w-4 h-4 text-accent" /> 40 hours of on-demand video</li>
                                    <li className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-accent" /> 12 interactive coding exercises</li>
                                    <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-accent" /> English & Hindi captions</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent" /> Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
