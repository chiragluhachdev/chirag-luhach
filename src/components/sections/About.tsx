"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
  "PostgreSQL", "AWS", "React Native", "Three.js", "GSAP"
];

const achievements = [
  "Secured ₹80,000 startup funding from Manav Rachna University.",
  "Successfully published MR BITES and ARK Kidoid on App Store and Google Play Store.",
  "Built multiple production-ready SaaS and mobile products for startups, companies, and individuals.",
  "Led end-to-end product development from idea, design, development to deployment."
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background transition
      gsap.to(containerRef.current, {
        backgroundColor: "#ffffff",
        color: "#000000",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        }
      });

      // 2. Main text reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll("span.word");
        
        gsap.fromTo(words, 
          { opacity: 0.2, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 80%",
              scrub: 1,
            }
          }
        );
      }

      // 3. Additional content fade-in
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const paragraph = "I build digital products for businesses and startups — from websites and web applications to SaaS platforms and custom software. Full-stack development, product thinking, and execution under one roof.";
  const words = paragraph.split(" ");

  return (
    <section ref={containerRef} className="py-24 md:py-32 w-full bg-black text-white px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-12">
          Chirag Luhach
        </h2>
        
        <p ref={textRef} className="font-sans text-2xl md:text-5xl leading-tight font-medium max-w-4xl">
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>

        <div ref={contentRef} className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col gap-16">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] mb-6 opacity-50 font-bold">Education</p>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl font-bold uppercase">Bachelor of Technology</h3>
                <p className="font-sans text-lg opacity-80">Manav Rachna University</p>
              </div>
            </div>

            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] mb-6 opacity-50 font-bold">Stack & Capabilities</p>
              <div className="flex flex-wrap gap-3">
                {stack.map((item) => (
                  <div 
                    key={item} 
                    className="px-5 py-2 border border-current rounded-full text-xs font-sans uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-default"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <p className="font-sans text-sm uppercase tracking-[0.2em] mb-6 opacity-50 font-bold">Key Achievements</p>
            <ul className="flex flex-col gap-8">
              {achievements.map((achievement, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-2 w-2 h-2 rounded-full border border-current flex-shrink-0" />
                  <p className="font-sans text-lg md:text-xl leading-relaxed opacity-90">{achievement}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
