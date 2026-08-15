"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  // Only display the first 4 projects
  const displayProjects = projects.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      // Animate from 0 to -50% to create a seamless infinite loop
      gsap.to(scrollWrapper, {
        xPercent: -50,
        ease: "none",
        duration: 35, // Adjust this value to make it faster or slower
        repeat: -1,
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 w-full bg-black overflow-hidden relative flex flex-col justify-center">
      <div className="w-full px-6 md:px-24 mb-10 shrink-0">
        <h2 className="text-white text-[10vw] md:text-6xl font-display font-bold uppercase leading-none">
          Featured Projects
        </h2>
      </div>
      
      <div className="flex items-center w-max">
        <div ref={scrollWrapperRef} className="flex w-max">
          {/* First Set */}
          <div className="flex items-center gap-6 md:gap-16 pr-6 md:pr-16 pl-6 md:pl-24">
            {displayProjects.map((project) => (
              <div key={`set1-${project.id}`} className="shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          {/* Second Set (identical for seamless looping) */}
          <div className="flex items-center gap-6 md:gap-16 pr-6 md:pr-16 pl-0 md:pl-0">
            {displayProjects.map((project) => (
              <div key={`set2-${project.id}`} className="shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
