"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { BookOpen, Award, Clock, CheckSquare, TrendingUp, AlertCircle, FileText, Code, CheckCircle2, PlayCircle, Search, Video, Briefcase, History, Calendar } from "lucide-react";

export default function StudentPanelPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white flex flex-col">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Student Dashboard</h1>
                            <p className="text-neutral-400 font-light text-lg">Welcome back! Continue your learning journey</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                            View Profile
                        </button>
                    </div>

                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: "Courses Enrolled", value: "5", icon: BookOpen, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
                            { title: "Certificates Earned", value: "3", icon: Award, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
                            { title: "Hours Learned", value: "42", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                            { title: "Assignments Done", value: "7", icon: CheckSquare, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-[24px] flex items-center gap-6 group hover:border-neutral-700 transition-colors">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${stat.bg} ${stat.color} ${stat.border}`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
                                    <p className="text-sm text-neutral-500 font-medium">{stat.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                        {/* Learning Journey */}
                        <div className="lg:col-span-8">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 h-full">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <TrendingUp className="text-accent" /> Your Learning Journey
                                </h3>
                                <div className="space-y-8">
                                    {[
                                        { name: "Web Development", progress: 75, color: "bg-accent" },
                                        { name: "Data Science", progress: 45, color: "bg-yellow-500" },
                                        { name: "UI/UX Design", progress: 100, color: "bg-green-500" },
                                    ].map((course, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-bold">{course.name}</span>
                                                <span className="text-sm font-black text-neutral-500">{course.progress}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                                                <div className={`h-full rounded-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Tasks */}
                        <div className="lg:col-span-4">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 h-full">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <CheckSquare className="text-accent" /> Upcoming Tasks
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm mb-1 text-red-500">Quiz: JavaScript Basics</h4>
                                            <p className="text-xs text-red-500/70">Due: Tomorrow at 5:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex items-start gap-3">
                                        <FileText className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">Assignment: React Project</h4>
                                            <p className="text-xs text-neutral-500">Due: 3 days</p>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex items-start gap-3">
                                        <Code className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">Project: Portfolio Website</h4>
                                            <p className="text-xs text-neutral-500">Due: 1 week</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm mb-1 text-green-500">HTML/CSS Final Test</h4>
                                            <p className="text-xs text-green-500/70">Completed - Score: 95%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* My Courses */}
                        <div className="lg:col-span-8">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 h-full">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <BookOpen className="text-accent" /> My Courses
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Complete Web Dev Bootcamp", hours: "30 of 40 hours", p: 75, color: "bg-accent" },
                                        { title: "Data Science with Python", hours: "20 of 45 hours", p: 45, color: "bg-yellow-500" },
                                        { title: "UI/UX Design Masterclass", hours: "Completed", p: 100, color: "bg-green-500", done: true },
                                        { title: "Digital Marketing Strategy", hours: "5 of 33 hours", p: 15, color: "bg-red-500" },
                                    ].map((course, i) => (
                                        <div key={i} className="bg-neutral-950 border border-neutral-800 p-6 rounded-[24px] flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold mb-4 line-clamp-2 min-h-[48px]">{course.title}</h4>
                                                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 mb-3">
                                                    <div className={`h-full rounded-full ${course.color}`} style={{ width: `${course.p}%` }}></div>
                                                </div>
                                                <p className="text-xs text-neutral-500 font-medium">{course.hours}</p>
                                            </div>
                                            <button className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition-colors ${course.done ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-white text-black hover:bg-neutral-200'}`}>
                                                {course.done ? "View Certificate" : "Continue Learning"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Quick Actions */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <PlayCircle className="text-accent" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent transition-colors group">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><Search className="w-4 h-4" /> Browse Courses</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent transition-colors group">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><Video className="w-4 h-4" /> Join Live Class</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent transition-colors group">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><CheckSquare className="w-4 h-4" /> View Assignments</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent transition-colors group">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><Briefcase className="w-4 h-4" /> Career Guidance</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <History className="text-accent" /> Recent Activity
                                </h3>
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:w-px before:bg-neutral-800">
                                    {[
                                        { time: "2 hours ago", text: "Completed 'JavaScript Fundamentals' lesson" },
                                        { time: "1 day ago", text: "Submitted assignment for 'Data Science' course" },
                                        { time: "3 days ago", text: "Earned certificate for 'UI/UX Design' course" },
                                        { time: "1 week ago", text: "Enrolled in 'Digital Marketing Strategy' course" },
                                    ].map((act, i) => (
                                        <div key={i} className="relative flex gap-4 items-start z-10">
                                            <div className="w-5 h-5 rounded-full bg-neutral-950 border-4 border-neutral-900 shrink-0 mt-0.5"></div>
                                            <div>
                                                <p className="text-xs text-neutral-500 font-bold mb-1 uppercase tracking-wider">{act.time}</p>
                                                <p className="text-sm font-light text-neutral-300">{act.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Deadlines */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Calendar className="text-accent" /> Upcoming Deadlines
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="font-bold">Web Dev Project</span>
                                        <span className="text-red-500 font-black text-xs uppercase tracking-wider">Tomorrow</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="font-bold">Data Science Quiz</span>
                                        <span className="text-yellow-500 font-black text-xs uppercase tracking-wider">3 days</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="font-bold">Marketing Assignment</span>
                                        <span className="text-green-500 font-black text-xs uppercase tracking-wider">1 week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
