"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const revealsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=150%", // Increased scroll distance so it doesn't rush past
          scrub: 1,
          pin: true,
        },
      });

      // Background color transition from Black to White
      tl.to(containerRef.current, {
        backgroundColor: "#ffffff",
        color: "#000000",
        ease: "none",
        duration: 0.5,
      }, 0);

      // Text scales down slightly and changes color
      tl.to(textRef.current, {
        scale: 0.9,
        color: "#000000",
        ease: "power1.inOut",
        duration: 0.5,
      }, 0);

      // Descriptors slide in much faster and immediately
      const revealElements = revealsRef.current?.children;
      if (revealElements) {
        tl.fromTo(revealElements, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out", duration: 0.4 },
          0 // start EXACTLY at the beginning of the scroll
        );
      }
      
      // Add a massive resting phase at the end so it stays on screen fully revealed for a long time
      tl.to({}, { duration: 1.0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center pt-24 pb-48 md:pt-32 md:pb-72 bg-black text-white px-6 md:px-12"
    >
      <div 
        ref={revealsRef}
        className="mb-12 md:mb-16 w-full max-w-4xl flex flex-wrap justify-center gap-4 md:gap-12 font-sans text-lg md:text-2xl uppercase tracking-widest font-medium"
      >
        <span>Development</span>
        <span>•</span>
        <span>Product</span>
        <span>•</span>
        <span>Design</span>
        <span>•</span>
        <span>AI</span>
      </div>

      <h2 
        ref={textRef}
        className="font-display text-[8vw] md:text-[6vw] uppercase leading-none font-bold text-center tracking-tighter"
      >
        I Build Things<br />That Move.
      </h2>
    </section>
  );
}
