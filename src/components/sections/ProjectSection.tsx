import { useState, useEffect, useRef } from "react";
import { ArrowBigDown, Presentation } from "lucide-react";
import { motion } from "motion/react";
import { ProjectCard, type ProjectProps } from "../cards/ProjectCard";

export const ProjectSection = () => {
  const [scrolled, setScrolled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setShowIcon((p) => !p), 3330);
    return () => clearInterval(interval);
  }, []);

  const projects: ProjectProps[] = [
    {
      name: "Motivational Modelling",
      imageSrc: ["/src/assets/mm.png", "/src/assets/mm2.webp"],
      description:
        "Building a motivational model helps you understand the roles of stakeholders in a system, as well as the functional and quality goals of a system. Perhaps most importantly, the process also allows you to capture the emotional goals of a system: both the positive feelings people want to have when interacting with the system, and possible issues that you might face in getting there.",
      link: "https://www.leonsterling.com/aboutmotivationalmodelling",
      skills: ["React", "TypeScript", "Bootstrap", "HTML", "CSS", "npm"],
    },
    {
      name: "Algorithms in Action",
      imageSrc: [
        "/src/assets/AIA1.png",
        "/src/assets/AIA2.png",
        "/src/assets/AIA3.png",
        "/src/assets/AIA4.png",
        "/src/assets/AIA5.png",
      ],
      description:
        "Algorithms in Action (AIA) is an animation software tool, developed for the purposes of teaching computer science algorithms by Linda Stern, Lee Naish, and Harald Søndergaard at The University of Melbourne. A key feature of AIA, not found in other algorithm animations, is that students can view an algorithm at varying levels of detail. Starting with a high level pseudocode description of the algorithm, with accompanying high level animation and textual explanation, students can expand sections of the pseudocode to expose more detail. Animation and explanation are controlled in coordinate fashion, becoming correspondingly more detailed as the pseudocode is expanded.",
      skills: ["React", "JavaScript", "Node.js", "HTML", "CSS", "npm"],
      link: "https://github.com/algorithms-in-action/algorithms-in-action.github.io",
    },
    {
      name: "Sustain-a-Bite",
      imageSrc: [
        "/src/assets/SAB1.png",
        "/src/assets/SAB2.png",
        "/src/assets/SAB3.png",
        "/src/assets/SAB4.png",
        "/src/assets/SAB5.png",
        "/src/assets/SAB6.png",
      ],
      description:
        "A student innovation project that aims to promote sustainable food practices and reduce food waste. The team went through a process of interviewing stakeholders and conducting research to identify key areas for improvement, then developing a product type, demonstrating its use, and gathering feedback. Through rounds of prototyping and testing, the team refined their solution to better meet the needs of users.",
      skills: ["Figma", "Jira"],
      link: "/src/assets/SABVideo.mp4",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY >
          100 +
            (document.getElementById("home")?.offsetHeight ?? 0) +
            (document.getElementById("about")?.offsetHeight ?? 0) +
            (document.getElementById("roadmap")?.offsetHeight ?? 0) +
            (document.getElementById("skills")?.offsetHeight ?? 0)
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (index: number, expand: boolean) => {
    setExpandedIndex(expand ? index : -1);
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-4 relative">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="relative flex items-center justify-center overflow-hidden h-12">
          <span
            className="absolute flex items-center justify-center transition-transform duration-500 ease-in-out inset-0"
            style={{
              transform: showIcon ? "translateY(0%)" : "translateY(-100%)",
            }}
          >
            <Presentation className="h-10 w-10" />
          </span>
          <span
            className="absolute flex items-center justify-center transition-transform duration-500 ease-in-out inset-0"
            style={{
              transform: showIcon ? "translateY(-100%)" : "translateY(0%)",
            }}
          >
            Projects
          </span>
          <span className="invisible">Projects</span>
        </span>
      </motion.h2>

      <motion.div
        className="flex flex-cols justify-center mr-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <div
          ref={containerRef}
          className="relative flex flex-wrap justify-center w-full md:w-3/4 gap-5 md:gap-10"
        >
          {projects.map((project, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={project.name + index}
                data-card={index}
                layout
                // Instead of basis classes that can momentarily resolve to 0, drive via style.
                initial={false}
                animate={{
                  flexBasis: isExpanded ? "100%" : "270px",
                  // keep minWidth so it never hits 0 during interpolation
                  minWidth: isExpanded ? "100%" : "260px",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`relative`}
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isExpanded={isExpanded}
                  onExpand={(expand) => toggleExpand(index, expand)}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Scroll Arrow */}
      <div className="flex justify-center mt-20">
        <a
          href="#contact"
          className={`hidden md:block absolute bottom-1.5 ${
            scrolled
              ? "opacity-0 translate-y-4 pointer-events-none"
              : "opacity-100"
          } transition delay-150 duration-300`}
        >
          <ArrowBigDown className="animate-bounce cursor-pointer" />
        </a>
      </div>
    </section>
  );
};
