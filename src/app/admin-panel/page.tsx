"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Users, BookOpen, DollarSign, TrendingUp, Grid, Plus, Edit2, Trash2, Shield, Activity, Bell, Settings } from "lucide-react";

export default function AdminPanelPage() {
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
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
                                Admin Panel <Shield className="w-8 h-8 text-accent" />
                            </h1>
                            <p className="text-neutral-400 font-light text-lg">Manage courses, users, and platform settings</p>
                        </div>
                        <button className="px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add New Course
                        </button>
                    </div>

                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: "Total Students", value: "50,234", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                            { title: "Active Courses", value: "527", icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
                            { title: "Monthly Revenue", value: "$2.4M", icon: DollarSign, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                            { title: "Completion Rate", value: "95.2%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
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

                            {/* Course Management Table */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 h-full">
                                <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-3">
                                        <Grid className="text-accent" /> Course Management
                                    </h3>
                                    <button className="text-sm bg-neutral-950 border border-neutral-800 px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-black transition-colors">
                                        View All
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="text-neutral-500 border-b border-neutral-800">
                                            <tr>
                                                <th className="pb-4 font-medium px-4">Course Name</th>
                                                <th className="pb-4 font-medium px-4">Instructor</th>
                                                <th className="pb-4 font-medium px-4">Students</th>
                                                <th className="pb-4 font-medium px-4">Price</th>
                                                <th className="pb-4 font-medium px-4">Status</th>
                                                <th className="pb-4 font-medium text-right px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { name: "Complete Next.js Masterclass", instructor: "Aarya Nadiger", students: "1,240", price: "$99", status: "Active", color: "text-green-500 bg-green-500/10" },
                                                { name: "Advanced UI/UX Patterns", instructor: "Div Gandhi", students: "850", price: "$89", status: "Active", color: "text-green-500 bg-green-500/10" },
                                                { name: "Machine Learning Basics", instructor: "Tanish Parikh", students: "420", price: "$129", status: "Draft", color: "text-yellow-500 bg-yellow-500/10" },
                                                { name: "Python for Data Science", instructor: "Sarah Smith", students: "3,100", price: "$79", status: "Inactive", color: "text-red-500 bg-red-500/10" },
                                            ].map((course, i) => (
                                                <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                                                    <td className="py-5 px-4 font-bold text-white">{course.name}</td>
                                                    <td className="py-5 px-4 text-neutral-400">{course.instructor}</td>
                                                    <td className="py-5 px-4 font-medium">{course.students}</td>
                                                    <td className="py-5 px-4 font-medium text-accent">{course.price}</td>
                                                    <td className="py-5 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${course.color}`}>
                                                            {course.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Faculty Management Quick View */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-3">
                                        <Users className="text-accent" /> Faculty Members
                                    </h3>
                                    <button className="text-sm bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Add Faculty
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: "FAC001", name: "Dr. Jane Smith", dept: "Computer Science", email: "jane.smith@edulearn.org" },
                                        { id: "FAC002", name: "Prof. Michael Chen", dept: "Design", email: "michael.c@edulearn.org" },
                                    ].map((fac, i) => (
                                        <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wider">{fac.id}</span>
                                                    <h4 className="font-bold text-white line-clamp-1">{fac.name}</h4>
                                                </div>
                                                <p className="text-xs text-neutral-500 mb-1">{fac.dept}</p>
                                                <p className="text-xs text-neutral-600">{fac.email}</p>
                                            </div>
                                            <button className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Quick Stats */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Activity className="text-accent" /> Live Overview
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="text-neutral-400 font-medium text-sm">New Students Today</span>
                                        <span className="font-bold text-blue-500">127</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="text-neutral-400 font-medium text-sm">Courses Sold Today</span>
                                        <span className="font-bold text-green-500">89</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="text-neutral-400 font-medium text-sm">Active Live Classes</span>
                                        <span className="font-bold text-yellow-500">5</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                                        <span className="text-neutral-400 font-medium text-sm">Pending Support Tickets</span>
                                        <span className="font-bold text-red-500">23</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Bell className="text-accent" /> Recent Activity
                                </h3>
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:w-px before:bg-neutral-800">
                                    {[
                                        { time: "5 minutes ago", text: "New student enrolled in Web Development" },
                                        { time: "12 minutes ago", text: "Course 'AI Fundamentals' published" },
                                        { time: "1 hour ago", text: "Payment processed: $299 from John Doe" },
                                        { time: "2 hours ago", text: "New instructor application received" },
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

                            {/* Quick Actions */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
                                    <Settings className="text-accent" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent hover:text-accent transition-colors">
                                        <span className="font-medium text-sm">Create New Course</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent hover:text-accent transition-colors">
                                        <span className="font-medium text-sm">Manage Instructors</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent hover:text-accent transition-colors">
                                        <span className="font-medium text-sm">View Analytics</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-accent hover:text-accent transition-colors">
                                        <span className="font-medium text-sm">Handle Support Tickets</span>
                                    </button>
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
