import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 border-t border-neutral-900 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <GraduationCap className="w-8 h-8 text-accent" />
                            <span className="text-xl font-bold tracking-widest">EDULEARN</span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                            Empowering minds through quality education and innovative learning experiences. Building the future of interactive ecosystems.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 tracking-widest uppercase text-sm text-neutral-300">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/courses" className="hover:text-accent transition-colors">Courses</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 tracking-widest uppercase text-sm text-neutral-300">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="/resources" className="hover:text-accent transition-colors">Resource Library</Link></li>
                            <li><Link href="/career" className="hover:text-accent transition-colors">Career Guidance</Link></li>
                            <li><Link href="/mental-health" className="hover:text-accent transition-colors">Mental Health</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 tracking-widest uppercase text-sm text-neutral-300">Connect With Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-900 text-sm text-neutral-600">
                    <p>&copy; 2025 EduLearn. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
