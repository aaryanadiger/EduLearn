"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, GraduationCap } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────
interface ChatMessage {
    role: "user" | "bot";
    text: string;
}

// ── Knowledge base for rule-based responses ────────────────────
const KNOWLEDGE_BASE: { keywords: string[]; response: string }[] = [
    {
        keywords: ["hello", "hi", "hey", "sup", "yo", "greetings", "start", "anybody"],
        response:
            "Hey there! 👋 Welcome to EduLearn. I'm your dedicated learning assistant. I can help you explore our curriculum, understand our pricing, learn about certifications, or guide you through your career transformation. What's on your mind today?",
    },
    {
        keywords: ["course", "courses", "program", "programs", "class", "classes", "learn", "study", "curriculum", "catalog"],
        response:
            "Our curriculum is designed by industry veterans to take you from zero to expert! 🚀\n\n• **Engineering** — Full-stack Web, Mobile (React Native/Swift/Kotlin)\n• **Intelligence** — Data Science, AI/ML, Python Mastery\n• **Creative** — UI/UX Design, Figma, Adobe Suite\n• **Strategy** — Digital Marketing, Business Strategy, Entrepreneurship\n\nEvery course includes real-world projects and 1-on-1 mentorship. Which path interests you most?",
    },
    {
        keywords: ["price", "pricing", "cost", "fee", "fees", "expensive", "cheap", "free", "pay", "money", "afford", "emi", "payment", "razorpay"],
        response:
            "We believe premium education should be accessible! 💰\n\n• **Individual Specializations** — starting from **₹499**\n• **Career Bundles** — from **₹1,999**\n• **All-Access Pass** — **₹4,999/year** (Unlimited learning)\n\nWe support **all major payment methods** via Razorpay, including UPI, Cards, and **No-cost EMI**. Plus, your first module is always a free preview!",
    },
    {
        keywords: ["certificate", "certification", "diploma", "credential", "verified", "degree", "linkedin"],
        response:
            "Every EduLearn graduate receives a **Premium Verified Certificate**! 🎓\n\n• **Industry-Standard**: Recognized by top tech firms.\n• **Sharable**: Add directly to your LinkedIn profile with one click.\n• **Verifiable**: Each certificate has a unique QR & ID for authenticity.\n• **Instructor Signed**: Endorsed by the industry experts who taught you.",
    },
    {
        keywords: ["web", "frontend", "backend", "fullstack", "full-stack", "html", "css", "javascript", "react", "node", "next.js", "mern"],
        response:
            "The **Modern Full-Stack Development** track is our flagship program! 🌐\n\nStack covered:\n• **Layer 1**: HTML5, CSS3, & Modern JavaScript (ES2024+)\n• **Layer 2**: React 19, Next.js 15, & Framer Motion\n• **Layer 3**: Node.js, Express, & Bun\n• **Layer 4**: MongoDB, PostgreSQL, & Redis\n\nDuration: **12 weeks** | Includes **5 Portfolio-ready projects**.",
    },
    {
        keywords: ["data", "science", "python", "machine", "learning", "ml", "ai", "artificial", "intelligence", "deep", "neural", "pandas"],
        response:
            "Master the future with our **AI & Data Science Specialist** track! 📊\n\nCurriculum:\n• **Python for Data**: NumPy, Pandas, Matplotlib\n• **ML Foundations**: Linear Regression to Random Forests\n• **Advanced AI**: Deep Learning with TensorFlow & PyTorch\n• **GPT & LLMs**: Prompt engineering and building AI agents\n\nIncludes access to our **GPU GPU enabled cloud labs**!",
    },
    {
        keywords: ["design", "ui", "ux", "figma", "prototype", "wireframe", "graphic", "adobe", "color", "typography"],
        response:
            "Our **UI/UX Design Masterclass** focuses on creating stunning user experiences! 🎨\n\nYou'll master:\n• **Design Thinking**: User research & accessibility\n• **Visual Design**: Typography, color theory, and layout\n• **Prototyping**: Interactive flows in Figma & Spline\n• **Handover**: Working with developers and design systems\n\nGraduate with a **professional Behance portfolio**.",
    },
    {
        keywords: ["job", "career", "placement", "hire", "hiring", "internship", "interview", "resume", "employ", "salary", "work"],
        response:
            "We don't just teach code; we launch careers! 💼\n\nOur **Career Accelerator** program includes:\n• **Portfolio Surgery**: Build projects that recruiters can't ignore.\n• **Mock Interviews**: Real practice with Google & Amazon engineers.\n• **Referral Network**: Direct access to 200+ hiring partners.\n• **Negotiation Coaching**: We help you get the salary you deserve.\n\nAverage salary hike after completion is **70%**!",
    },
    {
        keywords: ["help", "support", "contact", "reach", "email", "phone", "query", "question", "doubt", "broken", "issue", "error"],
        response:
            "We're here for you 24/7! 🤝\n\n• **Technical Help**: Check our [Support Portal]\n• **Billing Issues**: Email support@edulearn.com\n• **1-on-1 Mentoring**: Book a session via your dashboard\n• **Community**: Join our Discord with 10k+ fellow learners.\n\nHow can I help you right now?",
    },
    {
        keywords: ["thank", "thanks", "thx", "appreciate", "helpful", "great", "awesome", "cool", "nice", "love", "wow"],
        response:
            "You absolutely rock! 🚀 I'm so glad I could help. Remember, the best time to start learning was yesterday, but the second best time is **now**. Anything else you'd like to explore?",
    },
];

