import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { EducationSection } from "../components/EducationSection";

export const Home = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-x-hidden overflow-y-auto">
      <ThemeProvider>
        <StarBackground />
        {/* Nav Bar */}
        <NavBar />
      </ThemeProvider>
      {/* Content */}
      <main>
        <HomeSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
      </main>

      {/* Footer */}
    </div>
  );
};
