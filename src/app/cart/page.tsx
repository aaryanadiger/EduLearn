"use client";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Trash2, ShoppingCart, ArrowLeft, Loader2, Coins, Check, Sparkles, GraduationCap, Shield } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { recordPurchase } from "@/lib/db";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import JSConfetti from 'js-confetti';
import { createRazorpayOrder, openRazorpayCheckout } from "@/lib/razorpay";

export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const { convertPrice, symbol, currency } = useCurrency();
    const { user, profile, refreshProfile } = useAuth();
    const router = useRouter();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [useCoins, setUseCoins] = useState(false);
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [paymentId, setPaymentId] = useState<string | null>(null);

    const availableCoins = profile?.educoins || 0;

    // Calculate 10% reward on the raw subtotal price
    const calculateReward = () => {
        const rawTotal = convertPrice(cartTotal);
        return Math.floor(rawTotal * 0.10);
    };

    // Calculate maximum discount applicable (1 coin = 1 currency unit)
    const rawTotal = convertPrice(cartTotal);
    const maxDiscount = Math.min(availableCoins, rawTotal);
    const discountAmount = useCoins ? maxDiscount : 0;
    const finalTotal = Math.max(0, rawTotal - discountAmount);

    useEffect(() => {
        if (success) {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['🎉', '🪙', '✨', '🎓'],
                emojiSize: 50,
                confettiNumber: 100,
            });
        }
    }, [success]);

    const handleCheckout = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (cartItems.length === 0) return;

        setIsCheckingOut(true);
        try {
            const rewardCoins = calculateReward();
            setEarnedCoins(rewardCoins);

            // Convert final total to INR paise for Razorpay
            // finalTotal is already in the user's selected currency, convert to INR
            const totalInINR = currency === "INR" ? finalTotal : cartTotal * 83; // fallback USD->INR
            const amountInPaise = Math.round(totalInINR * 100);

            if (amountInPaise <= 0) {
                // Free order (entirely paid by coins) — skip Razorpay
                const promises = cartItems.map((item, index) => {
                    const isFirstItem = index === 0;
                    return recordPurchase(
                        user.uid,
                        item.id,
                        item.price,
                        currency,
                        isFirstItem ? rewardCoins : 0,
                        isFirstItem ? discountAmount : 0
                    );
                });
                await Promise.all(promises);
                await refreshProfile();
                setSuccess(true);
                clearCart();
                return;
            }

            // Step 1: Create Razorpay order
            const courseNames = cartItems.map(item => item.name).join(", ");
            const order = await createRazorpayOrder(
                amountInPaise,
                "INR",
                `cart_${user.uid}_${Date.now()}`,
                { userId: user.uid, items: cartItems.length.toString(), courses: courseNames.substring(0, 200) }
            );

            // Step 2: Open Razorpay checkout
            const result = await openRazorpayCheckout({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                description: `${cartItems.length} course${cartItems.length > 1 ? 's' : ''} from EduLearn`,
                userName: user.displayName || "Student",
                userEmail: user.email || "",
            });

            // Step 3: Payment succeeded — record all purchases
            setPaymentId(result.razorpay_payment_id);

            const promises = cartItems.map((item, index) => {
                const isFirstItem = index === 0;
                return recordPurchase(
                    user.uid,
                    item.id,
                    item.price,
                    currency,
                    isFirstItem ? rewardCoins : 0,
                    isFirstItem ? discountAmount : 0
                );
            });

            await Promise.all(promises);
            await refreshProfile();
            setSuccess(true);
            clearCart();

        } catch (error: any) {
            if (error.message !== "Payment cancelled by user") {
                alert("Payment failed: " + error.message);
            }
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (success) {
        return (
            <>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
                <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
                    <div className="bg-neutral-900/80 backdrop-blur-xl p-12 flex flex-col items-center justify-center text-center border border-accent/20 rounded-[40px] max-w-lg w-full shadow-[0_0_80px_rgba(255,94,0,0.1)]">
                        {/* Animated success ring */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-2 rounded-full border border-accent/20 animate-pulse" style={{ animationDuration: '3s' }} />
                            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                                <Check className="w-8 h-8 text-accent" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-accent font-bold text-xs uppercase tracking-widest">Payment Successful</span>
                            <Sparkles className="w-4 h-4 text-accent" />
                        </div>

                        <h1 className="text-3xl font-black mb-4 tracking-tighter">Courses Unlocked!</h1>
                        <p className="text-neutral-400 mb-6">Your courses have been successfully added to your account. Start learning right away.</p>

                        {paymentId && (
                            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3 mb-6 w-full">
                                <p className="text-xs text-neutral-500 mb-1">Transaction ID</p>
                                <p className="text-sm text-neutral-300 font-mono truncate">{paymentId}</p>
                            </div>
                        )}

                        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 w-full mb-8">
                            <Coins className="w-8 h-8 text-accent mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-accent mb-1">+{earnedCoins} EduCoins Earned!</h3>
                            <p className="text-sm text-accent/70">Added to your Wallet</p>
                        </div>

                        <Link href={`/dashboard/${profile?.role || 'student'}`} className="w-full block text-center bg-accent hover:bg-accent-light text-white font-bold py-4 px-8 rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,94,0,0.3)]">
                            Go to Dashboard
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
                <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <Link href="/" className="p-3 bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors group">
                            <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Checkout
                        </h1>
                    </div>

                    {/* Content */}
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-neutral-900/50 rounded-3xl border border-neutral-800/50">
                            <ShoppingCart className="w-16 h-16 text-neutral-700 mb-6" />
                            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                            <p className="text-neutral-500 mb-8 max-w-sm text-center">It looks like you haven&apos;t added any courses to your journey yet.</p>
                            <Link href="/courses" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                                Explore Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-[1fr_350px] gap-12">
                            {/* Cart Items List */}
                            <div className="flex flex-col gap-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-neutral-900/80 p-6 rounded-3xl border border-neutral-800 transition-colors hover:border-neutral-700">
                                        <div
                                            className="w-full sm:w-32 h-40 sm:h-24 rounded-2xl bg-cover bg-center shrink-0 border border-white/5"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className="flex-1 min-w-0 w-full">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="font-bold text-lg md:text-xl text-white mb-1 line-clamp-2">{item.name}</h3>
                                                    <p className="text-accent font-bold">{symbol}{(convertPrice(item.price)).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-3 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors shrink-0"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="bg-neutral-900/50 rounded-3xl p-8 border border-neutral-800/50 h-fit sticky top-32">
                                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-syncopate)' }}>Summary</h3>

                                <div className="flex justify-between items-center mb-4 text-neutral-400">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>{symbol}{rawTotal.toLocaleString()}</span>
                                </div>

                                {user && profile && availableCoins > 0 && (
                                    <div className="mb-6 bg-accent/5 border border-accent/20 p-4 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Coins className="w-4 h-4 text-accent" />
                                                <span className="font-bold text-accent">EduCoins</span>
                                            </div>
                                            <span className="text-accent text-sm font-medium">{availableCoins} Available</span>
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useCoins}
                                                onChange={(e) => setUseCoins(e.target.checked)}
                                                className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-accent focus:ring-accent focus:ring-offset-neutral-900"
                                            />
                                            <span className="text-sm text-neutral-300">Apply maximum discount (-{symbol}{discountAmount.toLocaleString()})</span>
                                        </label>
                                    </div>
                                )}

                                {useCoins && discountAmount > 0 && (
                                    <div className="flex justify-between items-center mb-4 text-accent">
                                        <span>Coin Discount</span>
                                        <span>-{symbol}{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center py-6 border-t border-neutral-800 mb-2">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="text-3xl font-black text-white tracking-tighter">{symbol}{finalTotal.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center mb-6 text-sm text-accent">
                                    <span>Est. EduCoin Reward</span>
                                    <span className="font-bold">+{calculateReward()} Coins</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full flex justify-center items-center gap-2 bg-accent hover:bg-accent-light hover:scale-[1.02] text-white font-bold py-4 rounded-full transition-all uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,94,0,0.2)] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isCheckingOut ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Proceed to Payment"}
                                </button>

                                <div className="flex items-center justify-center gap-1.5 mt-4">
                                    <Shield className="w-3.5 h-3.5 text-neutral-600" />
                                    <p className="text-xs text-neutral-600 font-light">Secure payment via Razorpay</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
