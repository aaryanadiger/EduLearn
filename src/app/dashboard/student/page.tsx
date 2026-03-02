"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    BookOpen, Award, Clock, CheckCircle2, TrendingUp,
    PlayCircle, ArrowRight, Calendar, AlertCircle, LogOut
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || profile?.role !== 'student')) {
            router.push('/login');
        }
    }, [user, profile, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    const StatCard = ({ icon: Icon, value, label, color }: any) => (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 text-center hover:border-neutral-700 transition-colors">
            <Icon className={`w-8 h-8 mx-auto mb-4 ${color}`} />
            <h4 className={`text-3xl font-black mb-1 ${color}`}>{value}</h4>
            <p className="text-neutral-400 text-sm font-medium">{label}</p>
        </div>
    );

    const courses = [
        { title: "Complete Web Development Bootcamp", progress: 75, total: 40, completed: 30, color: "bg-emerald-500" },
        { title: "Data Science with Python", progress: 45, total: 45, completed: 20, color: "bg-amber-500" },
        { title: "UI/UX Design Masterclass", progress: 100, total: 20, completed: 20, color: "bg-emerald-500" },
        { title: "Digital Marketing Strategy", progress: 15, total: 33, completed: 5, color: "bg-red-500" }
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black pb-24">
            {/* Header Section */}
            <section className="pt-32 pb-12 px-6 border-b border-white/10 bg-gradient-to-b from-accent/5 to-transparent">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Welcome Back, <span className="text-accent">{profile?.name || user?.displayName || 'Student'}</span>
                        </h2>
                        <p className="text-neutral-400 text-lg">Continue your learning journey today.</p>
                    </div>
                    <button
                        onClick={async () => {
                            await logout();
                            router.push('/');
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors rounded-full text-white/70 hover:text-white shrink-0"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pt-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard icon={BookOpen} value="5" label="Courses Enrolled" color="text-accent" />
                    <StatCard icon={Award} value="3" label="Certificates Earned" color="text-emerald-500" />
                    <StatCard icon={Clock} value="42" label="Hours Learned" color="text-amber-500" />
                    <StatCard icon={CheckCircle2} value="7" label="Assignments Done" color="text-blue-500" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column (Wider) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Learning Journey Chart */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <TrendingUp className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Your Learning Journey</h3>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: "Web Development", progress: 75, color: "bg-blue-500" },
                                    { name: "Data Science", progress: 45, color: "bg-amber-500" },
                                    { name: "UI/UX Design", progress: 100, color: "bg-emerald-500" }
                                ].map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-medium text-neutral-300">{skill.name}</span>
                                            <span className="text-sm font-bold text-white">{skill.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                                style={{ width: `${skill.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* My Courses Grid */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <BookOpen className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">My Courses</h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {courses.map((course, idx) => (
                                    <div key={idx} className="bg-black/50 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors group">
                                        <h4 className="font-bold text-lg mb-4 line-clamp-2 h-14">{course.title}</h4>
                                        <div className="mb-4">
                                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                                                <div
                                                    className={`h-full ${course.color} rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-neutral-500">
                                                <span>{course.completed} of {course.total} hours</span>
                                                <span className="font-bold text-white">{course.progress}%</span>
                                            </div>
                                        </div>
                                        <button className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${course.progress === 100
                                            ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                            : 'bg-white/5 text-white hover:bg-white hover:text-black'
                                            }`}>
                                            {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Upcoming Tasks */}
                        <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-8 sticky top-32">
                            <div className="flex items-center gap-3 mb-8">
                                <Calendar className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Upcoming Tasks</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-white mb-1">Quiz: JavaScript Basics</h5>
                                            <p className="text-xs text-red-400 font-medium">Due: Tomorrow at 5:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex gap-3">
                                        <BookOpen className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-white mb-1">Assignment: React Project</h5>
                                            <p className="text-xs text-neutral-400">Due: 3 days</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex gap-3">
                                        <TrendingUp className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-white mb-1">Project: Portfolio Website</h5>
                                            <p className="text-xs text-neutral-400">Due: 1 week</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-white mb-1 text-emerald-500/80 line-through">HTML/CSS Final Test</h5>
                                            <p className="text-xs text-emerald-500">Completed - Score: 95%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
