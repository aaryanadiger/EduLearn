"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { MonitorPlay, Code2, Users2, Brain, Zap, Target } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        { icon: MonitorPlay, title: "Interactive Video Player", desc: "Our custom video player allows you to interact with the code written by instructors in real-time." },
        { icon: Code2, title: "In-Browser IDE", desc: "No need to install anything. Code, compile, and run directly in your browser with our powerful IDE." },
        { icon: Users2, title: "Live Collaboration", desc: "Work on projects with peers in real-time. Pair programming made easy." },
        { icon: Brain, title: "AI Learning Assistant", desc: "Get stuck? Our AI assistant is available 24/7 to provide hints, explain concepts, and debug code." },
        { icon: Zap, title: "Instant Feedback", desc: "Automated grading and instant feedback on your assignments and quizzes." },
        { icon: Target, title: "Custom Learning Paths", desc: "A personalized curriculum that adapts to your learning pace and career goals." },
    ];

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
                    <div className="text-center mb-24">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Platform <span className="text-accent">Features</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Discover the tools that make learning interactive, engaging, and ruthlessly effective.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {features.map((feat, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 p-10 rounded-[32px] group hover:bg-neutral-800 transition-colors">
                                <div className="w-16 h-16 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center mb-8 group-hover:border-accent/50 transition-colors">
                                    <feat.icon className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feat.title}</h3>
                                <p className="text-neutral-400 leading-relaxed font-light">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
