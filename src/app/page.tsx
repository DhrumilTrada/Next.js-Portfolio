"use client";

import TimelineSection from "@/components/TimelineSection";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  // const testimonialRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("home");

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      home: homeRef,
      about: aboutRef,
      projects: projectRef,
      contact: contactRef,
      // testimonials: testimonialRef,
      experience: experienceRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = [
      { id: "home", ref: homeRef },
      { id: "project", ref: projectRef },
      { id: "about", ref: aboutRef },
      // { id: "testimonials", ref: testimonialRef },
      { id: "contact", ref: contactRef },
      { id: "experience", ref: experienceRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const firstVisible = visibleEntries[0];
          setActiveSection(firstVisible.target.id);
        }
      },
      { threshold: 0.3 },
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <div id="home" ref={homeRef}>
        <HeroSection />
      </div>
      <div id="projects" ref={projectRef}>
        <ProjectsSection />
      </div>
      <TapeSection />
      <div id="about" ref={aboutRef}>
        <AboutSection />
      </div>
      {/* <div id="testimonials" ref={testimonialRef}>
        <TestimonialsSection />
      </div> */}
      <div id="experience" ref={experienceRef}>
        <TimelineSection />
      </div>
      <div id="contact" ref={contactRef}>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
