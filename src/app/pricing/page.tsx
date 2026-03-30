"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, Loader2, Sparkles, Shield, X, GraduationCap, Crown, Zap } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti';
import { createRazorpayOrder, openRazorpayCheckout } from "@/lib/razorpay";
import { recordPurchase } from "@/lib/db";

export default function PricingPage() {
    const { user, profile, refreshProfile } = useAuth();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successPlan, setSuccessPlan] = useState<string>("");
    const [paymentId, setPaymentId] = useState<string | null>(null);

    const plans = [
        {
            id: "basic",
            name: "Basic",
            price: 0,
            priceINR: 0,
            desc: "Perfect for getting started with coding.",
            features: ["Access to free courses", "Community forum access", "Basic interactive IDE", "Standard support"],
            button: "Start for Free",
            popular: false,
            icon: <Zap className="w-6 h-6" />,
        },
        {
            id: "pro",
            name: "Pro",
            price: 29,
            priceINR: 2499,
            period: "/month",
            desc: "Everything you need to master your skills.",
            features: ["All Basic features", "Unlimited premium courses", "AI Learning Assistant (100 msgs/mo)", "Certificate of completion", "Priority support"],
            button: "Get Pro",
            popular: true,
            icon: <Crown className="w-6 h-6" />,
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: 99,
            priceINR: 8299,
            period: "/month",
            desc: "For serious professionals and teams.",
            features: ["All Pro features", "Unlimited AI Learning Assistant", "1-on-1 Mentorship (4/mo)", "Career Placement Support", "Dedicated account manager"],
            button: "Contact Sales",
            popular: false,
            icon: <GraduationCap className="w-6 h-6" />,
        }
    ];

    const handleSubscribe = async (plan: typeof plans[0]) => {
        // Free plan — no payment needed
        if (plan.price === 0) {
            if (!user) {
                router.push("/signup");
            } else {
                router.push(`/dashboard/${profile?.role || 'student'}`);
            }
            return;
        }

        // Enterprise — contact sales
        if (plan.id === "enterprise") {
            router.push("/contact");
            return;
        }

        // Paid plan — Razorpay
        if (!user) {
            alert("Please login to subscribe to a plan.");
            router.push("/login");
            return;
        }

        setLoadingPlan(plan.id);

        try {
            const amountInPaise = plan.priceINR * 100;

            // Step 1: Create order
            const order = await createRazorpayOrder(
                amountInPaise,
                "INR",
                `plan_${plan.id}_${user.uid}_${Date.now()}`,
                { planId: plan.id, planName: plan.name, userId: user.uid }
            );

            // Step 2: Open checkout
            const result = await openRazorpayCheckout({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                description: `EduLearn ${plan.name} Plan - Monthly Subscription`,
                userName: user.displayName || "Student",
                userEmail: user.email || "",
            });

            // Step 3: Success
            setPaymentId(result.razorpay_payment_id);
            setSubscribedPlan(plan.id);
            setSuccessPlan(plan.name);
            setShowSuccess(true);

            // Record subscription purchase
            const coinsEarned = Math.floor(plan.priceINR * 0.10);
            await recordPurchase(user.uid, `plan-${plan.id}`, plan.price, "INR", coinsEarned, 0);
            await refreshProfile();

            // Celebrate!
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['🎉', '⭐', '✨', '🚀', '💎'],
                confettiNumber: 120,
            });

        } catch (error: any) {
            if (error.message !== "Payment cancelled by user") {
                alert("Payment failed: " + error.message);
            }
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative bg-neutral-900 border ${plan.popular ? 'border-accent shadow-2xl shadow-accent/20' : 'border-neutral-800'} p-10 rounded-[40px] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${plan.popular ? 'hover:shadow-accent/30' : 'hover:shadow-neutral-800/50'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" /> Most Popular
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-2xl ${plan.popular ? 'bg-accent/20 text-accent' : 'bg-neutral-800 text-neutral-400'} flex items-center justify-center mb-6`}>
                                    {plan.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-neutral-400 font-light mb-8 h-12">{plan.desc}</p>

                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">
                                        {plan.price === 0 ? "Free" : `₹${plan.priceINR.toLocaleString()}`}
                                    </span>
                                    {plan.period && <span className="text-neutral-500">{plan.period}</span>}
                                </div>

                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={loadingPlan === plan.id || subscribedPlan === plan.id}
                                    className={`w-full py-4 rounded-full font-bold transition-all mb-10 flex items-center justify-center gap-2 ${
                                        subscribedPlan === plan.id
                                            ? 'bg-green-500 text-white'
                                            : plan.popular
                                                ? 'bg-accent text-white hover:bg-accent-light hover:shadow-[0_0_30px_rgba(255,94,0,0.3)]'
                                                : 'bg-white text-black hover:bg-neutral-200'
                                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {loadingPlan === plan.id ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                    ) : subscribedPlan === plan.id ? (
                                        <><Check className="w-5 h-5" /> Subscribed!</>
                                    ) : (
                                        plan.button
                                    )}
                                </button>

                                <ul className="space-y-4 mt-auto">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-neutral-300">
                                            <div className={`w-6 h-6 rounded-full ${plan.popular ? 'bg-accent/20' : 'bg-neutral-800'} flex items-center justify-center shrink-0 mt-0.5`}>
                                                <Check className={`w-4 h-4 ${plan.popular ? 'text-accent' : 'text-neutral-400'}`} />
                                            </div>
                                            <span className="font-light">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-600 text-sm mb-32">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>Secure payment via Razorpay</span>
                        </div>
                        <span className="hidden md:block">•</span>
                        <span>Cancel anytime</span>
                        <span className="hidden md:block">•</span>
                        <span>No hidden fees</span>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>

            {/* Subscription Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
                    <div className="bg-neutral-900 border border-accent/20 p-10 rounded-[40px] max-w-lg w-full shadow-[0_0_80px_rgba(255,94,0,0.15)] flex flex-col items-center text-center">
                        {/* Animated success ring */}
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-2 rounded-full border border-accent/20 animate-pulse" style={{ animationDuration: '3s' }} />
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                                <Crown className="w-10 h-10 text-accent" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-accent font-bold text-sm uppercase tracking-widest">Welcome to {successPlan}</span>
                            <Sparkles className="w-5 h-5 text-accent" />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Subscription Active!</h2>
                        
                        <p className="text-neutral-400 mb-6 leading-relaxed max-w-sm">
                            Your <strong className="text-white">{successPlan}</strong> plan is now active. Enjoy all the premium features and start learning without limits.
                        </p>

                        {paymentId && (
                            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3 mb-6 w-full">
                                <p className="text-xs text-neutral-500 mb-1">Transaction ID</p>
                                <p className="text-sm text-neutral-300 font-mono truncate">{paymentId}</p>
                            </div>
                        )}

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="flex-1 py-4 rounded-full bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => router.push(`/dashboard/${profile?.role || 'student'}`)}
                                className="flex-1 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-all hover:shadow-[0_0_30px_rgba(255,94,0,0.3)]"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
