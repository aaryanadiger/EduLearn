"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number; // Original full price
    image: string;
    category: string;
    selectedModules: string[];
    totalModulesCount: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (course: any, selectedModules: string[]) => void;
    removeFromCart: (courseId: string) => void;
    updateCartItem: (courseId: string, selectedModules: string[]) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const calculateItemPrice = (item: CartItem) => {
        if (item.totalModulesCount === 0) return item.price;
        return (item.price / item.totalModulesCount) * item.selectedModules.length;
    };

    const addToCart = (course: any, selectedModules: string[]) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === course.id);
            if (existingItem) {
                // Update selection if already in cart
                return prev.map((item) =>
                    item.id === course.id
                        ? { ...item, selectedModules }
                        : item
                );
            }
            const newItem: CartItem = {
                id: course.id,
                name: course.name,
                price: course.price,
                image: course.image,
                category: course.category,
                selectedModules,
                totalModulesCount: course.modules.length,
            };
            return [...prev, newItem];
        });
        setIsCartOpen(true);
    };

    const updateCartItem = (courseId: string, selectedModules: string[]) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === courseId ? { ...item, selectedModules } : item
            )
        );
    };

    const removeFromCart = (courseId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== courseId));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => {
        return total + calculateItemPrice(item);
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItem,
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
