"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        try {
            await sendPasswordResetEmail(auth, email);
            setStatus({ type: 'success', message: "Password reset link sent! Please check your inbox." });
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message || "Failed to send reset email. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white flex flex-col">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-md">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-bold tracking-tighter mb-4">Reset Password</h1>
                            <p className="text-neutral-400 font-light lg:px-4">
                                Enter your email address and we&apos;ll send you a link to reset your password.
                            </p>
                        </div>

                        {status && (
                            <div className={`mb-6 p-4 border rounded-xl text-sm ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                                {status.message}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleReset}>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors group disabled:opacity-50"
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/login" className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm font-medium">
                                <ArrowLeft className="w-4 h-4" /> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </SmoothScroll>

            <Footer />
        </main>
    );
}
