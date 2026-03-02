"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Star, Award, MessageSquare, Clock } from "lucide-react";

export default function MentorsPage() {
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
                            Meet Our <span className="text-accent">Mentors</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            Learn from industry experts and thought leaders
                        </p>
                    </div>

                    {/* Featured Mentors */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Featured Mentors</h2>
                            <p className="text-neutral-400 font-light">Our most popular and experienced instructors</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Aarya Nadiger", role: "CEO & Founder", rating: "4.99", revs: "2,340 reviews", stu: "25,000+", crs: "12", yrs: "8",
                                    desc: "Leading expert in software architecture and full-stack engineering with years of experience building scalable systems.",
                                    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop"
                                },
                                {
                                    name: "Tanish Parikh", role: "Co-Founder & Co-CEO", rating: "4.9", revs: "1,890 reviews", stu: "18,500+", crs: "15", yrs: "6",
                                    desc: "Specialized in data science, artificial intelligence, and building predictive models for enterprise applications.",
                                    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                                },
                                {
                                    name: "Div Gandhi", role: "CMO", rating: "4.75", revs: "3,120 reviews", stu: "22,000+", crs: "18", yrs: "7",
                                    desc: "Expert in digital marketing, brand growth strategies, and user experience design for digital products.",
                                    img: "https://images.unsplash.com/photo-1517836319275-76d3167d8b92?w=400&h=400&fit=crop"
                                }
                            ].map((mentor, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-[40px] text-center group hover:border-neutral-700 transition-colors flex flex-col">
                                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 border-neutral-800 group-hover:border-accent transition-colors">
                                        <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${mentor.img})` }} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1 text-white">{mentor.name}</h3>
                                    <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">{mentor.role}</p>

                                    <div className="flex items-center justify-center gap-1.5 mb-6 bg-neutral-950 inline-flex mx-auto px-4 py-1.5 rounded-full border border-neutral-800">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-bold text-white text-sm">{mentor.rating}</span>
                                        <span className="text-neutral-500 text-xs">({mentor.revs})</span>
                                    </div>

                                    <p className="text-neutral-400 font-light leading-relaxed mb-8 flex-grow">{mentor.desc}</p>

                                    <div className="grid grid-cols-3 gap-2 border-t border-neutral-800 pt-6 mb-8">
                                        <div>
                                            <div className="text-xl font-bold text-white mb-1">{mentor.stu}</div>
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider">Students</div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white mb-1">{mentor.crs}</div>
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider">Courses</div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white mb-1">{mentor.yrs}</div>
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider">Years</div>
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-white text-black font-bold group-hover:bg-accent group-hover:text-white transition-colors">View Profile</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All Mentors List */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">All Mentors</h2>
                            <p className="text-neutral-400 font-light">Browse our complete team of expert instructors</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Hiral Modi", spec: "Web Development", r: "5" },
                                { name: "S. Nagalakshmi", spec: "Digital Marketing", r: "5" },
                                { name: "Ishani Saha", spec: "Machine Learning", r: "4.9" },
                                { name: "Abhinaba Gupta", spec: "Cloud Computing", r: "4.6" },
                                { name: "Krishna Samdani", spec: "Cybersecurity", r: "4.8" },
                                { name: "Sanjay Jha", spec: "Business Analytics", r: "4.7" },
                                { name: "Geentanjali", spec: "Mobile Development", r: "4.8" },
                                { name: "Vineet Panchal", spec: "Graphic Design", r: "4.9" },
                            ].map((m, i) => (
                                <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl text-center group cursor-pointer hover:border-neutral-700 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-neutral-950 mx-auto mb-4 border border-neutral-800 overflow-hidden config-bg flex items-center justify-center">
                                        <span className="font-bold text-neutral-500 text-xl">{m.name.charAt(0)}</span>
                                    </div>
                                    <h4 className="font-bold text-white mb-1 line-clamp-1">{m.name}</h4>
                                    <p className="text-xs text-neutral-500 mb-4">{m.spec}</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                                        <span className="text-sm font-semibold text-white">{m.r}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Our Mentors Special */}
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Why Our Mentors Are Special</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <Award className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Industry Experts</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">All our mentors are working professionals with real-world experience at top companies.</p>
                            </div>
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <MessageSquare className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Personalized Support</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">Get one-on-one guidance, feedback, and career advice from your dedicated mentor.</p>
                            </div>
                            <div className="bg-neutral-900/50 p-10 rounded-3xl text-center border border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <Clock className="w-12 h-12 text-accent mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">Always Available</h3>
                                <p className="text-neutral-400 font-light leading-relaxed">Our mentors provide 24/7 support through forums, live sessions, and direct messaging.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
