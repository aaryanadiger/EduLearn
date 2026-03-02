"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Heart, Brain, Users, BookOpen, Clock, Stethoscope, PhoneCall, Link2 } from "lucide-react";

export default function MentalHealthPage() {
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
                            Mental <span className="text-accent">Health</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Your well-being matters to us. Support for your learning journey and beyond.
                        </p>
                    </div>

                    {/* Resources */}
                    <div className="mb-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] group hover:border-neutral-700 transition-colors">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <Stethoscope className="text-accent w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">24/7 Counseling</h3>
                                        <p className="text-neutral-500 text-sm">Professional support</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Access to licensed mental health professionals for confidential counseling sessions, available 24/7 via phone, video call, or chat.</p>
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">Get Support</button>
                            </div>

                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] group hover:border-neutral-700 transition-colors">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <Users className="text-accent w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Peer Groups</h3>
                                        <p className="text-neutral-500 text-sm">Connect with students</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Join supportive communities of students who understand the challenges of learning and can offer encouragement and advice.</p>
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">Join Group</button>
                            </div>

                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] group hover:border-neutral-700 transition-colors">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <Brain className="text-accent w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Mindfulness</h3>
                                        <p className="text-neutral-500 text-sm">Stress reduction</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Guided meditation sessions, mindfulness exercises, and stress management techniques specifically designed for students.</p>
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">Start Session</button>
                            </div>

                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] group hover:border-neutral-700 transition-colors">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <BookOpen className="text-accent w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Educational Resources</h3>
                                        <p className="text-neutral-500 text-sm">Articles and guides</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Comprehensive library of articles, videos, and guides on mental health topics, study stress, and maintaining work-life balance.</p>
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">Browse Resources</button>
                            </div>
                        </div>
                    </div>

                    {/* Wellness Tips */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Wellness Tips for Students</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] flex flex-col items-center text-center">
                                <Clock className="w-12 h-12 text-accent mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Time Management</h3>
                                <p className="text-neutral-400 font-light mb-8">Create a balanced schedule that includes study time, breaks, exercise, and social activities.</p>
                                <ul className="text-left w-full space-y-3 font-medium text-sm text-neutral-300">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Use the Pomodoro Technique</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Set realistic daily goals</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Take regular breaks</li>
                                </ul>
                            </div>

                            <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] flex flex-col items-center text-center">
                                <Heart className="w-12 h-12 text-accent mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Self-Care</h3>
                                <p className="text-neutral-400 font-light mb-8">Prioritize your physical and mental health with regular self-care practices.</p>
                                <ul className="text-left w-full space-y-3 font-medium text-sm text-neutral-300">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Get 7-9 hours of sleep</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Eat nutritious meals</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Exercise regularly</li>
                                </ul>
                            </div>

                            <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] flex flex-col items-center text-center">
                                <Users className="w-12 h-12 text-accent mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Social Connection</h3>
                                <p className="text-neutral-400 font-light mb-8">Stay connected with friends, family, and fellow students for emotional support.</p>
                                <ul className="text-left w-full space-y-3 font-medium text-sm text-neutral-300">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Join study groups</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Participate in forums</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Schedule social time</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Crisis Support */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 md:p-14 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-red-500/5" />
                            <PhoneCall className="w-16 h-16 text-red-500 mx-auto mb-6 relative z-10" />
                            <h2 className="text-4xl font-bold mb-4 relative z-10">Crisis Support</h2>
                            <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-light mb-12 relative z-10">If you&apos;re experiencing a mental health crisis, help is available immediately. Do not hesitate to reach out.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-neutral-950 p-8 rounded-[24px] border border-neutral-800">
                                    <h4 className="text-xl font-bold text-white mb-2">National Suicide Prevention Lifeline</h4>
                                    <p className="text-4xl font-extrabold text-red-500 mb-2">988</p>
                                    <p className="text-neutral-500 text-sm">24/7 confidential crisis support</p>
                                </div>
                                <div className="bg-neutral-950 p-8 rounded-[24px] border border-neutral-800">
                                    <h4 className="text-xl font-bold text-white mb-2">Crisis Text Line</h4>
                                    <p className="text-3xl font-extrabold text-red-500 mb-2">Text HOME to 741741</p>
                                    <p className="text-neutral-500 text-sm">24/7 confidential text support</p>
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
