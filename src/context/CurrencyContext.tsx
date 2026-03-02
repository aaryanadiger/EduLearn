"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
    symbol: string;
    rate: number;
    convertPrice: (priceUSD: number) => number;
}

const exchangeRates: Record<CurrencyCode, number> = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
    AUD: 1.52,
    CAD: 1.36
};

const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    AUD: 'A$',
    CAD: 'C$'
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<CurrencyCode>('INR'); // Default to INR based on old codebase or user preference
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
        const storedCurrency = localStorage.getItem('currency') as CurrencyCode | null;
        if (storedCurrency && exchangeRates[storedCurrency]) {
            setCurrencyState(storedCurrency);
        }
    }, []);

    const setCurrency = (newCurrency: CurrencyCode) => {
        setCurrencyState(newCurrency);
        localStorage.setItem('currency', newCurrency);
    };

    const rate = exchangeRates[currency];
    const symbol = currencySymbols[currency];

    const convertPrice = (priceUSD: number) => {
        return Math.round(priceUSD * rate);
    };

    return (
        <CurrencyContext.Provider value={{
            currency: isMounted ? currency : 'INR',
            setCurrency,
            symbol: isMounted ? symbol : '₹',
            rate,
            convertPrice
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
