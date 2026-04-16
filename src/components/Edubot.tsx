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
        keywords: ["hello", "hi", "hey", "sup", "yo", "greetings"],
        response:
            "Hey there! 👋 Welcome to EduLearn. I can help you with info about our courses, pricing, certificates, and more. What would you like to know?",
    },
    {
        keywords: ["course", "courses", "program", "programs", "class", "classes", "learn", "study"],
        response:
            "We offer a wide range of courses! 📚\n\n• **Web Development** — Full-stack bootcamp covering HTML, CSS, JS, React, Node.js\n• **Data Science** — Python, ML, Deep Learning, real-world projects\n• **UI/UX Design** — Figma, prototyping, design systems\n• **Mobile Development** — iOS & Android with React Native / Flutter\n• **Cloud Computing** — AWS, GCP, Azure certifications\n• **Cybersecurity** — Ethical hacking, network security\n• **Digital Marketing** — SEO, social media, analytics\n\nWant details on any specific course?",
    },
    {
        keywords: ["price", "pricing", "cost", "fee", "fees", "expensive", "cheap", "free", "pay", "money", "afford"],
        response:
            "Our pricing is designed to be student-friendly! 💰\n\n• Individual courses start from **₹499**\n• Bundles & specializations from **₹1,999**\n• Annual all-access pass for **₹4,999**\n• We also offer **EMI options** and **scholarships** for eligible students\n\nAll courses come with a **30-day money-back guarantee**!",
    },
    {
        keywords: ["certificate", "certification", "diploma", "credential", "verified"],
        response:
            "Yes, every course comes with a **verified certificate** upon completion! 🎓\n\nOur certificates are:\n• Industry-recognized\n• Shareable on LinkedIn\n• Include a unique verification ID\n• Signed by course instructors\n\nSome advanced courses also offer prep for external certifications (AWS, Google, etc.)",
    },
    {
        keywords: ["web", "frontend", "backend", "fullstack", "full-stack", "html", "css", "javascript", "react", "node"],
        response:
            "Our **Complete Web Development Bootcamp** is our most popular course! 🌐\n\nYou'll learn:\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js & Next.js for frontend\n• Node.js & Express for backend\n• MongoDB & PostgreSQL databases\n• Git, deployment, and real-world projects\n\nDuration: **12 weeks** | Level: Beginner to Advanced",
    },
    {
        keywords: ["data", "science", "python", "machine", "learning", "ml", "ai", "artificial", "intelligence", "deep"],
        response:
            "Our **Data Science with Python** track is perfect for aspiring data scientists! 📊\n\nTopics covered:\n• Python, NumPy, Pandas\n• Data visualization (Matplotlib, Seaborn)\n• Machine Learning (Scikit-learn)\n• Deep Learning (TensorFlow, PyTorch)\n• Real-world Kaggle projects\n\nDuration: **16 weeks** | Includes capstone project",
    },
    {
        keywords: ["design", "ui", "ux", "figma", "prototype", "wireframe"],
        response:
            "Our **UI/UX Design Masterclass** will transform you into a design pro! 🎨\n\nWhat you'll master:\n• Design thinking & user research\n• Wireframing & prototyping in Figma\n• Design systems & component libraries\n• Usability testing & iteration\n• Building a portfolio with 5+ projects\n\nDuration: **10 weeks** | No prior design experience needed",
    },
    {
        keywords: ["mobile", "app", "android", "ios", "flutter", "react native", "kotlin", "swift"],
        response:
            "Go mobile with our **App Development Specialization**! 📱\n\n• **React Native** path — build cross-platform apps\n• **Flutter** path — Google's UI toolkit\n• Covers both iOS & Android deployment\n• Includes 3 real app projects\n• App Store / Play Store publishing guide\n\nDuration: **12 weeks** per path",
    },
    {
        keywords: ["job", "career", "placement", "hire", "hiring", "internship", "interview", "resume", "employ"],
        response:
            "We're serious about your career! 💼\n\nOur career support includes:\n• **Resume & portfolio review** by industry experts\n• **Mock interviews** with real hiring managers\n• **Job placement assistance** — 87% placement rate\n• **Networking events** with top companies\n• Access to our **exclusive job board**\n\nMany students land roles within 2-3 months of completion!",
    },
    {
        keywords: ["duration", "long", "time", "weeks", "months", "hours", "schedule", "pace", "deadline"],
        response:
            "Our courses are flexible! ⏰\n\n• Most courses are **8-16 weeks**\n• Self-paced — learn on your own schedule\n• **Lifetime access** after enrollment\n• Estimated **5-10 hours/week** commitment\n• No hard deadlines — rewatch anytime\n\nPerfect for students and working professionals alike!",
    },
    {
        keywords: ["instructor", "teacher", "mentor", "tutor", "faculty", "professor", "who teaches"],
        response:
            "Our instructors are top-tier! 👨‍🏫\n\n• Industry professionals from **Google, Microsoft, Apple, Meta**\n• Average **10+ years** of experience\n• Dedicated mentoring & doubt-clearing sessions\n• Weekly live Q&A sessions\n• Direct messaging support\n\nYou're learning from the best in the industry!",
    },
    {
        keywords: ["support", "help", "contact", "reach", "email", "phone", "query", "question", "doubt"],
        response:
            "We're here to help! 🤝\n\n• **24/7 community forums** — active student & mentor community\n• **Live chat** support during business hours\n• **Email** — support@edulearn.com\n• **Doubt-clearing sessions** with mentors\n• Average response time: **under 2 hours**\n\nFeel free to ask me anything right here too!",
    },
    {
        keywords: ["refund", "return", "cancel", "money back", "guarantee"],
        response:
            "We offer a **30-day money-back guarantee**! 💯\n\nNo questions asked — if you're not satisfied within 30 days, we'll process a full refund. Your satisfaction is our priority.",
    },
    {
        keywords: ["thank", "thanks", "thx", "appreciate", "helpful", "great", "awesome", "cool", "nice"],
        response:
            "You're welcome! 😊 Happy to help. If you have any more questions about EduLearn, feel free to ask anytime. Good luck with your learning journey! 🚀",
    },
    {
        keywords: ["bye", "goodbye", "see you", "later", "gtg", "gotta go", "exit", "close"],
        response:
            "Bye! 👋 It was great chatting with you. Come back anytime you need help. Happy learning! 🎉",
    },
];

