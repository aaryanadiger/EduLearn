"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import DeepDiveSection from "@/components/DeepDiveSection";
import ReimaginingSection from "@/components/ReimaginingSection";
import CompaniesSection from "@/components/CompaniesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <CustomCursor />

          <SmoothScroll>
            {/* Hero Section (100vh) */}
            <Hero />

            {/* Reimagining Education Section */}
            <ReimaginingSection />

            {/* Companies / Trusted By */}
            <CompaniesSection />

            {/* Deep Dive Learning Courses */}
            <DeepDiveSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Anime.js Interactive Call to Action */}
            <CallToAction />

          </SmoothScroll>
        </>
      )}
    </main>
  );
}
