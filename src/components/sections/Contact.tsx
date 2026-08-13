"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const links = [
  { name: "Email", url: "mailto:chiragluhach.dev@gmail.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/chirag-luhach" },
  { name: "GitHub", url: "https://github.com/chiragluhach-droid" },
  { name: "Instagram", url: "https://www.instagram.com/_.chirag011/" }
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, 
        { yPercent: 100, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1, 
          ease: "power3.out", 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 w-full bg-black text-white px-6 md:px-12 flex flex-col justify-between relative overflow-hidden">
      <div className="overflow-hidden py-4">
        <h2 
          ref={textRef}
          className="font-display text-[11vw] md:text-[8vw] uppercase leading-[0.85] font-bold tracking-tighter"
        >
          Let&apos;s <span className="text-red-600">Build</span><br />
          <span className="text-white/50">Something</span><br />
          Interesting.
        </h2>
      </div>

      <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm uppercase tracking-widest text-white/50">Location</p>
          <p className="font-sans text-lg">India</p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-sans text-lg md:text-xl uppercase tracking-widest hover:text-white/70 transition-colors"
            >
              {link.name}
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
