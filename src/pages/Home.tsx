import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/sections/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { ProjectSection } from "../components/sections/ProjectSection";
import { ContactSection } from "../components/sections/ContactSection";


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

    </div>
  );
};
