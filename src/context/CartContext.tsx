"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Course {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export interface CartContextType {
    cartItems: Course[];
    addToCart: (course: Course) => void;
    removeFromCart: (courseId: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<Course[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (course: Course) => {
        setCartItems((prev) => {
            // Check if already in cart
            if (prev.find((item) => item.id === course.id)) {
                return prev; // Don't add duplicates
            }
            return [...prev, course];
        });
        setIsCartOpen(true); // Open cart auto when item added
    };

    const removeFromCart = (courseId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== courseId));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
