"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const textSubRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      // Text scales up and fades out as user scrolls down
      tl.to(textTitleRef.current, {
        scale: 1.5,
        opacity: 0,
        y: -100,
        ease: "power2.inOut",
      }, 0);

      tl.to(textSubRef.current, {
        y: -50,
        opacity: 0,
        ease: "power2.inOut",
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] opacity-50"></div>
      
      <div className="z-10 flex flex-col items-center text-center">
        <h1 
          ref={textTitleRef}
          className="font-display text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase font-bold text-white text-reveal-mask mix-blend-difference"
        >
          Chirag<br />Luhach
        </h1>
        
        <div 
          ref={textSubRef}
          className="mt-8 flex flex-col items-center gap-8"
        >
          <div className="flex gap-6 text-sm md:text-base font-sans tracking-widest uppercase text-white/70">
            <span>Creative Developer</span>
            <span className="w-1 h-1 rounded-full bg-white/50 self-center"></span>
            <span>Product Builder</span>
          </div>

          {/*
          <a
            href="/chirag_luhach_resume.pdf"
            download="Chirag_Luhach_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-500 hover:bg-white hover:text-black uppercase font-sans"
          >
            Download Resume
          </a>
          */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="w-full h-full bg-white absolute top-0 left-0 animate-[scrolldown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
