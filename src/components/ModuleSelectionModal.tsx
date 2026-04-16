"use client";

import { useState, useEffect } from "react";
import { X, Check, ShoppingCart, PlayCircle, Info } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface ModuleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedModules: string[]) => void;
    course: {
        id: string;
        name: string;
        price: number;
        modules: string[];
        image: string;
    };
    initialSelectedModules?: string[];
    isUpdate?: boolean;
}

export default function ModuleSelectionModal({
    isOpen,
    onClose,
    onConfirm,
    course,
    initialSelectedModules = [],
    isUpdate = false,
}: ModuleSelectionModalProps) {
    const [selectedModules, setSelectedModules] = useState<string[]>(initialSelectedModules);
    const { convertPrice, symbol } = useCurrency();

    useEffect(() => {
        if (isOpen) {
            setSelectedModules(initialSelectedModules.length > 0 ? initialSelectedModules : course.modules);
        }
    }, [isOpen, initialSelectedModules, course.modules]);

    if (!isOpen) return null;

    const toggleModule = (module: string) => {
        setSelectedModules((prev) =>
            prev.includes(module)
                ? prev.filter((m) => m !== module)
                : [...prev, module]
        );
    };

    const selectAll = () => setSelectedModules(course.modules);
    const selectNone = () => setSelectedModules([]);

    const perModulePrice = course.price / course.modules.length;
    const totalPrice = perModulePrice * selectedModules.length;

    const handleConfirm = () => {
        if (selectedModules.length === 0) {
            alert("Please select at least one module.");
            return;
        }
        onConfirm(selectedModules);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
                {/* Header */}
                <div className="relative p-8 border-b border-neutral-800 flex justify-between items-start">
                    <div className="flex-1 pr-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                                Module Selection
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight line-clamp-2">
                            {course.name}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-all shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-neutral-400 text-sm italic">
                            Select the specific modules you wish to purchase:
                        </p>
                        <div className="flex gap-4">
                            <button onClick={selectAll} className="text-xs font-bold text-accent hover:underline">Select All</button>
                            <button onClick={selectNone} className="text-xs font-bold text-neutral-500 hover:text-white">Clear All</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {course.modules.map((mod, i) => (
                            <label
                                key={i}
                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                                    selectedModules.includes(mod)
                                        ? "bg-accent/5 border-accent/30"
                                        : "bg-neutral-950 border-neutral-800 hover:border-neutral-700"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                                        selectedModules.includes(mod)
                                            ? "bg-accent border-accent"
                                            : "bg-transparent border-neutral-700 group-hover:border-neutral-500"
                                    }`}>
                                        {selectedModules.includes(mod) && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-xs font-bold text-neutral-500">
                                            {i + 1}
                                        </div>
                                        <span className={`font-medium transition-colors ${selectedModules.includes(mod) ? "text-white" : "text-neutral-400"}`}>
                                            {mod}
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedModules.includes(mod)}
                                    onChange={() => toggleModule(mod)}
                                />
                                <PlayCircle className={`w-5 h-5 transition-opacity ${selectedModules.includes(mod) ? "opacity-40 text-accent" : "opacity-0"}`} />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-neutral-800 bg-neutral-950/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white">{symbol}{convertPrice(totalPrice).toLocaleString()}</span>
                                <span className="text-neutral-500 text-sm">for {selectedModules.length} modules</span>
                            </div>
                            <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold mt-1 flex items-center gap-1">
                                <Info className="w-3 h-3" /> Based on proportional pricing
                            </p>
                        </div>
                        <button
                            onClick={handleConfirm}
                            disabled={selectedModules.length === 0}
                            className="w-full sm:w-auto px-10 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,94,0,0.2)] hover:shadow-[0_0_50px_rgba(255,94,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {isUpdate ? "Update Selection" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
