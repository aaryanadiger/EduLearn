"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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
                            Contact <span className="text-accent">Us</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light">
                            We&apos;re here to help you succeed in your learning journey
                        </p>
                    </div>

                    {/* Contact Methods Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] text-center backdrop-blur-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <Phone className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-6 text-white">Phone Support</h3>
                            <div className="space-y-4 text-neutral-400 font-light">
                                <p><strong className="text-white">Aarya Nadiger:</strong> <br />+91 9004618323</p>
                                <p><strong className="text-white">Tanish Parikh:</strong> <br />+91 7738004302</p>
                                <p><strong className="text-white">Div Gandhi:</strong> <br />+91 8928026627</p>
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] text-center backdrop-blur-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <Mail className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-6 text-white">Email Support</h3>
                            <div className="space-y-4 text-neutral-400 font-light">
                                <p><strong className="text-white">Support:</strong><br />aaryanadiger@edulearn.com</p>
                                <p><strong className="text-white">Sales:</strong><br />tanishparikh@edulearn.com</p>
                                <p><strong className="text-white">Partnerships:</strong><br />divgandhi@edulearn.com</p>
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 border border-neutral-800 p-10 rounded-[32px] text-center backdrop-blur-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <Clock className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-6 text-white">Business Hours</h3>
                            <div className="space-y-4 text-neutral-400 font-light">
                                <p><strong className="text-white">Support:</strong> 24/7</p>
                                <p><strong className="text-white">Office:</strong> Mon-Fri 9AM-6PM</p>
                                <p><strong className="text-white">Response:</strong> Within 2 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Locations & Contact Form Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                        {/* Locations */}
                        <div>
                            <span className="text-accent uppercase tracking-widest font-bold text-sm mb-4 block">Our Offices</span>
                            <h2 className="text-4xl font-bold mb-10">Visit us worldwide</h2>

                            <div className="space-y-8">
                                <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl group transition-colors hover:border-neutral-700">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                                            <MapPin className="text-accent w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold mb-2">Matunga Office</h4>
                                            <p className="text-neutral-400 font-light leading-relaxed">
                                                M19, 7th Floor<br />
                                                Matunga, Mumbai, Maharashtra<br />
                                                India
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-64 rounded-2xl overflow-hidden border border-neutral-800">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.904404017477!2d72.8495209761229!3d19.023933653603354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf6004dd707b%3A0x5a168f3bea970bb8!2sM19!5e0!3m2!1sen!2sin!4v1761142123366!5m2!1sen!2sin"
                                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl group transition-colors hover:border-neutral-700">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                                            <MapPin className="text-accent w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold mb-2">Vidyavihar Office</h4>
                                            <p className="text-neutral-400 font-light leading-relaxed">
                                                Neelkanth Kingdom<br />
                                                Vidyavihar, Mumbai, Maharashtra<br />
                                                India
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-64 rounded-2xl overflow-hidden border border-neutral-800">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.674730132044!2d72.89136252612367!3d19.078033601906988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8839df3fc49%3A0xb135715656fb256c!2sNeelkanth%20Kingdom%2C%20Vidyavihar%20West%2C%20Ghatkopar%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1761142286797!5m2!1sen!2sin"
                                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-neutral-900 border border-neutral-800 p-10 md:p-14 rounded-[40px] sticky top-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <Send className="text-accent w-8 h-8" />
                                    <h3 className="text-3xl font-bold">Send a Message</h3>
                                </div>
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message. We'll reply within 2 hours!"); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-neutral-400 font-medium">First Name *</label>
                                            <input type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-neutral-400 font-medium">Last Name *</label>
                                            <input type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-neutral-400 font-medium">Email Address *</label>
                                            <input type="email" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-neutral-400 font-medium">Phone Number</label>
                                            <input type="tel" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-neutral-400 font-medium">Subject *</label>
                                        <select required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                                            <option value="">Select a topic</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="courses">Course Information</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="billing">Billing & Payments</option>
                                            <option value="partnership">Partnership Opportunities</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-neutral-400 font-medium">Message *</label>
                                        <textarea required rows={5} placeholder="Please describe your inquiry..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" />
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-neutral-700 bg-neutral-950 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-accent transition-colors">
                                            <input type="checkbox" className="opacity-0 absolute" />
                                            {/* Custom checkmark pseudo-element via CSS could go here, for now it's simple */}
                                        </div>
                                        <span className="text-neutral-400 text-sm leading-relaxed select-none">Subscribe to our newsletter for updates and promotions</span>
                                    </label>

                                    <button type="submit" className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                                        Send Message <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
