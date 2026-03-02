"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useEffect } from "react";

export default function Cart() {
    const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-neutral-950 border-l border-neutral-800 z-50 flex flex-col shadow-2xl pointer-events-auto transform transition-transform duration-300">
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
                            <p>Your journey haven&apos;t started yet.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                                <div
                                    className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                    <p className="text-accent font-medium mt-1">${item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-3 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-neutral-800 bg-black">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-neutral-400">Total</span>
                        <span className="text-2xl font-bold font-syncopate text-white">${cartTotal}</span>
                    </div>
                    <button
                        disabled={cartItems.length === 0}
                        className="w-full bg-accent hover:bg-accent-light text-black font-bold py-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                    >
                        Secure Checkout
                    </button>
                </div>
            </div>
        </>
    );
}
