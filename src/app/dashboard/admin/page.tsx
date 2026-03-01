"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import {
    Users, BookOpen, DollarSign, Activity,
    GraduationCap, BarChart2, Plus, Settings, ArrowRight, LogOut, X
} from "lucide-react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "@/lib/firebase";
import { createFacultyProfile, createCourse } from "@/lib/db";

export default function AdminDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    // Faculty Form State
    const [facultyName, setFacultyName] = useState("");
    const [facultyEmail, setFacultyEmail] = useState("");
    const [facultyDept, setFacultyDept] = useState("");
    const [facultyPass, setFacultyPass] = useState("");
    const [facultyLoading, setFacultyLoading] = useState(false);
    const [facultyMsg, setFacultyMsg] = useState("");

    // Course Modal State
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseLoading, setCourseLoading] = useState(false);

    const handleAddFaculty = async (e: FormEvent) => {
        e.preventDefault();
        setFacultyLoading(true);
        setFacultyMsg("");

        try {
            // Use Secondary App to prevent logging out the current Admin
            const secondaryApp = getApps().length > 1 ? getApps()[1] : initializeApp(firebaseConfig, "Secondary");
            const secondaryAuth = getAuth(secondaryApp);

            const result = await createUserWithEmailAndPassword(secondaryAuth, facultyEmail, facultyPass);
            await createFacultyProfile(result.user.uid, {
                name: facultyName,
                email: facultyEmail,
                department: facultyDept
            });
            await secondaryAuth.signOut();

            setFacultyMsg("Faculty member registered securely.");
            setFacultyName("");
            setFacultyEmail("");
            setFacultyDept("");
            setFacultyPass("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFacultyMsg(error.message || "Failed to add faculty.");
        } finally {
            setFacultyLoading(false);
        }
    };

    const handleAddCourse = async (e: FormEvent) => {
        e.preventDefault();
        setCourseLoading(true);
        try {
            await createCourse({
                name: courseTitle,
                price: parseFloat(coursePrice) || 0,
                students: 0
            });
            setShowCourseModal(false);
            setCourseTitle("");
            setCoursePrice("");
            alert("Course permanently written to explicit Firebase collection!");
        } catch (error) {
            alert("Failed to create course");
        } finally {
            setCourseLoading(false);
        }
    };

    useEffect(() => {
        // Enforce Admin-only routing
        if (!loading && (!user || profile?.role !== 'admin')) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                            Admin Panel
                        </h2>
                        <p className="text-neutral-400 text-lg">Platform management & analytics overview.</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <button onClick={() => setShowCourseModal(true)} className="bg-accent text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add New Course
                        </button>
                        <button
                            onClick={async () => {
                                await logout();
                                router.push('/');
                            }}
                            className="flex items-center gap-2 px-5 py-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors rounded-full text-white/70 hover:text-white"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Log Out</span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pt-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard icon={Users} value="50,234" label="Total Students" color="text-blue-500" />
                    <StatCard icon={BookOpen} value="527" label="Active Courses" color="text-emerald-500" />
                    <StatCard icon={DollarSign} value="$2.4M" label="Monthly Revenue" color="text-amber-500" />
                    <StatCard icon={Activity} value="95.2%" label="Completion Rate" color="text-purple-500" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column (Wider) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Management Table */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-accent" />
                                    <h3 className="text-xl font-bold uppercase tracking-wider">Course Database</h3>
                                </div>
                                <button className="text-xs font-bold text-black bg-white px-4 py-2 rounded-full hover:bg-white/80 transition-colors">
                                    View All
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                            <th className="pb-4 font-semibold">Course Name</th>
                                            <th className="pb-4 font-semibold text-center">Enrolled</th>
                                            <th className="pb-4 font-semibold">Price</th>
                                            <th className="pb-4 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { name: "Web Dev Masterclass", students: "4,204", price: "$129" },
                                            { name: "Data Science A-Z", students: "3,812", price: "$149" },
                                            { name: "UI/UX Design Basics", students: "5,190", price: "$99" },
                                            { name: "Marketing 101", students: "1,200", price: "$89" }
                                        ].map((course, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="py-4 pr-4 font-medium text-white">{course.name}</td>
                                                <td className="py-4 px-4 text-center text-neutral-300">{course.students}</td>
                                                <td className="py-4 px-4 font-medium text-emerald-500">{course.price}</td>
                                                <td className="py-4 pl-4 text-right">
                                                    <button className="px-4 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Faculty Management Form */}
                        <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Users className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Faculty Management</h3>
                            </div>

                            <div className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                                <h4 className="font-bold text-lg mb-4">Add New Faculty</h4>
                                {facultyMsg && (
                                    <div className="mb-4 text-xs font-bold text-accent px-4 py-2 border border-accent/20 bg-accent/10 rounded-lg">
                                        {facultyMsg}
                                    </div>
                                )}
                                <form className="space-y-4" onSubmit={handleAddFaculty}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Full Name</label>
                                            <input type="text" value={facultyName} onChange={e => setFacultyName(e.target.value)} required placeholder="John Doe" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Email</label>
                                            <input type="email" value={facultyEmail} onChange={e => setFacultyEmail(e.target.value)} required placeholder="john@edulearn.com" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Department</label>
                                            <input type="text" value={facultyDept} onChange={e => setFacultyDept(e.target.value)} required placeholder="Computer Science" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Temporary Password</label>
                                            <input type="password" value={facultyPass} onChange={e => setFacultyPass(e.target.value)} required minLength={8} placeholder="********" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    </div>
                                    <button disabled={facultyLoading} type="submit" className="bg-accent text-black font-bold px-6 py-2.5 rounded-lg hover:bg-white transition-colors w-full md:w-auto mt-4 disabled:opacity-50">
                                        {facultyLoading ? "Provisioning..." : "+ Onboard Instructor"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Settings className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Quick Actions</h3>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors py-3 px-4 rounded-xl font-medium text-left flex items-center justify-between group">
                                    Manage Instructors
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <button className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors py-3 px-4 rounded-xl font-medium text-left flex items-center justify-between group">
                                    View Global Analytics
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <button className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white transition-colors py-3 px-4 rounded-xl font-medium text-left flex items-center justify-between group">
                                    Handle Support Tickets
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <button className="w-full bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-colors py-3 px-4 rounded-xl font-medium text-left flex items-center justify-between group">
                                    System Settings
                                    <Settings className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart2 className="w-6 h-6 text-accent" />
                                <h3 className="text-xl font-bold uppercase tracking-wider">Live Log</h3>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { time: "5 mins ago", text: "New student enrolled in Web Development", color: "text-blue-400" },
                                    { time: "12 mins ago", text: "Course 'AI Fundamentals' published", color: "text-emerald-400" },
                                    { time: "1 hour ago", text: "Payment processed: $299 from John Doe", color: "text-amber-400" },
                                    { time: "2 hours ago", text: "New instructor application received", color: "text-purple-400" }
                                ].map((log, i) => (
                                    <div key={i}>
                                        <p className="text-xs text-neutral-500 mb-1">{log.time}</p>
                                        <p className={`text-sm ${log.color}`}>{log.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Course Modal */}
            {showCourseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl w-full max-w-md relative">
                        <button onClick={() => setShowCourseModal(false)} className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'var(--font-syncopate)' }}>New Course</h3>

                        <form onSubmit={handleAddCourse} className="space-y-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Course Title</label>
                                <input required type="text" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. Advanced AI Analytics" />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Base Ticket Price ($)</label>
                                <input required type="number" min="0" step="0.01" value={coursePrice} onChange={e => setCoursePrice(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 199.99" />
                            </div>

                            <button disabled={courseLoading} type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors mt-8 disabled:opacity-50">
                                {courseLoading ? "Saving to Database..." : "Publish explicitly to Courses Collection"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
