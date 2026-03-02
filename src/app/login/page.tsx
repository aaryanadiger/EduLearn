"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user, loading, loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If already logged in naturally, redirect to home.
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleEmailLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await loginWithEmail(email, password);
            router.push("/"); // Redirect to home or dashboard after login
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.message === "unverified-email") {
                setError("Please verify your email address before logging in. Check your inbox.");
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push("/");
        } catch (err) {
            setError("Failed to login with Google.");
        }
    };

    const handleGithubLogin = async () => {
        try {
            await loginWithGithub();
            router.push("/");
        } catch (err) {
            setError("Failed to login with GitHub.");
        }
    };

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white flex flex-col">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Form Section */}
                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            <div className="mb-10">
                                <h1 className="text-5xl font-bold tracking-tighter mb-4">Welcome back</h1>
                                <p className="text-neutral-400 font-light text-lg">
                                    Login to continue your learning journey
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleEmailLogin}>
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

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end text-sm">
                                    <Link href="/reset-password" className="text-accent hover:text-white transition-colors font-medium">Reset password?</Link>
                                </div>


                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors group disabled:opacity-50"
                                >
                                    {isLoading ? "Signing In..." : "Sign In"} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-px bg-neutral-800 flex-grow"></div>
                                <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Or continue with</span>
                                <div className="h-px bg-neutral-800 flex-grow"></div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <button type="button" onClick={handleGoogleLogin} className="flex justify-center items-center gap-2 py-3 border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors font-medium">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button type="button" onClick={handleGithubLogin} className="flex justify-center items-center gap-2 py-3 border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors font-medium text-white">
                                    <Github className="h-5 w-5" />
                                    GitHub
                                </button>
                            </div>

                            <p className="mt-8 text-center text-sm text-neutral-500">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="text-white hover:text-accent transition-colors font-medium">Sign up</Link>
                            </p>
                        </div>

                        {/* Visual Section */}
                        <div className="hidden lg:block relative h-full min-h-[600px] w-full bg-neutral-900 border border-neutral-800 rounded-[40px] overflow-hidden config-bg p-12 flex-col justify-between">
                            <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 blur-[100px] rounded-full"></div>
                            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full"></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-16 h-16 bg-neutral-950 rounded-2xl flex items-center justify-center mb-10 border border-neutral-800">
                                        <User className="h-8 w-8 text-accent" />
                                    </div>
                                    <h2 className="text-4xl font-bold mb-4">Master new skills,<br />Anytime, Anywhere.</h2>
                                    <p className="text-neutral-400 font-light text-lg max-w-sm">Join our platform to access hundreds of comprehensive courses created by industry experts.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 p-6 rounded-3xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0 border border-green-500/20">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Secure Authentication</h4>
                                            <p className="text-xs text-neutral-500">Your data is safe with our advanced security protocols.</p>
                                        </div>
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
