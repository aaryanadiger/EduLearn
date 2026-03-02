"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="relative w-full py-40 md:py-64 bg-accent flex flex-col items-center justify-center overflow-hidden font-syncopate bg-gradient-to-t from-accent to-[#e65400] transition-colors">
            <Link
                href="/signup"
                className="group relative flex flex-col items-center text-center px-6 transition-transform hover:scale-[1.02] duration-500 z-10"
            >
                <h2 className="text-[12vw] font-black uppercase text-black leading-none m-0 p-0 tracking-tighter flex items-center justify-center gap-4 hover:text-white transition-colors duration-500">
                    START
                </h2>

                <h2 className="text-[14vw] font-black uppercase text-black leading-none m-0 p-0 tracking-tighter flex items-center justify-center gap-4 group-hover:text-white transition-colors duration-500 relative">
                    YOUR
                    <ArrowUpRight className="w-16 h-16 md:w-32 md:h-32 text-black group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 group-hover:translate-x-4 absolute -right-20 md:-right-40 top-1/2 -translate-y-1/2" />
                </h2>

                <h2 className="text-[12vw] font-black uppercase text-black leading-none m-0 p-0 tracking-tighter mt-2 group-hover:text-white transition-colors duration-500">
                    JOURNEY
                </h2>

                {/* Glow effect behind text */}
                <div className="absolute inset-0 bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[100%] scale-150"></div>
            </Link>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 blur-[100px] rounded-full pointer-events-none mix-blend-overlay"></div>
        </section>
    );
}
