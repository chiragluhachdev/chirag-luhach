import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Hero />
      <Statement />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