const DEFAULT_RESPONSE =
    "I'm not sure I understand that one yet! 🤔 I can help you with:\n\n• **Courses** — what we offer\n• **Pricing** — fees & plans\n• **Certificates** — what you get\n• **Career support** — job placement\n• **Schedule** — duration & pace\n\nTry asking about any of these topics!";

// ── Matching logic ────────────────────────────────────────────
function getBotResponse(userMessage: string): string {
    const lower = userMessage.toLowerCase().trim();

    for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return entry.response;
        }
    }
    return DEFAULT_RESPONSE;
}

// ── Simple markdown-ish rendering ──────────────────────────────
function renderText(text: string) {
    return text.split("\n").map((line, i) => {
        // Bold
        const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
            j % 2 === 1 ? (
                <strong key={j} className="font-semibold text-white">
                    {part}
                </strong>
            ) : (
                <span key={j}>{part}</span>
            )
        );
        return (
            <span key={i}>
                {parts}
                {i < text.split("\n").length - 1 && <br />}
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
            text: "Hi there! 👋 I'm EduBot, your learning assistant. Ask me about our courses, pricing, certificates, career support, or anything about EduLearn!",
        },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    const suggestions = ["Courses", "Pricing", "Certificates", "Career support"];

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
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center border border-white/10 shrink-0 bg-white/5 relative mt-0.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                                </div>
                                <div className="bg-white/[0.07] rounded-2xl rounded-tl-md px-4 py-3 border border-white/5 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
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
