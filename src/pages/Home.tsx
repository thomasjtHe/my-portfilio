import { StarBackground } from "../components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeProvider>
        <StarBackground />
        <ThemeToggle />
        {/* Your other components */}
      </ThemeProvider>
      {/* Nav Bar */}
      <NavBar />
      {/* Content */}
      <main>
        <HomeSection />
      </main>

      {/* Footer */}
    </div>
  );
};
