"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, GraduationCap, User as UserIcon, Coins, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";

export function TopNav() {
    const { cartItems } = useCart();
    const { currency, setCurrency } = useCurrency();
    const { user, profile, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === '/';

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-end items-center pointer-events-none ${isHome ? 'mix-blend-difference' : ''}`}>
            <div className="flex items-center gap-6 pointer-events-auto">

                <Link
                    href="/cart"
                    className="relative text-white hover:text-white/80 transition-colors block"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black rounded-full text-[10px] font-bold flex items-center justify-center translate-x-1.5 -translate-y-1.5">
                            {cartItems.length}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-3 pr-1.5 py-1.5">
                        <div className="flex items-center gap-1.5">
                            <Coins className="w-4 h-4 text-accent" />
                            <span className="text-white font-bold text-sm tracking-widest">{profile?.educoins || 0}</span>
                        </div>
                        <div className="w-px h-6 bg-white/20" />
                        <Link
                            href={`/dashboard/${profile?.role || 'student'}`}
                            className="bg-accent text-black rounded-full px-3 py-1.5 hover:bg-white transition-colors flex items-center gap-2"
                        >
                            <span className="text-sm font-bold max-w-[100px] truncate">{profile?.name || user?.displayName || 'Student'}</span>
                            <UserIcon className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={async () => {
                                await logout();
                                router.push('/');
                            }}
                            className="text-white hover:text-red-400 transition-colors p-1 ml-1"
                            title="Log Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${isHome
                                ? 'border border-white/30 text-white hover:bg-white hover:text-black'
                                : 'bg-white text-black hover:bg-neutral-200'
                                }`}
                        >
                            Sign Up
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export function BottomNav() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (pathname !== '/') return;

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const showCap = pathname !== '/' || isScrolled;

    const items = [
        { label: "About Us", href: "/about" },
        { label: "Features", href: "/features" },
        { label: "Courses", href: "/courses" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Pricing", href: "/pricing" }
    ];

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md"
        >
            <div className="flex items-center p-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
                <div
                    className={`overflow-hidden whitespace-nowrap hidden md:flex items-center justify-center transition-all duration-500 ease-out border-white/10 ${showCap ? 'w-12 opacity-100 px-2 border-r' : 'w-0 opacity-0 px-0 border-r-0'}`}
                >
                    <Link href="/" className="block pointer-events-auto p-1.5 transition-colors">
                        <GraduationCap className="w-5 h-5 text-white hover:text-accent transition-colors" />
                    </Link>
                </div>

                <div className="flex items-center gap-1 pl-1">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 relative group whitespace-nowrap"
                        >
                            {item.label}
                            <span className="absolute inset-0 rounded-full ring-1 ring-white/0 group-hover:ring-white/20 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
