"use client";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Trash2, ShoppingCart, ArrowLeft, Loader2, Coins, Check, Sparkles, GraduationCap, Shield, Info, Edit2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { recordPurchase } from "@/lib/db";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import JSConfetti from 'js-confetti';
import { createRazorpayOrder, openRazorpayCheckout } from "@/lib/razorpay";
import { courses as staticCoursesData } from "@/data/courses";
import ModuleSelectionModal from "@/components/ModuleSelectionModal";

export default function CartPage() {
    const { cartItems, removeFromCart, updateCartItem, cartTotal, clearCart } = useCart();
    const { convertPrice, symbol, currency } = useCurrency();
    const { user, profile, refreshProfile } = useAuth();
    const router = useRouter();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [useCoins, setUseCoins] = useState(false);
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [paymentId, setPaymentId] = useState<string | null>(null);

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

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
            const totalInINR = currency === "INR" ? finalTotal : cartTotal * 83; // fallback USD->INR
            const amountInPaise = Math.round(totalInINR * 100);

            if (amountInPaise <= 0) {
                // Free order (entirely paid by coins) — skip Razorpay
                const promises = cartItems.map((item, index) => {
                    const isFirstItem = index === 0;
                    return recordPurchase(
                        user.uid,
                        item.id,
                        item.price, // Proportional price
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
            const courseSummary = cartItems.map(item => `${item.name} (${item.selectedModules.length} mods)`).join(", ");
            const order = await createRazorpayOrder(
                amountInPaise,
                "INR",
                `cart_${user.uid}_${Date.now()}`,
                { 
                    userId: user.uid, 
                    items: cartItems.length.toString(), 
                    courses: courseSummary.substring(0, 200),
                    moduleDetails: JSON.stringify(cartItems.map(i => ({ id: i.id, modules: i.selectedModules })))
                }
            );

            // Step 2: Open Razorpay checkout
            const result = await openRazorpayCheckout({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                description: `${cartItems.length} course${cartItems.length > 1 ? 's' : ''} with custom module selection`,
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
                    item.price, // Proportional price
                    currency,
                    isFirstItem ? rewardCoins : 0,
                    isFirstItem ? discountAmount : 0
                );
            });

            await Promise.all(promises);

            // Send Email Receipt
            try {
                const courseSummary = cartItems.map(item => item.name).join(", ");
                await fetch('/api/send-receipt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        userName: user.displayName || "Student",
                        courseName: courseSummary,
                        amount: `${symbol}${finalTotal.toLocaleString()}`,
                        paymentId: result.razorpay_payment_id || "Coin Purchase",
                        date: new Date().toLocaleDateString()
                    })
                });
            } catch (err) {
                console.error('Failed to send email receipt:', err);
            }

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

    const handleEditClick = (item: any) => {
        const fullCourse = staticCoursesData.find(c => c.id === item.id);
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

    if (success) {
        return (
            <>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
                <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
                    <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-[40px] max-w-lg w-full shadow-2xl animate-in zoom-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                            <Check className="w-10 h-10 text-green-500" />
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-accent font-bold text-xs uppercase tracking-widest">Enrollment Complete</span>
                            <Sparkles className="w-4 h-4 text-accent" />
                        </div>

                        <h1 className="text-4xl font-black mb-4 tracking-tighter">Welcome Aboard!</h1>
                        <p className="text-neutral-400 mb-8 leading-relaxed">Your custom course selection has been activated. Access your modules anytime via the dashboard.</p>

                        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 w-full mb-8">
                            <h3 className="text-xl font-bold text-accent mb-1">+{earnedCoins} EduCoins Reward</h3>
                            <p className="text-sm text-accent/70">Credentialed to your learning wallet</p>
                        </div>

                        <Link 
                            href={`/dashboard/${profile?.role || 'student'}`} 
                            className="w-full block bg-accent hover:bg-accent-light text-white font-bold py-5 px-8 rounded-full transition-all shadow-lg hover:shadow-accent/20"
                        >
                            Start Learning Now
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            
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

            <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
                <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
                    {/* Header */}
                    <div className="flex items-center gap-6 mb-16">
                        <Link href="/courses" className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all">
                            <ArrowLeft className="w-5 h-5 text-neutral-400" />
                        </Link>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-1" style={{ fontFamily: 'var(--font-syncopate)' }}>
                                Checkout
                            </h1>
                            <p className="text-neutral-500 text-sm italic font-light">Custom course purchasing & enrollment</p>
                        </div>
                    </div>

                    {/* Content */}
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-neutral-900/40 rounded-[40px] border border-neutral-800/60 border-dashed">
                            <ShoppingCart className="w-16 h-16 text-neutral-800 mb-6" />
                            <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
                            <p className="text-neutral-500 mb-10 max-w-sm text-center font-light leading-relaxed">Choose modules from your favorite courses to begin your customized learning path.</p>
                            <Link href="/courses" className="bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-accent-light transition-all shadow-lg">
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_400px] gap-12">
                            {/* Cart Items List */}
                            <div className="flex flex-col gap-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="relative group bg-neutral-900/60 p-6 md:p-8 rounded-[40px] border border-neutral-800 transition-all hover:border-neutral-700">
                                        <div className="flex flex-col sm:flex-row gap-8 items-start">
                                            <div
                                                className="w-full sm:w-40 h-40 sm:h-32 rounded-3xl bg-cover bg-center shrink-0 border border-white/5 shadow-2xl"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="flex-1 min-w-0 w-full pt-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-xl md:text-2xl text-white mb-2 leading-tight">{item.name}</h3>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-md text-[10px] text-accent font-black uppercase tracking-widest">
                                                                {item.selectedModules.length} Modules Selected
                                                            </span>
                                                            <span className="px-2.5 py-1 bg-neutral-800 text-neutral-400 rounded-md text-[10px] font-black uppercase tracking-widest">
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => handleEditClick(item)}
                                                            className="p-3 text-neutral-600 hover:text-accent hover:bg-accent/10 rounded-full transition-all shrink-0"
                                                            title="Edit Selection"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-3 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all shrink-0"
                                                            aria-label="Remove"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2 mb-6">
                                                    <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Info className="w-3.5 h-3.5" /> Module Details:
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.selectedModules.map((mod, i) => (
                                                            <span key={i} className="text-xs text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full">
                                                                {mod}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-neutral-800 pt-6 mt-6">
                                                    <p className="text-neutral-500 text-xs font-medium italic">Proportional Price</p>
                                                    <p className="text-2xl font-black text-white">
                                                        {symbol}{convertPrice((item.price / (item.totalModulesCount || 1)) * item.selectedModules.length).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 h-fit sticky top-32 shadow-2xl">
                                <h3 className="text-xl font-black mb-8 tracking-widest uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-neutral-500 text-sm font-medium">
                                        <span>Proportional Subtotal</span>
                                        <span>{symbol}{rawTotal.toLocaleString()}</span>
                                    </div>
                                    
                                    {user && profile && availableCoins > 0 && (
                                        <div className="py-6 border-y border-neutral-800 my-6">
                                            <div className="bg-accent/5 border border-accent/20 p-5 rounded-2xl">
                                                <div className="flex items-center justify-between mb-3 text-accent text-sm font-bold">
                                                    <div className="flex items-center gap-2">
                                                        <Coins className="w-4 h-4" />
                                                        <span>EduCoins Wallet</span>
                                                    </div>
                                                    <span>{availableCoins}</span>
                                                </div>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${useCoins ? 'bg-accent border-accent' : 'border-neutral-700 group-hover:border-neutral-600'}`}>
                                                        {useCoins && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={useCoins}
                                                        onChange={(e) => setUseCoins(e.target.checked)}
                                                        className="hidden"
                                                    />
                                                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Apply Coins Index</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {useCoins && discountAmount > 0 && (
                                        <div className="flex justify-between items-center text-accent text-sm font-bold">
                                            <span>Coin Discount</span>
                                            <span>-{symbol}{discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-end mb-10 pt-2">
                                    <span className="text-xs text-neutral-500 font-black uppercase tracking-widest mb-1.5 block">Final Amount</span>
                                    <div className="text-right">
                                        <span className="text-4xl font-black text-white tracking-tighter leading-none">{symbol}{finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl mb-8">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-neutral-500 font-bold uppercase tracking-widest">Est. Rewards</span>
                                        <span className="text-accent font-black">+{calculateReward()} Coins</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-accent hover:bg-accent-light text-white font-black py-5 rounded-full transition-all uppercase tracking-[0.2em] text-xs shadow-xl hover:shadow-accent/30 disabled:opacity-50 flex items-center justify-center gap-3 group"
                                >
                                    {isCheckingOut ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing Order</> : <><ShoppingCart className="w-4 h-4 transition-transform group-hover:-translate-y-1" /> Secure Checkout</>}
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-6">
                                    <Shield className="w-3.5 h-3.5 text-neutral-700" />
                                    <p className="text-[10px] text-neutral-700 font-black uppercase tracking-tighter">Verified Secure Gateway</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
