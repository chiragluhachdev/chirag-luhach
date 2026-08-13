"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Follow mouse
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Add hover effects for links/buttons
    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll("a, button, .cursor-hover");
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255, 255, 255, 0.1)", mixBlendMode: "difference", duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, backgroundColor: "rgba(255, 255, 255, 1)", mixBlendMode: "difference", duration: 0.3 });
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // Slight delay to allow DOM to render before attaching listeners
    setTimeout(addHoverEffects, 1000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
    ></div>
  );
}
