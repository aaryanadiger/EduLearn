"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { BookOpen, Users, FileText, Video, PlayCircle, Calendar, Bell, Plus, BarChart2 } from "lucide-react";

export default function FacultyPanelPage() {
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
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Faculty Dashboard</h1>
                            <p className="text-neutral-400 font-light text-lg">Welcome back! Manage your courses and students</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                            View Profile
                        </button>
                    </div>

                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: "Courses Teaching", value: "8", icon: BookOpen, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
                            { title: "Total Students", value: "245", icon: Users, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
                            { title: "Pending Assignments", value: "32", icon: FileText, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                            { title: "Scheduled Classes", value: "5", icon: Video, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
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

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8 flex flex-col gap-8">

                            {/* My Courses Table */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <BookOpen className="text-accent" /> My Courses
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        { name: "Complete Web Development Bootcamp", students: "45", progress: 65, color: "bg-green-500" },
                                        { name: "Data Science with Python", students: "38", progress: 42, color: "bg-yellow-500" },
                                        { name: "UI/UX Design Masterclass", students: "52", progress: 78, color: "bg-green-500" },
                                        { name: "Digital Marketing Strategy", students: "31", progress: 25, color: "bg-red-500" },
                                    ].map((course, i) => (
                                        <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-white mb-2">{course.name}</h4>
                                                <div className="flex items-center gap-4 text-sm text-neutral-400">
                                                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students} Students</span>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-48">
                                                <div className="flex justify-between items-center mb-1 text-xs text-neutral-500">
                                                    <span>Course Progress</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                                                    <div className={`h-full rounded-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                                <button className="w-full md:w-auto bg-white text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                                                    Manage
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Submissions */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <FileText className="text-accent" /> Recent Submissions
                                </h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="text-neutral-500 border-b border-neutral-800">
                                            <tr>
                                                <th className="pb-4 font-medium px-4">Student</th>
                                                <th className="pb-4 font-medium px-4">Assignment</th>
                                                <th className="pb-4 font-medium px-4">Course</th>
                                                <th className="pb-4 font-medium px-4">Submitted</th>
                                                <th className="pb-4 font-medium text-right px-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { student: "John Doe", assignment: "React Project", course: "Web Development", time: "2 hours ago" },
                                                { student: "Jane Smith", assignment: "Data Analysis", course: "Data Science", time: "5 hours ago" },
                                                { student: "Mike Johnson", assignment: "UX Research", course: "UI/UX Design", time: "1 day ago" },
                                            ].map((sub, i) => (
                                                <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                                                    <td className="py-5 px-4 font-bold text-white">{sub.student}</td>
                                                    <td className="py-5 px-4 font-medium">{sub.assignment}</td>
                                                    <td className="py-5 px-4 text-neutral-400">{sub.course}</td>
                                                    <td className="py-5 px-4 text-neutral-500">{sub.time}</td>
                                                    <td className="py-5 px-4 text-right">
                                                        <button className="bg-green-500/10 text-green-500 font-bold px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-colors">
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

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Quick Actions */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <PlayCircle className="text-accent" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent group transition-colors">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><Plus className="w-4 h-4" /> Create Assignment</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent group transition-colors">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><Video className="w-4 h-4" /> Schedule Class</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent group transition-colors">
                                        <span className="flex items-center gap-3 font-medium text-sm group-hover:text-accent"><BarChart2 className="w-4 h-4" /> View Analytics</span>
                                    </button>
                                </div>
                            </div>

                            {/* Upcoming Schedule */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Calendar className="text-accent" /> Upcoming Schedule
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Web Development - Live Class", time: "Today at 2:00 PM", color: "border-l-accent" },
                                        { title: "Data Science - Office Hours", time: "Tomorrow at 10:00 AM", color: "border-l-yellow-500" },
                                        { title: "UI/UX - Workshop", time: "Friday at 3:00 PM", color: "border-l-green-500" },
                                        { title: "Marketing - Guest Lecture", time: "Next Monday at 11:00 AM", color: "border-l-blue-500" },
                                    ].map((sched, i) => (
                                        <div key={i} className={`p-4 rounded-r-2xl bg-neutral-950 border border-l-4 ${sched.color} border-y-neutral-800 border-r-neutral-800`}>
                                            <h4 className="font-bold text-sm mb-1 text-white">{sched.title}</h4>
                                            <p className="text-xs text-neutral-500">{sched.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Bell className="text-accent" /> Notifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></span>
                                        <p className="text-sm text-neutral-300">New student enrolled in Web Development course</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-yellow-500 shrink-0"></span>
                                        <p className="text-sm text-neutral-300">Assignment deadline approaching for Data Science</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></span>
                                        <p className="text-sm text-neutral-300">Course materials uploaded successfully</p>
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
