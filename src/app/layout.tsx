import type { Metadata } from "next";
import { Outfit, Syncopate } from "next/font/google"; // Use Outfit for body, Syncopate for logos
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";
import { TopNav, BottomNav } from "@/components/Navbar";
import Cart from "@/components/Cart";
import Edubot from "@/components/Edubot";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduLearn",
  description: "Unlock the future of education with interactive learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${syncopate.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <CurrencyProvider>
              <TopNav />
              <BottomNav />
              <Cart />
              <Edubot />
              {children}
              {/* Developer version tag — invisible, hover to reveal */}
              <div
                className="fixed bottom-1 left-1 z-[9999] text-[10px] text-white/0 hover:text-white/40 transition-colors duration-300 select-none pointer-events-auto font-mono"
                title="EduLearn Build Version"
              >
                v2.3.1
              </div>
            </CurrencyProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
