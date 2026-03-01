"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Users, BookOpen, FileText, Video,
    Calendar, Bell, Activity, Search, LogOut
} from "lucide-react";

export default function FacultyDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Enforce Faculty-only routing
        if (!loading && (!user || profile?.role !== 'teacher')) {
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

    return (
        <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black pb-24">
            {/* Header Section */}
            <section className="pt-32 pb-12 px-6 border-b border-white/10 bg-gradient-to-b from-accent/5 to-transparent">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Faculty Dashboard
                        </h2>
                        <p className="text-neutral-400 text-lg">Manage your courses and evaluate students.</p>
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
                    <StatCard icon={BookOpen} value="8" label="Courses Teaching" color="text-accent" />
                    <StatCard icon={Users} value="245" label="Total Students" color="text-emerald-500" />
                    <StatCard icon={FileText} value="32" label="Pending Assignments" color="text-amber-500" />
                    <StatCard icon={Video} value="5" label="Scheduled Classes" color="text-blue-500" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column (Wider) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Management Table */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8 overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <BookOpen className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Course Management</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                            <th className="pb-4 font-semibold">Course Name</th>
                                            <th className="pb-4 font-semibold text-center">Students</th>
                                            <th className="pb-4 font-semibold">Avg. Progress</th>
                                            <th className="pb-4 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { name: "Complete Web Dev Bootcamp", students: 45, progress: 65, color: "bg-emerald-500" },
                                            { name: "Data Science with Python", students: 38, progress: 42, color: "bg-amber-500" },
                                            { name: "UI/UX Design Masterclass", students: 52, progress: 78, color: "bg-emerald-500" },
                                            { name: "Digital Marketing Strategy", students: 31, progress: 25, color: "bg-red-500" }
                                        ].map((course, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="py-4 pr-4 font-medium text-white">{course.name}</td>
                                                <td className="py-4 px-4 text-center text-neutral-300">{course.students}</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-1.5 w-24 bg-neutral-800 rounded-full overflow-hidden">
                                                            <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }} />
                                                        </div>
                                                        <span className="text-xs text-neutral-400">{course.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 pl-4 text-right">
                                                    <button className="px-4 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                                                        Manage
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Submissions */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <FileText className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Recent Submissions</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                            <th className="pb-4 font-semibold">Student</th>
                                            <th className="pb-4 font-semibold">Assignment</th>
                                            <th className="pb-4 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { name: "John Doe", task: "React Project", time: "2 hours ago" },
                                            { name: "Jane Smith", task: "Data Analysis", time: "5 hours ago" },
                                            { name: "Mike Johnson", task: "UX Research", time: "1 day ago" }
                                        ].map((sub, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="py-4 pr-4 text-white">
                                                    <div className="font-medium">{sub.name}</div>
                                                    <div className="text-xs text-neutral-500">{sub.time}</div>
                                                </td>
                                                <td className="py-4 px-4 text-neutral-300">{sub.task}</td>
                                                <td className="py-4 pl-4 text-right">
                                                    <button className="px-4 py-1.5 text-xs font-bold text-accent bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-full transition-colors">
                                                        Grade
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Interactive Scheduler */}
                        <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Calendar className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Schedule</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                                    <div className="flex justify-between items-start mb-1">
                                        <strong className="text-white">Web Development Class</strong>
                                        <span className="text-xs font-bold bg-blue-500 text-black px-2 py-0.5 rounded-full">Live</span>
                                    </div>
                                    <p className="text-blue-400 text-sm">Today @ 2:00 PM</p>
                                </div>

                                <div className="p-4 rounded-xl border border-white/5 bg-black">
                                    <strong className="text-neutral-200 block mb-1">Data Science Office Hours</strong>
                                    <p className="text-neutral-500 text-sm">Tomorrow @ 10:00 AM</p>
                                </div>

                                <div className="p-4 rounded-xl border border-white/5 bg-black">
                                    <strong className="text-neutral-200 block mb-1">UI/UX Workshop</strong>
                                    <p className="text-neutral-500 text-sm">Friday @ 3:00 PM</p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 border border-white/10 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors">
                                + Schedule Session
                            </button>
                        </div>

                        {/* Live Notifications Feed */}
                        <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Bell className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Activity Alert</h3>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm text-neutral-400 flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />
                                    New student enrolled in Web Development Course
                                </p>
                                <p className="text-sm text-neutral-400 flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                    Assignment deadline approaching for Data Science
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
