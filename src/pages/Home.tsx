import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { RoadmapSection } from "../components/RoadmapSection";
import { ProjectSection } from "../components/ProjectSection";
import { ContactSection } from "../components/ContactSection";
import Earth from "../components/Icons/Earth";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

export const Home = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <ThemeProvider>
        <StarBackground />
        {/* Nav Bar */}
        <NavBar />
      </ThemeProvider>
      {/* Content */}
      <main className="bg-background text-foreground">
        <HomeSection />
        <AboutSection />
        <RoadmapSection />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
      </main>



{/* Footer */}
      <AnimatePresence>
        { atBottom && <Earth />}
      </AnimatePresence>
    </div>
  );
};