const DEFAULT_RESPONSE =
    "I'm still learning that! 😅 But I'm an expert in:\n\n• **Our Courses** (Web, AI, Design, Mobile)\n• **Pricing & Plans** (EMI info)\n• **Career Support** (Placements & Resumes)\n• **Certificates** (Verification info)\n\nTry asking me about any of these, or say 'Hi' to start over!";

// ── Matching logic ────────────────────────────────────────────
function getBotResponse(userMessage: string): string {
    const lower = userMessage.toLowerCase().trim();
    
    // Find the best match based on keyword count
    let bestMatch = { response: DEFAULT_RESPONSE, score: 0 };

    for (const entry of KNOWLEDGE_BASE) {
        let currentScore = 0;
        for (const kw of entry.keywords) {
            if (lower.includes(kw)) {
                currentScore++;
            }
        }
        
        if (currentScore > bestMatch.score) {
            bestMatch = { response: entry.response, score: currentScore };
        }
    }
    
    return bestMatch.response;
}

// ── Simple markdown-ish rendering ──────────────────────────────
function renderText(text: string) {
    return text.split("\n").map((line, i) => {
        // Bold
        const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
            j % 2 === 1 ? (
                <strong key={j} className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {part}
                </strong>
            ) : (
                <span key={j}>{part}</span>
            )
        );
        return (
            <span key={i} className="block mb-1">
                {parts}
            </span>
        );
    });
}

// ── Component ──────────────────────────────────────────────────
export default function Edubot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "bot",
            text: "Hi there! 👋 I'm **EduBot**, your premium learning assistant. How can I help you accelerate your career today?",
        },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            const scrollOptions: ScrollToOptions = {
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            };
            scrollRef.current.scrollTo(scrollOptions);
        }
    }, [messages, isTyping]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || isTyping) return;

        // Add user message
        const userMsg: ChatMessage = { role: "user", text: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setMessage("");
        setIsTyping(true);

        // Simulate bot "thinking" delay (300-800ms)
        const delay = 300 + Math.random() * 500;
        setTimeout(() => {
            const botReply = getBotResponse(trimmed);
            setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
            setIsTyping(false);
        }, delay);
    };

    // Quick suggestions
    const suggestions = ["Our Catalog", "Pricing info", "Certificates", "Career Support"];

    const handleSuggestion = (text: string) => {
        setMessage("");
        const userMsg: ChatMessage = { role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);
        const delay = 300 + Math.random() * 500;
        setTimeout(() => {
            const botReply = getBotResponse(text);
            setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
            setIsTyping(false);
        }, delay);
    };

    return (
        <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[340px] sm:w-[380px] h-[500px] rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50">
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 shrink-0">
                                <GraduationCap className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm tracking-tight">
                                    EduBot
                                </h3>
                                <p className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Online &middot; Ask me anything
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar"
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                {msg.role === "bot" && (
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-white/10 shrink-0 bg-white/5 relative mt-0.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                )}
                                <div
                                    className={`px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[85%] ${msg.role === "user"
                                            ? "bg-accent/90 text-white rounded-2xl rounded-tr-md"
                                            : "bg-white/[0.07] text-neutral-200 rounded-2xl rounded-tl-md border border-white/5"
                                        }`}
                                >
                                    {renderText(msg.text)}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center border border-white/10 shrink-0 bg-white/5 relative mt-0.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-md px-4 py-3 border border-white/10 flex items-center gap-1.5 shadow-xl">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0s]" />
                                </div>
                            </div>
                        )}

                        {/* Quick suggestions — shown only at start */}
                        {messages.length === 1 && !isTyping && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSuggestion(s)}
                                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-black/50 border-t border-white/10">
                        <form
                            onSubmit={handleSend}
                            className="flex items-center gap-2 bg-white/5 rounded-full border border-white/10 p-1 pl-3.5 transition-colors focus-within:bg-white/10 focus-within:border-white/20"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask about courses, pricing..."
                                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-500 py-1.5"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim() || isTyping}
                                className="p-2 rounded-full bg-accent text-white disabled:opacity-40 disabled:bg-white/10 transition-all hover:bg-accent-light"
                            >
                                {isTyping ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Send className="w-3.5 h-3.5 ml-[1px]" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 shadow-xl shadow-accent/20 hover:scale-105 hover:border-white/20 transition-all duration-300 group flex items-center justify-center bg-black/80 backdrop-blur-md"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border border-white/5 bg-accent">
                    <GraduationCap className="w-6 h-6 text-white" />
                </div>
                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-accent border-[2.5px] border-[#0c0c0c] rounded-full" />
                )}
            </button>
        </div>
    );
}
