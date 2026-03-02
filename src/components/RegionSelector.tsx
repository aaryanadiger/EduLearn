"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useCurrency, CurrencyCode } from "@/context/CurrencyContext";

const regions: { value: CurrencyCode; label: string }[] = [
    { value: "INR", label: "IN (₹)" },
    { value: "USD", label: "US ($)" },
    { value: "EUR", label: "EU (€)" },
    { value: "GBP", label: "UK (£)" },
    { value: "AUD", label: "AU (A$)" },
    { value: "CAD", label: "CA (C$)" },
];

export function RegionSelector() {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedRegion = regions.find(r => r.value === currency) || regions[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors cursor-pointer bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800 shrink-0 font-bold text-sm"
            >
                <Globe className="w-4 h-4" />
                <span>{selectedRegion.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform text-neutral-500 min-w-4 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-black border border-neutral-800 shadow-xl z-50 overflow-hidden">
                    <div className="flex flex-col">
                        {regions.map((region) => (
                            <button
                                key={region.value}
                                onClick={() => {
                                    setCurrency(region.value);
                                    setIsOpen(false);
                                }}
                                className={`text-left px-4 py-2 text-sm font-bold transition-colors ${currency === region.value
                                    ? "bg-[#4B70F5] text-white" // Using the blue from the screenshot
                                    : "text-white/80 hover:bg-neutral-900 hover:text-white"
                                    }`}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
