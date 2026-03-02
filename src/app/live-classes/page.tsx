"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { PlayCircle, CalendarPlus, Users, Clock, Video, MessageSquare, Award, ArrowRight } from "lucide-react";

export default function LiveClassesPage() {
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
                            Live <span className="text-accent">Classes</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Join interactive sessions with expert instructors
                        </p>
                    </div>

                    {/* Upcoming Live Sessions */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Upcoming Live Sessions</h2>
                            <p className="text-neutral-400 font-light">Don&apos;t miss these interactive learning opportunities</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { status: "LIVE NOW", name: "JavaScript ES6+", desc: "Join our expert instructor for an in-depth session on modern JavaScript features.", inst: "John Smith", time: "1 hour", ppl: "234 attending", color: "bg-red-500/10 text-red-500 border-red-500/20", btn: "Join Session", icon: Video },
                                { status: "STARTING IN 2H", name: "Python Data Analysis", desc: "Learn how to analyze and visualize data using Python libraries like Pandas.", inst: "Sarah Johnson", time: "2 hours", ppl: "89 registered", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", btn: "Register Now", icon: CalendarPlus },
                                { status: "TOMORROW", name: "UI/UX Design Principles", desc: "Master the fundamentals of user interface and user experience design.", inst: "Mike Chen", time: "1.5 hours", ppl: "156 registered", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", btn: "Register Now", icon: CalendarPlus },
                                { status: "THIS WEEK", name: "Machine Learning Basics", desc: "Get started with machine learning concepts and algorithms.", inst: "Emily Rodriguez", time: "3 hours", ppl: "203 registered", color: "bg-green-500/10 text-green-500 border-green-500/20", btn: "Register Now", icon: CalendarPlus },
                                { status: "NEXT WEEK", name: "Digital Marketing 2025", desc: "Stay ahead of the curve with the latest strategies and trends.", inst: "Lisa Park", time: "1.5 hours", ppl: "78 registered", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", btn: "Register Now", icon: CalendarPlus },
                                { status: "NEXT MONTH", name: "Mobile App Development", desc: "Learn to build cross-platform mobile apps using modern tools.", inst: "David Wilson", time: "4 hours", ppl: "145 registered", color: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20", btn: "Register Now", icon: CalendarPlus },
                            ].map((session, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl flex flex-col justify-between group hover:border-neutral-700 transition-colors">
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wider ${session.color}`}>{session.status}</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Free</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{session.name}</h3>
                                        <p className="text-neutral-400 font-light leading-relaxed mb-8">{session.desc}</p>
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 mb-8 border-t border-neutral-800 pt-6">
                                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{session.inst}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{session.time}</span>
                                            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{session.ppl}</span>
                                        </div>
                                        <button className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-transform group-hover:-translate-y-1 ${session.status === 'LIVE NOW' ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-white text-black'}`}>
                                            <session.icon className="w-5 h-5" /> {session.btn}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Previous Recordings */}
                    <div className="mb-32">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">Previous Recordings</h2>
                                <p className="text-neutral-400 font-light">Missed a session? Watch the recordings</p>
                            </div>
                            <button className="flex items-center gap-2 text-accent font-semibold hover:text-white transition-colors mt-4 md:mt-0">View All Archive <ArrowRight className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Introduction to React", dur: "2 hours", by: "John Smith" },
                                { title: "SQL Database Design", dur: "1.5 hours", by: "Sarah Johnson" },
                                { title: "CSS Grid & Flexbox", dur: "1 hour", by: "Mike Chen" },
                                { title: "Git & GitHub Basics", dur: "2 hours", by: "David Wilson" },
                            ].map((rec, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-[24px] text-center group cursor-pointer hover:border-accent transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-neutral-950 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-8 h-8 text-white transition-colors group-hover:text-accent" />
                                    </div>
                                    <h4 className="font-bold mb-2 line-clamp-1">{rec.title}</h4>
                                    <p className="text-xs text-neutral-500 mb-6">{rec.dur} • {rec.by}</p>
                                    <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">Watch Recording</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Join */}
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Why Join Live Classes?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <MessageSquare className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Interactive Learning</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">Ask questions and get immediate answers from expert instructors in real-time.</p>
                            </div>
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <Users className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Peer Collaboration</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">Connect with fellow learners, collaborate on projects, and build your professional network.</p>
                            </div>
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <Award className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Exclusive Content</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">Access to premium content, deep-dives, and case studies not available in regular self-paced courses.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
