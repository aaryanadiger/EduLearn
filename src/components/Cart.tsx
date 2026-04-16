"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingCart, Edit2, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { courses } from "@/data/courses";
import ModuleSelectionModal from "./ModuleSelectionModal";

export default function Cart() {
    const { cartItems, removeFromCart, updateCartItem, isCartOpen, setIsCartOpen, cartTotal } = useCart();
    const { symbol, convertPrice } = useCurrency();
    const router = useRouter();

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isCartOpen]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        router.push("/cart");
    };

    const handleEditClick = (item: any) => {
        // Find full course data for the modal
        const fullCourse = courses.find(c => c.id === item.id);
        if (fullCourse) {
            setEditingItem({ ...item, modules: fullCourse.modules });
            setIsEditModalOpen(true);
        }
    };

    const handleUpdateConfirm = (selectedModules: string[]) => {
        if (editingItem) {
            updateCartItem(editingItem.id, selectedModules);
        }
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-neutral-950 border-l border-neutral-800 z-50 flex flex-col shadow-2xl pointer-events-auto transform transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <h2 className="text-xl font-bold flex items-center gap-2 font-syncopate">
                        <ShoppingCart className="w-5 h-5 text-accent" />
                        YOUR CART
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-4">
                            <ShoppingCart className="w-12 h-12 opacity-20" />
                            <p className="font-light italic">Your journey hasn&apos;t started yet.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const perModulePrice = item.price / item.selectedModules.length; // Proportional price
                            const itemPrice = (item.price / (courses.find(c => c.id === item.id)?.modules.length || item.selectedModules.length)) * item.selectedModules.length;
                            
                            return (
                                <div key={item.id} className="group relative bg-neutral-900/50 p-5 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-all">
                                    <div className="flex gap-5 items-start">
                                        <div
                                            className="w-20 h-20 rounded-2xl bg-cover bg-center shrink-0 border border-white/5 shadow-lg"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-sm text-white truncate leading-tight pr-2">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1.5 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="mt-2 flex items-baseline gap-2">
                                                <span className="text-accent font-bold text-lg">{symbol}{convertPrice(item.price).toLocaleString()}</span>
                                                <span className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">
                                                    {item.selectedModules.length} Modules
                                                </span>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {item.selectedModules.slice(0, 3).map((mod, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded-md text-[9px] text-neutral-500 font-medium truncate max-w-[100px]">
                                                        {mod}
                                                    </span>
                                                ))}
                                                {item.selectedModules.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded-md text-[9px] text-neutral-500 font-medium">
                                                        +{item.selectedModules.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            <button 
                                                onClick={() => handleEditClick(item)}
                                                className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-accent hover:text-accent-light uppercase tracking-widest transition-colors"
                                            >
                                                <Edit2 className="w-3 h-3" /> Edit Selection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-neutral-800 bg-neutral-950">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">Subtotal</span>
                            <span className="text-3xl font-bold font-syncopate text-white">{symbol}{convertPrice(cartTotal).toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold flex items-center gap-1 justify-end">
                                <Info className="w-3 h-3" /> Secure Enrollment
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className="w-full bg-accent hover:bg-accent-light text-white font-bold py-5 rounded-full shadow-[0_10px_40px_rgba(255,94,0,0.15)] hover:shadow-[0_15px_50px_rgba(255,94,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-3"
                    >
                        Checkout Now <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Edit Selection Modal */}
            {editingItem && (
                <ModuleSelectionModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleUpdateConfirm}
                    course={editingItem}
                    initialSelectedModules={editingItem.selectedModules}
                    isUpdate={true}
                />
            )}
        </>
    );
}

