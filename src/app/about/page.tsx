"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Lightbulb, Unlock, Star, Users, Rocket, Handshake, TrendingUp, Trophy, Activity } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-32 relative">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 relative inline-block">
                            About <span className="text-accent">EduLearn</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Democratizing learning since 2018. Quality education accessible to everyone, everywhere.
                        </p>
                    </div>

                    {/* Our Story & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
                        <div>
                            <span className="text-accent uppercase tracking-widest font-bold text-sm mb-4 block">Our Story</span>
                            <h2 className="text-4xl font-bold mb-8">From a small initiative to a global platform.</h2>
                            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light">
                                <p>
                                    Founded in 2018, EduLearn was born from a simple belief: quality education should be accessible to everyone, everywhere.
                                </p>
                                <p>
                                    What started as a small initiative to help students learn programming has now grown into a comprehensive learning platform that serves over 50,000 students worldwide. We&apos;ve helped countless individuals transform their careers, learn new skills, and achieve their dreams.
                                </p>
                                <p>
                                    Our mission is to democratize education by providing high-quality, affordable courses taught by industry experts. We believe that learning should be engaging, practical, and tailored to individual needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="bg-neutral-900/50 border border-neutral-800 p-12 rounded-[40px] text-center backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <Lightbulb className="w-16 h-16 text-accent mx-auto mb-8" />
                                <h3 className="text-3xl font-bold mb-4 text-white">Our Vision</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">
                                    To become the world&apos;s most trusted online learning platform, empowering individuals to achieve their full potential through education.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-40">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">Our Mission & Values</h2>
                            <p className="text-xl text-neutral-400 font-light">The principles that guide everything we do</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Unlock, title: "Accessibility", desc: "Making quality education available to anyone with an internet connection." },
                                { icon: Star, title: "Excellence", desc: "Maintaining the highest standards in course content and instruction." },
                                { icon: Users, title: "Community", desc: "Building a supportive learning environment for collaboration." },
                                { icon: Rocket, title: "Innovation", desc: "Continuously improving with the latest educational technologies." },
                                { icon: Handshake, title: "Integrity", desc: "Being transparent, honest, and ethical in all our interactions." },
                                { icon: TrendingUp, title: "Results", desc: "Focusing on measurable outcomes and goal achievement." },
                            ].map((val, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                    <val.icon className="w-10 h-10 text-accent mb-6" />
                                    <h4 className="text-xl font-bold text-white mb-3">{val.title}</h4>
                                    <p className="text-neutral-400 font-light">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leadership */}
                    <div className="mb-40">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">Meet Leadership</h2>
                            <p className="text-xl text-neutral-400 font-light">The passionate individuals driving our mission</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Aarya Nadiger", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop" },
                                { name: "Tanish Parikh", role: "Co-Founder & Co-CEO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop" },
                                { name: "Div Gandhi", role: "Curriculum Designer", img: "https://images.unsplash.com/photo-1517836319275-76d3167d8b92?w=300&h=300&fit=crop" }
                            ].map((person, i) => (
                                <div key={i} className="group relative">
                                    <div className="aspect-square rounded-[32px] overflow-hidden mb-6 relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            style={{ backgroundImage: `url(${person.img})` }}
                                        />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-1">{person.name}</h4>
                                    <p className="text-accent">{person.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-neutral-900 p-12 rounded-[40px] border border-neutral-800">
                                <Trophy className="w-12 h-12 text-accent mb-8" />
                                <h3 className="text-3xl font-bold text-white mb-8">Awards & Recognition</h3>
                                <ul className="space-y-4 text-neutral-400">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Best Online Learning Platform 2024</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Top 10 Education Startups - Forbes</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Innovation in Education Award 2023</li>
                                </ul>
                            </div>
                            <div className="bg-neutral-900 p-12 rounded-[40px] border border-neutral-800">
                                <Activity className="w-12 h-12 text-accent mb-8" />
                                <h3 className="text-3xl font-bold text-white mb-8">Impact Metrics</h3>
                                <ul className="space-y-4 text-neutral-400">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> 50,000+ students globally</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> 95% course completion rate</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> 4.8/5 average student rating</li>
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
