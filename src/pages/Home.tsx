import { StarBackground } from "../components/StarBackground";
import { NavBar } from "../components/NavBar";
import { HomeSection } from "../components/sections/HomeSection";
import { ThemeProvider } from "../hooks/useTheme";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { ProjectSection } from "../components/sections/ProjectSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ArrowBigUp, Github } from "lucide-react";
import { motion } from "motion/react";

export const Home = () => {
  return (
    <div className="relative">
      <ThemeProvider>
        <StarBackground />
        {/* Nav Bar */}
        <NavBar />
        {/* Content */}
        <main className="bg-background text-foreground">
          <HomeSection />
          <AboutSection />
          <RoadmapSection />
          <SkillsSection />
          <ProjectSection />
          <ContactSection />
        </main>
        <motion.footer
          className="relative mt-auto w-full overflow-hidden bg-background z-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
            <p className="text-lg text-muted-foreground select-none self-start sm:self-end">
              Copyright &copy; {new Date().getFullYear()} by Thomas He. All
              rights reserved.
            </p>
            <a
              href="#home"
              className="animate-bounce inline-flex items-center mr-[250px] gap-2 "
              aria-label="Back to top"
            >
              <ArrowBigUp className="h-6 w-6" />
              <span className="sr-only">Back to Top</span>
            </a>
            <a
              href="https://github.com/thomasjtHe/my-portfilio"
              target="_blank"
              className="text-lg text-muted-foreground select-none self-start sm:self-end"
            >
              Source: <Github className="inline h-6 w-6 ml-2" />
            </a>
          </div>
        </motion.footer>
      </ThemeProvider>
    </div>
  );
};
