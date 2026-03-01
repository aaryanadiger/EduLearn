"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Check } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            desc: "Perfect for getting started with coding.",
            features: ["Access to free courses", "Community forum access", "Basic interactive IDE", "Standard support"],
            button: "Start for Free",
            popular: false
        },
        {
            name: "Pro",
            price: "$29",
            period: "/month",
            desc: "Everything you need to master your skills.",
            features: ["All Basic features", "Unlimited premium courses", "AI Learning Assistant (100 msgs/mo)", "Certificate of completion", "Priority support"],
            button: "Get Pro",
            popular: true
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "/month",
            desc: "For serious professionals and teams.",
            features: ["All Pro features", "Unlimited AI Learning Assistant", "1-on-1 Mentorship (4/mo)", "Career Placement Support", "Dedicated account manager"],
            button: "Contact Sales",
            popular: false
        }
    ];

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                    <div className="text-center mb-24">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Simple, <span className="text-accent">Transparent Pricing</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Invest in your future. Choose the plan that best fits your learning journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative bg-neutral-900 border ${plan.popular ? 'border-accent shadow-2xl shadow-accent/20' : 'border-neutral-800'} p-10 rounded-[40px] flex flex-col transition-transform duration-300 hover:-translate-y-2`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-neutral-400 font-light mb-8 h-12">{plan.desc}</p>

                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-neutral-500">{plan.period}</span>}
                                </div>

                                <button className={`w-full py-4 rounded-full font-bold transition-colors mb-10 ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-white text-black hover:bg-neutral-200'}`}>
                                    {plan.button}
                                </button>

                                <ul className="space-y-4 mt-auto">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-neutral-300">
                                            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-accent" />
                                            </div>
                                            <span className="font-light">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
