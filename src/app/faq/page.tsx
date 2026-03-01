"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function FAQPage() {
    const defaultFaqs = [
        {
            category: "General Questions",
            questions: [
                { q: "What is EduLearn?", a: "EduLearn is a comprehensive online learning platform that offers high-quality courses in various fields including programming, design, data science, business, and more. We provide expert-led courses with hands-on projects and industry-recognized certificates." },
                { q: "How do I get started?", a: "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in the courses that interest you. You can start learning immediately after enrollment." },
                { q: "Are the courses self-paced or scheduled?", a: "Most of our courses are self-paced, allowing you to learn at your own convenience. However, we also offer live classes and webinars for certain courses where you can interact with instructors in real-time." },
                { q: "Do I need any special software or equipment?", a: "Most courses only require a computer with internet access. Specific software requirements will be mentioned in the course description. Many courses provide free software alternatives or trial versions." },
            ]
        },
        {
            category: "Courses & Learning",
            questions: [
                { q: "How long do I have access to a course?", a: "Once you enroll in a course, you have lifetime access to the content. This includes all future updates and additions to the course material." },
                { q: "Will I receive a certificate upon completion?", a: "Yes! All our courses come with a certificate of completion that you can add to your resume and LinkedIn profile. Some courses also offer industry-recognized certifications." },
                { q: "Can I interact with instructors?", a: "Absolutely! You can ask questions through our course forums, participate in live Q&A sessions, and some courses offer one-on-one mentoring sessions with instructors." },
                { q: "What if I need help with course content?", a: "We provide multiple support channels including course forums, live chat with instructors, peer study groups, and our 24/7 technical support team." },
            ]
        },
        {
            category: "Payment & Pricing",
            questions: [
                { q: "How much do courses cost?", a: "Course prices range depending on the complexity and duration. We also offer bundle discounts and seasonal promotions. Check our courses page for current pricing." },
                { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and various regional payment methods." },
                { q: "Is there a money-back guarantee?", a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 30 days of purchase." },
            ]
        },
        {
            category: "Technical Support",
            questions: [
                { q: "What are the system requirements?", a: "You need a computer or mobile device with internet access. Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of Chrome." },
                { q: "Can I access courses on mobile devices?", a: "Yes! Our platform is fully responsive and works on smartphones, tablets, and other mobile devices. You can learn anywhere, anytime." },
                { q: "How do I download course materials?", a: "Most courses allow you to download supplementary materials like PDFs, code files, and resources. Look for the download links within each lesson. Video content is available for streaming only." },
            ]
        },
        {
            category: "Career & Job Placement",
            questions: [
                { q: "Do you help with job placement?", a: "Yes! We offer comprehensive career services including resume building, interview preparation, job search assistance, and connections with our partner companies. Our job placement rate is 85% within 6 months of course completion." },
                { q: "Are your certificates recognized by employers?", a: "Our certificates are widely recognized in the industry. Many of our partner companies specifically look for EduLearn graduates. We also offer courses that prepare you for industry-standard certifications." },
            ]
        },
        {
            category: "Account & Profile",
            questions: [
                { q: "How do I reset my password?", a: "Click on the 'Forgot Password' link on the login page. We'll send you an email with instructions to reset your password. The process typically takes less than 5 minutes." },
                { q: "How do I delete my account?", a: "You can request account deletion through your account settings. Please note that this action is permanent and will remove all your course progress and certificates." },
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20 relative">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 relative inline-block">
                            Frequently Asked <span className="text-accent">Questions</span>
                            <div className="absolute -inset-10 bg-accent/10 blur-[100px] -z-10 rounded-full" />
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Find answers to common questions about our platform
                        </p>
                    </div>

                    {/* FAQ Accordions */}
                    <div className="space-y-16 mb-32">
                        {defaultFaqs.map((section, i) => (
                            <div key={i} className="scroll-mt-32">
                                <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8 tracking-tight">{section.category}</h3>
                                <div className="space-y-4">
                                    {section.questions.map((faq, j) => (
                                        <details
                                            key={j}
                                            className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                                        >
                                            <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 font-semibold text-lg hover:text-accent transition-colors">
                                                <span>{faq.q}</span>
                                                <span className="transition group-open:rotate-180 shrink-0 ml-4">
                                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                                </span>
                                            </summary>
                                            <div className="p-6 md:p-8 pt-0 text-neutral-400 font-light leading-relaxed border-t border-neutral-800/50 group-open:animate-fadeIn mt-4">
                                                {faq.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still Have Questions CTA */}
                    <div className="text-center bg-neutral-900 border border-neutral-800 p-12 md:p-16 rounded-[40px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                        <h2 className="text-4xl font-bold mb-4 relative z-10">Still Have Questions?</h2>
                        <p className="text-lg text-neutral-400 mb-12 relative z-10">Our support team is here to help you</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl hover:border-neutral-700 transition-colors cursor-pointer group" onClick={() => alert("Starting Live Chat...")}>
                                <MessageCircle className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="font-bold text-lg mb-2">Live Chat</h4>
                                <p className="text-sm text-neutral-400">Available 24/7</p>
                            </div>
                            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl hover:border-neutral-700 transition-colors cursor-pointer group text-white hover:text-white" onClick={() => window.location.href = '/contact'}>
                                <Mail className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="font-bold text-lg mb-2">Email Support</h4>
                                <p className="text-sm text-neutral-400">Detailed answers</p>
                            </div>
                            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl hover:border-neutral-700 transition-colors cursor-pointer group" onClick={() => alert("Call 1-800-EDU-HELP")}>
                                <Phone className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="font-bold text-lg mb-2">Phone Support</h4>
                                <p className="text-sm text-neutral-400">Speak directly</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
