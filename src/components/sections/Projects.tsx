"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  // Only display the first 4 projects
  const displayProjects = projects.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      // Use exact math to avoid DOM layout timing bugs on initial render
      const getScrollAmount = () => {
        const isMobile = window.innerWidth < 768;
        const cardWidth = isMobile ? window.innerWidth * 0.85 : window.innerWidth * 0.45;
        const gap = isMobile ? 24 : 64; // gap-6 or gap-16
        const padding = isMobile ? 24 : 96; // px-6 or px-24
        
        const totalWidth = (cardWidth * displayProjects.length) + (gap * (displayProjects.length - 1)) + (padding * 2);
        return Math.max(0, totalWidth - window.innerWidth);
      };

      gsap.to(scrollWrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          // Adjusted multiplier to make the horizontal scroll significantly faster
          end: () => `+=${getScrollAmount() * 1.2}`,
          invalidateOnRefresh: true,
          pinSpacing: true,
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-black overflow-hidden relative flex flex-col justify-center">
      <div className="w-full px-6 md:px-24 mb-6 md:mb-10 shrink-0">
        <h2 className="text-white text-[10vw] md:text-6xl font-display font-bold uppercase leading-none">
          Featured Projects
        </h2>
      </div>
      
      <div 
        ref={scrollWrapperRef}
        className="flex items-center w-max gap-6 md:gap-16 px-6 md:px-24"
      >
        {displayProjects.map((project) => (
          <div key={project.id} className="shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
