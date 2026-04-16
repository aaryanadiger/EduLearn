"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { getCourseReviews, addReview, updateReview, deleteReview, Review, recordPurchase, getUserPurchases, getCourseProgress, updateCourseProgress } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Clock, BookOpen, Users, Globe, CheckCircle2, PlayCircle, Star, Edit2, Trash2, X, Check, Loader2, Sparkles, GraduationCap, Shield, ShoppingCart, Info, Award, Circle } from "lucide-react";
import Script from "next/script";
import JSConfetti from 'js-confetti';
import { createRazorpayOrder, openRazorpayCheckout } from "@/lib/razorpay";

export default function CourseDetail() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const course = courses.find(c => c.id === courseId);

    const { user } = useAuth();
    const { convertPrice, symbol, currency } = useCurrency();
    const { addToCart } = useCart();
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReviewText, setNewReviewText] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);

    // Module Selection/Progress State
    const [selectedModules, setSelectedModules] = useState<string[]>(course?.modules || []);
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);

    // Edit State
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editReviewText, setEditReviewText] = useState("");
    const [editReviewRating, setEditReviewRating] = useState(5);
    const [editHoveredRating, setEditHoveredRating] = useState(0);

    // Delete State
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

    // Payment/Enrollment State
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showOrderAccepted, setShowOrderAccepted] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentId, setPaymentId] = useState<string | null>(null);

    useEffect(() => {
        if (courseId) {
            getCourseReviews(courseId).then(setReviews);
        }
    }, [courseId]);

    useEffect(() => {
        const checkStatus = async () => {
            if (user && courseId) {
                const purchases = await getUserPurchases(user.uid);
                const enrolled = purchases.some((p: any) => p.courseId === courseId);
                setIsEnrolled(enrolled);

                if (enrolled) {
                    const progress = await getCourseProgress(user.uid, courseId);
                    setCompletedModules(progress);
                }
            }
            setIsCheckingEnrollment(false);
        };

        if (user) {
            checkStatus();
        } else {
            setIsCheckingEnrollment(false);
        }
    }, [user, courseId]);

    useEffect(() => {
        if (course && !isEnrolled) {
            setSelectedModules(course.modules);
        }
    }, [course, isEnrolled]);

    const toggleModuleSelection = (mod: string) => {
        if (isEnrolled) return; // Cannot change selection after enrollment
        setSelectedModules(prev => 
            prev.includes(mod) 
                ? prev.filter(m => m !== mod) 
                : [...prev, mod]
        );
    };

    const toggleModuleCompletion = async (mod: string) => {
        if (!user || !isEnrolled) return;

        const isNowCompleted = !completedModules.includes(mod);
        
        // Optimistic UI update
        setCompletedModules(prev => 
            isNowCompleted ? [...prev, mod] : prev.filter(m => m !== mod)
        );

        const success = await updateCourseProgress(user.uid, courseId!, mod, isNowCompleted);
        if (!success) {
            // Revert on failure
            setCompletedModules(prev => 
                isNowCompleted ? prev.filter(m => m !== mod) : [...prev, mod]
            );
            alert("Failed to update progress. Please check your connection.");
        } else if (isNowCompleted && completedModules.length + 1 === course?.modules.length) {
            // Course just completed!
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['🎓', '🏆', '🔥', '✨'],
                confettiNumber: 150,
            });
        }
    };

    const perModulePrice = course ? course.price / course.modules.length : 0;
    const currentPrice = perModulePrice * selectedModules.length;
    const displayPrice = convertPrice(currentPrice);

    const handleEnrollment = async () => {
        if (!user) {
            alert("Please login to enroll in this course.");
            return;
        }

        if (selectedModules.length === 0) {
            alert("Please select at least one module to enroll.");
            return;
        }

        if (isEnrolled) {
            router.push('/dashboard/student');
            return;
        }

        setIsProcessingPayment(true);

        try {
            // Convert price to INR paise (Razorpay requires smallest currency unit)
            const priceInINR = currentPrice * 83; // USD to INR
            const amountInPaise = Math.round(priceInINR * 100);

            // Step 1: Create order on server
            const order = await createRazorpayOrder(
                amountInPaise,
                "INR",
                `course_${courseId}_${Date.now()}`,
                { courseId, courseName: course!.name, userId: user.uid, modules: selectedModules.join(",") }
            );

            // Step 2: Open Razorpay checkout
            const result = await openRazorpayCheckout({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                courseName: course!.name,
                description: `Enrollment for ${selectedModules.length} module(s) of ${course!.name}`,
                userName: user.displayName || "Student",
                userEmail: user.email || "",
            });

            // Step 3: Payment succeeded
            setPaymentId(result.razorpay_payment_id);
            setIsEnrolled(true);
            setShowOrderAccepted(true);

            // Record purchase in Firestore
            const coinsEarned = Math.floor(priceInINR * 0.10);
            await recordPurchase(user.uid, courseId, currentPrice, "INR", coinsEarned, 0);

            try {
                await fetch('/api/send-receipt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        userName: user.displayName || "Student",
                        courseName: course!.name,
                        amount: `${symbol}${displayPrice.toLocaleString()}`,
                        paymentId: result.razorpay_payment_id,
                        date: new Date().toLocaleDateString()
                    })
                });
            } catch (err) {
                console.error('Failed to send email receipt:', err);
            }

            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['🎓', '🎉', '🌟', '✨', '💻'],
                confettiNumber: 100,
            });

        } catch (error: any) {
            if (error.message !== "Payment cancelled by user") {
                alert("Payment failed: " + error.message);
            }
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handleAddToCart = () => {
        if (selectedModules.length === 0) {
            alert("Please select at least one module.");
            return;
        }
        addToCart(course, selectedModules);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("You must be logged in to review.");
        if (!newReviewText.trim()) return alert("Review text cannot be empty.");

        setIsSubmitting(true);
        const result = await addReview({
            courseId,
            userId: user.uid,
            userName: user.displayName || "Anonymous User",
            rating: newReviewRating,
            text: newReviewText,
        });

        if (result.success) {
            setNewReviewText("");
            setNewReviewRating(5);
            getCourseReviews(courseId).then(setReviews);
        } else {
            alert(`Failed to add review: ${result.error}`);
        }
        setIsSubmitting(false);
    };

    const handleEditStart = (review: Review) => {
        setEditingReviewId(review.id!);
        setEditReviewText(review.text);
        setEditReviewRating(review.rating);
    };

    const handleEditCancel = () => {
        setEditingReviewId(null);
        setEditReviewText("");
        setEditReviewRating(5);
    };

    const handleUpdateReview = async (reviewId: string) => {
        if (!editReviewText.trim()) return alert("Review text cannot be empty.");
        setIsSubmitting(true);
        const result = await updateReview(reviewId, editReviewText, editReviewRating);
        if (result.success) {
            handleEditCancel();
            getCourseReviews(courseId).then(setReviews);
        } else {
            alert(`Failed to update review: ${result.error}`);
        }
        setIsSubmitting(false);
    };

    const handleDeleteReview = (reviewId: string) => {
        setReviewToDelete(reviewId);
    };

    const confirmDeleteReview = async () => {
        if (!reviewToDelete) return;
        setIsSubmitting(true);
        const result = await deleteReview(reviewToDelete);
        if (result.success) {
            getCourseReviews(courseId).then(setReviews);
        } else {
            alert(`Failed to delete review: ${result.error}`);
        }
        setIsSubmitting(false);
        setReviewToDelete(null);
    };

    const realReviewsCount = reviews.length;
    const realRatingPoints = reviews.reduce((sum, r) => sum + r.rating, 0);
    const dynamicRating = course ? (realReviewsCount > 0 ? realRatingPoints / realReviewsCount : course.rating) : 0;
    const totalReviewsCount = realReviewsCount > 0 ? realReviewsCount : 124;
    const formattedReviewsCount = totalReviewsCount >= 1000 ? (totalReviewsCount / 1000).toFixed(1) + "k" : totalReviewsCount.toString();
    const hasReviewed = user && reviews.some(r => r.userId === user.uid);


    if (!course) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <h1 className="text-4xl font-bold">Course Not Found</h1>
            </div>
        );
    }

    const progressPercentage = Math.round((completedModules.length / (course?.modules.length || 1)) * 100);

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                {/* Hero Section */}
                <div className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto border-b border-neutral-800 mb-20">
                    <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-accent/10 to-transparent -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-white uppercase tracking-wider mb-6 inline-block">
                                {course.category}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight text-white">
                                {course.name}
                            </h1>

                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300 font-medium mb-12">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-accent" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-accent" />
                                    <span>{course.level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span>{course.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-accent" />
                                    <span>{course.languages.join(", ")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment/Progress Card */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundImage: `url(${course.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-end pt-40">
                                {isEnrolled ? (
                                    <div className="mb-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-black uppercase tracking-widest text-accent">Your Learning Journey</span>
                                            <span className="text-2xl font-black text-white italic">{progressPercentage}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                                            <div 
                                                className="h-full bg-accent rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,94,0,0.3)]"
                                                style={{ width: `${progressPercentage}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] text-neutral-500 mt-4 text-center uppercase tracking-[0.2em] font-bold">
                                            {completedModules.length} of {course.modules.length} modules completed
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col mb-8">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-5xl font-bold text-white">{symbol}{displayPrice.toLocaleString()}</span>
                                            <div className="flex items-center gap-1 text-accent">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-5 h-5 ${i < Math.round(dynamicRating) ? 'fill-current' : 'text-neutral-600'}`} />
                                                ))}
                                                <span className="text-white ml-2 text-sm">{dynamicRating.toFixed(1)} ({formattedReviewsCount})</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest flex items-center gap-2">
                                            <Info className="w-3.5 h-3.5" /> {selectedModules.length} Modules Selected
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleEnrollment}
                                        disabled={isProcessingPayment || (isEnrolled && progressPercentage === 100)}
                                        className={`w-full py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group/btn ${isEnrolled
                                                ? 'bg-white text-black hover:bg-neutral-200'
                                                : 'bg-accent text-white hover:bg-accent-light hover:shadow-[0_0_40px_rgba(255,94,0,0.3)]'
                                            } disabled:opacity-70 disabled:cursor-not-allowed`}
                                    >
                                        {isProcessingPayment ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" /> Creating Order...</>
                                        ) : isEnrolled ? (
                                            progressPercentage === 100 ? <><Award className="w-5 h-5" /> Course Completed</> : <><PlayCircle className="w-5 h-5" /> Continue Learning</>
                                        ) : (
                                            <><PlayCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" /> Enroll Now</>
                                        )}
                                    </button>

                                    {!isEnrolled && (
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full py-4 rounded-full font-bold text-sm border border-neutral-700 hover:border-white text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <p className="text-center text-[10px] text-neutral-500 font-light flex items-center gap-1.5 uppercase tracking-tighter">
                                        <Shield className="w-3 h-3" /> Secure Enrollment
                                    </p>
                                    <span className="text-neutral-700 text-xs">•</span>
                                    <p className="text-center text-[10px] text-neutral-500 font-light uppercase tracking-tighter flex items-center gap-1.5">
                                        Lifetime Access
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="px-6 max-w-7xl mx-auto pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="col-span-2">
                            <h2 className="text-3xl font-bold text-white mb-8">What You&apos;ll Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                {course.modules.slice(0, 4).map((mod, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                        <span className="text-neutral-300 font-light">{mod}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-white">Course Curriculum</h2>
                                <p className="text-sm text-neutral-500 italic">
                                    {isEnrolled ? "Mark modules as complete to track your progress" : "Select modules to customize your learning journey"}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {course.modules.map((mod, i) => {
                                    const isCompleted = completedModules.includes(mod);
                                    const isSelected = selectedModules.includes(mod);
                                    
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => isEnrolled ? toggleModuleCompletion(mod) : toggleModuleSelection(mod)}
                                            className={`group p-6 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                                                isEnrolled 
                                                    ? (isCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-neutral-900 border-neutral-800 hover:border-accent/30')
                                                    : (isSelected ? 'bg-accent/5 border-accent/20' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700')
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                                    isEnrolled
                                                        ? (isCompleted ? 'bg-emerald-500 text-white' : 'bg-black text-neutral-500 group-hover:bg-accent/10')
                                                        : (isSelected ? 'bg-accent text-white' : 'bg-black text-neutral-500')
                                                }`}>
                                                    {isCompleted ? <Check className="w-5 h-5" /> : i + 1}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-medium transition-colors ${
                                                        isEnrolled
                                                            ? (isCompleted ? 'text-neutral-400 line-through' : 'text-white')
                                                            : (isSelected ? 'text-white' : 'text-neutral-400')
                                                    }`}>
                                                        {mod}
                                                    </span>
                                                    {isEnrolled && (
                                                        <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">
                                                            {isCompleted ? "Completed" : "Tap to complete"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                                isEnrolled
                                                    ? (isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-neutral-700 group-hover:border-accent')
                                                    : (isSelected ? 'bg-accent border-accent' : 'border-neutral-700')
                                            }`}>
                                                {(isCompleted || isSelected) && <Check className={`w-4 h-4 text-white`} />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Instructor</h3>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-2xl font-bold text-white">
                                    {course.instructor.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{course.instructor}</h4>
                                    <p className="text-sm text-neutral-400 font-light">Industry Expert</p>
                                </div>
                            </div>

                            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl mb-8">
                                <h3 className="font-bold text-white mb-6">This course includes:</h3>
                                <ul className="space-y-4 text-sm text-neutral-400 font-light">
                                    <li className="flex items-center gap-3"><PlayCircle className="w-4 h-4 text-accent" /> 40 hours of on-demand video</li>
                                    <li className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-accent" /> 12 interactive coding exercises</li>
                                    <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-accent" /> English & Hindi captions</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent" /> Certificate of completion</li>
                                </ul>
                            </div>

                            {isEnrolled && (
                                <div className="bg-accent/5 border border-accent/20 p-8 rounded-3xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Award className="w-6 h-6 text-accent" />
                                        <h3 className="font-bold text-white">Your Achievement</h3>
                                    </div>
                                    <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                                        Complete all modules to earn your verified certification. This can be shared on LinkedIn and your resume.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent" style={{ width: `${progressPercentage}%` }} />
                                        </div>
                                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">{progressPercentage}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="px-6 max-w-7xl mx-auto pb-32">
                    <h2 className="text-3xl font-bold text-white mb-8">Student Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Write a Review */}
                            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[32px]">
                                <h3 className="text-xl font-bold text-white mb-6">Write a Review</h3>
                                {!user ? (
                                    <p className="text-neutral-400">Please <a href="/login" className="text-accent hover:underline">log in</a> to leave a review.</p>
                                ) : hasReviewed ? (
                                    <p className="text-accent font-medium bg-accent/10 border border-accent/20 p-4 rounded-xl">You have already reviewed this course. Thank you for your feedback!</p>
                                ) : (
                                    <form onSubmit={handleSubmitReview}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Rating</label>
                                            <div className="flex gap-2" onMouseLeave={() => setHoveredRating(0)}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setNewReviewRating(star)}
                                                        onMouseEnter={() => setHoveredRating(star)}
                                                        className="focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        <Star className={`w-8 h-8 transition-colors duration-200 ${(hoveredRating || newReviewRating) >= star ? 'fill-accent text-accent' : 'text-neutral-700'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Review</label>
                                            <textarea
                                                value={newReviewText}
                                                onChange={(e) => setNewReviewText(e.target.value)}
                                                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:ring-accent focus:border-accent block p-4 outline-none min-h-[120px] resize-none"
                                                placeholder="What did you think of the course?"
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6 mt-8">
                                {reviews.length === 0 ? (
                                    <div className="text-neutral-500 font-light italic">Be the first to review this course!</div>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review.id} className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl">
                                            {editingReviewId === review.id ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-bold text-white">Edit Your Review</h4>
                                                        <button onClick={handleEditCancel} className="text-neutral-500 hover:text-white transition-colors">
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="flex gap-2" onMouseLeave={() => setEditHoveredRating(0)}>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setEditReviewRating(star)}
                                                                onMouseEnter={() => setEditHoveredRating(star)}
                                                                className="focus:outline-none transition-transform hover:scale-110"
                                                            >
                                                                <Star className={`w-6 h-6 transition-colors duration-200 ${(editHoveredRating || editReviewRating) >= star ? 'fill-accent text-accent' : 'text-neutral-700'}`} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <textarea
                                                        value={editReviewText}
                                                        onChange={(e) => setEditReviewText(e.target.value)}
                                                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl focus:ring-accent focus:border-accent block p-4 outline-none min-h-[100px] resize-none"
                                                        placeholder="Update your review..."
                                                        required
                                                    ></textarea>
                                                    <button
                                                        onClick={() => handleUpdateReview(review.id!)}
                                                        disabled={isSubmitting}
                                                        className="px-6 py-2 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-colors disabled:opacity-50"
                                                    >
                                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg font-bold text-white">
                                                                {review.userName.charAt(0)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <h4 className="font-bold text-white">{review.userName}</h4>
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-accent text-accent' : 'text-neutral-700'}`} />
                                                                    ))}
                                                                    <span className="text-neutral-500 text-xs ml-2">
                                                                        {review.createdAt?.toDate ? new Date(review.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {user && user.uid === review.userId && (
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleEditStart(review)}
                                                                    className="p-2 text-neutral-400 hover:text-accent bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors"
                                                                    title="Edit Review"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteReview(review.id!)}
                                                                    className="p-2 text-neutral-400 hover:text-red-500 bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors"
                                                                    title="Delete Review"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-neutral-300 font-light leading-relaxed">
                                                        {review.text}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </SmoothScroll>

            {/* Custom Delete Confirmation Modal */}
            {reviewToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[32px] max-w-md w-full shadow-2xl animate-slide-up">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Delete Review</h3>
                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            Are you sure you want to delete this review? This action cannot be undone and your review will be permanently removed.
                        </p>
                        <div className="flex items-center gap-4 justify-end">
                            <button
                                onClick={() => setReviewToDelete(null)}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-full font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteReview}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Deleting..." : "Delete Review"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Accepted Success Modal — Premium Theme */}
            {showOrderAccepted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
                    <div className="bg-neutral-900 border border-accent/20 p-10 rounded-[40px] max-w-lg w-full shadow-[0_0_80px_rgba(255,94,0,0.15)] flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                        {/* Animated success ring */}
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-2 rounded-full border border-accent/20 animate-pulse" style={{ animationDuration: '3s' }} />
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                                <Check className="w-10 h-10 text-accent" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-accent font-bold text-sm uppercase tracking-widest">Payment Successful</span>
                            <Sparkles className="w-5 h-5 text-accent" />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">You&apos;re Enrolled!</h2>

                        <p className="text-neutral-400 mb-6 leading-relaxed max-w-sm">
                            Congratulations! You&apos;re now enrolled in <strong className="text-white">{course.name}</strong>. Your learning journey starts now.
                        </p>

                        {paymentId && (
                            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3 mb-6 w-full">
                                <p className="text-xs text-neutral-500 mb-1">Transaction ID</p>
                                <p className="text-sm text-neutral-300 font-mono truncate">{paymentId}</p>
                            </div>
                        )}

                        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 w-full mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <GraduationCap className="w-6 h-6 text-accent" />
                                <span className="text-accent font-bold">Course Unlocked</span>
                            </div>
                            <p className="text-sm text-accent/70">Full lifetime access • Certificate included</p>
                        </div>

                        <button
                            onClick={() => setShowOrderAccepted(false)}
                            className="w-full py-4 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-all hover:shadow-[0_0_30px_rgba(255,94,0,0.3)]"
                        >
                            Start Learning Now
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
