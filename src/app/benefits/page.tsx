"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Briefcase, LineChart, ShieldCheck, HeartHandshake } from "lucide-react";

export default function BenefitsPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                                Why Choose <span className="text-accent">EduLearn?</span>
                            </h1>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10">
                                We go beyond just providing course material. We offer a dynamic ecosystem designed to guarantee your success in the tech industry.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: Briefcase, title: "Career Placement", desc: "Dedicated career support team to help you land your dream job." },
                                    { icon: LineChart, title: "Skill Tracking", desc: "Detailed analytics on your learning progress and skill acquisition." },
                                    { icon: ShieldCheck, title: "Industry Certifications", desc: "Earn certificates recognized by top tech companies globally." },
                                    { icon: HeartHandshake, title: "1-on-1 Mentorship", desc: "Weekly sessions with industry professionals to guide your journey." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-neutral-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[40px] overflow-hidden relative border border-neutral-800">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                                        <p className="text-xl text-white font-medium mb-2">&quot;85% of our students report career advancement within 6 months.&quot;</p>
                                        <p className="text-accent text-sm uppercase tracking-widest font-bold">Verified Impact</p>
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
