import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/sections/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { ProjectSection } from "../components/sections/ProjectSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ArrowBigUp } from "lucide-react";


export const Home = () => {

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
      <footer className="relative mt-auto w-full overflow-hidden">
        {/* Optional gradient overlay for readability; remove if not needed */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-background/60 to-background/30"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
          <p className="text-lg text-muted-foreground select-none self-start sm:self-end">
            Copyright &copy; {new Date().getFullYear()} by Thomas He. All rights reserved.
          </p>
            <a
            href="#home"
            className="animate-bounce inline-flex items-center justify-center gap-2 cosmic-button"
            aria-label="Back to top"
          >
            <ArrowBigUp className="h-4 w-4" />
            Back to Top
          </a>
        </div>
      </footer>

    </div>
  );
};
