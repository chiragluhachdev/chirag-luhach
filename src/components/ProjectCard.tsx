import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    year: string;
    tech: string[];
    image: string;
    link: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[85vw] md:w-[45vw] h-[65vh] md:h-[75vh] flex-shrink-0 flex items-end relative overflow-hidden group rounded-[2rem] border border-white/10 cursor-pointer block"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={imageRef}
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-80 scale-105 transition-transform duration-1000 ease-out group-hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full p-6 md:p-10 flex flex-col justify-end h-full">
        <div className="flex flex-col w-full gap-6 mt-auto">
          <div className="w-full">
            <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase mb-3 block">
              {project.year}
            </span>
            <h3 className="font-display text-[8vw] md:text-[3vw] leading-[0.9] uppercase font-bold text-white mb-4 whitespace-pre-line group-hover:text-white/90 transition-colors">
              {project.title}
            </h3>
            <p className="font-sans text-sm md:text-base text-white/80 max-w-sm leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mt-2">
            <div className="flex flex-wrap gap-2 flex-1">
              {project.tech.slice(0, 3).map((t) => (
                <span 
                  key={t}
                  className="px-3 py-1.5 border border-white/20 rounded-full text-[10px] font-sans uppercase tracking-widest text-white/90 backdrop-blur-md bg-black/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="px-6 py-3 bg-white text-black font-sans text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white/90 transition-colors w-full sm:w-auto text-center shrink-0">
              View Project
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
