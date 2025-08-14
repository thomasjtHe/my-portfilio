import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeProvider>
        <StarBackground />
        <NavBar />
      </ThemeProvider>
      {/* Nav Bar */}
      
      {/* Content */}
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
      </main>

      {/* Footer */}
    </div>
  );
};
