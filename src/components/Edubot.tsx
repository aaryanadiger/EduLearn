"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";

export default function Edubot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (message.trim()) {
            console.log("Sending message:", message);
            setMessage("");
            // Handle sending logic later
        }
    };

    return (
        <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[320px] sm:w-[350px] h-[450px] rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                <Image
                                    src="/edubot-logo.jpeg"
                                    alt="EduBot"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-sm">EduBot AI</h3>
                                <p className="text-neutral-400 text-xs flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Online & ready to help
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

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 bg-white/5 relative">
                                <Image
                                    src="/edubot-logo.jpeg"
                                    alt="EduBot"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-neutral-200 border border-white/5 max-w-[85%]">
                                Hi there! I&apos;m EduBot. How can I assist you with your learning journey today?
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-black/40 border-t border-white/10">
                        <form
                            onSubmit={handleSend}
                            className="flex items-center gap-2 bg-white/5 rounded-full border border-white/10 p-1 pl-3 transition-colors focus-within:bg-white/10 focus-within:border-white/20"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Message EduBot..."
                                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-500 py-1.5"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:bg-white/10 transition-all hover:bg-accent-light"
                            >
                                <Send className="w-3.5 h-3.5 ml-[1px]" />
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
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 border border-white/5">
                    <Image
                        src="/edubot-logo.jpeg"
                        alt="Chat with EduBot"
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-accent border-[2.5px] border-[#0c0c0c] rounded-full" />
                )}
            </button>
        </div>
    );
}
