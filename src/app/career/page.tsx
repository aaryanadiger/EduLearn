"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { Search, FileText, MessageSquare, Code, LineChart, PenTool, Megaphone, ArrowUpRight } from "lucide-react";

export default function CareerPage() {
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
                            Career <span className="text-accent">Guidance</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Transform your skills into career success
                        </p>
                    </div>

                    {/* Services */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Our Career Services</h2>
                            <p className="text-neutral-400 font-light">Comprehensive support for your professional journey</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Search, title: "Job Search Assistance", desc: "Get personalized job recommendations and application strategies tailored to your skills and goals." },
                                { icon: FileText, title: "Resume Building", desc: "Professional resume writing and optimization services to make you stand out to employers." },
                                { icon: MessageSquare, title: "Interview Preparation", desc: "Mock interviews, feedback sessions, and coaching to help you ace any interview." },
                            ].map((service, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] text-center hover:border-neutral-700 transition-colors group">
                                    <service.icon className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-neutral-400 font-light mb-8">{service.desc}</p>
                                    <button className="text-sm font-bold uppercase tracking-widest text-white border-b border-accent pb-1 hover:text-accent transition-colors">Learn More</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Career Paths */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Popular Career Paths</h2>
                            <p className="text-neutral-400 font-light">Explore high-demand career opportunities</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Path 1 */}
                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[40px] hover:bg-neutral-800/50 transition-colors group">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <Code className="text-accent w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Full Stack Developer</h3>
                                        <p className="text-neutral-500 text-sm">Average Salary: $95,000/year</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Build complete web applications from front-end to back-end. Master HTML, CSS, JavaScript, React, Node.js, and databases.</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">JavaScript</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">React</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Node.js</span>
                                </div>
                                <button className="flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors">View Career Path <ArrowUpRight className="w-4 h-4" /></button>
                            </div>

                            {/* Path 2 */}
                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[40px] hover:bg-neutral-800/50 transition-colors group">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <LineChart className="text-green-500 w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Data Scientist</h3>
                                        <p className="text-neutral-500 text-sm">Average Salary: $120,000/year</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Analyze complex data to extract insights and build predictive models. Work with Python, R, machine learning, and statistical analysis.</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Python</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Machine Learning</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Stats</span>
                                </div>
                                <button className="flex items-center gap-2 text-white font-semibold hover:text-green-500 transition-colors">View Career Path <ArrowUpRight className="w-4 h-4" /></button>
                            </div>

                            {/* Path 3 */}
                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[40px] hover:bg-neutral-800/50 transition-colors group">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <PenTool className="text-purple-500 w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">UI/UX Designer</h3>
                                        <p className="text-neutral-500 text-sm">Average Salary: $85,000/year</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Create intuitive and visually appealing user interfaces. Focus on user research, wireframing, prototyping, and visual design.</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Figma</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">User Research</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Prototyping</span>
                                </div>
                                <button className="flex items-center gap-2 text-white font-semibold hover:text-purple-500 transition-colors">View Career Path <ArrowUpRight className="w-4 h-4" /></button>
                            </div>

                            {/* Path 4 */}
                            <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[40px] hover:bg-neutral-800/50 transition-colors group">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800">
                                        <Megaphone className="text-red-500 w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Digital Marketer</h3>
                                        <p className="text-neutral-500 text-sm">Average Salary: $75,000/year</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 font-light leading-relaxed mb-8">Develop and execute digital marketing strategies. Master SEO, SEM, social media marketing, content creation, and analytics.</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">SEO/SEM</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Analytics</span>
                                    <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-300">Social Media</span>
                                </div>
                                <button className="flex items-center gap-2 text-white font-semibold hover:text-red-500 transition-colors">View Career Path <ArrowUpRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Track Record */}
                    <div className="mb-32 bg-neutral-900 border border-neutral-800 rounded-[40px] p-12 lg:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[100px] pointer-events-none" />
                        <div className="text-center mb-16 relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Our Track Record</h2>
                            <p className="text-neutral-400 font-light max-w-2xl mx-auto">Proven results showing that our career transformation pipeline guarantees rapid ROI and industry placement.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
                            <div>
                                <h3 className="text-6xl font-bold text-accent mb-2">85%</h3>
                                <p className="text-white font-medium mb-1">Job Placement Rate</p>
                                <p className="text-sm text-neutral-500">Within 6 months</p>
                            </div>
                            <div>
                                <h3 className="text-6xl font-bold text-accent mb-2">$25K</h3>
                                <p className="text-white font-medium mb-1">Avg Salary Increase</p>
                                <p className="text-sm text-neutral-500">After completion</p>
                            </div>
                            <div>
                                <h3 className="text-6xl font-bold text-accent mb-2">500+</h3>
                                <p className="text-white font-medium mb-1">Partner Companies</p>
                                <p className="text-sm text-neutral-500">Hiring graduates</p>
                            </div>
                            <div>
                                <h3 className="text-6xl font-bold text-accent mb-2">95%</h3>
                                <p className="text-white font-medium mb-1">Student Satisfaction</p>
                                <p className="text-sm text-neutral-500">Career services</p>
                            </div>
                        </div>
                    </div>

                    {/* Simple CTA */}
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Career?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/courses" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">Explore Courses</Link>
                            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors">Get Career Advice</Link>
                        </div>
                    </div>

                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
