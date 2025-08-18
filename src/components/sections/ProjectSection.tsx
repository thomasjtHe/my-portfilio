import { useState, useEffect } from "react";
import { ArrowBigDown } from "lucide-react";
import { motion } from "motion/react";
import { ProjectCard, type ProjectProps } from "../cards/ProjectCard";

export const ProjectSection = () => {
  const [scrolled, setScrolled] = useState(true);
  const projects: ProjectProps[] = [
    {
      name: "Project Alpha",
      imageSrc: [
        "/images/project1-1.png",
        "/images/project1-2.png",
        "/images/project1-3.png",
      ],
      description: "A cutting-edge web application for modern businesses.",
    },
    {
      name: "Project Beta",
      imageSrc: ["/images/project2-1.png", "/images/project2-2.png"],
      description: "A mobile app for seamless communication.",
    },
    {
      name: "Project Gamma",
      imageSrc: [
        "/images/project3-1.png",
        "/images/project3-2.png",
        "/images/project3-3.png",
      ],
      description: "An innovative platform for data visualization.",
    },
    {
      name: "Project Gamma",
      imageSrc: [
        "/images/project3-1.png",
        "/images/project3-2.png",
        "/images/project3-3.png",
      ],
      description: "An innovative platform for data visualization.",
    },
    {
      name: "Project Gamma",
      imageSrc: [
        "/images/project3-1.png",
        "/images/project3-2.png",
        "/images/project3-3.png",
      ],
      description: "An innovative platform for data visualization.",
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <section id="projects" className="min-h-screen py-24 px-4 relative">
      <motion.h2
        className="subtitle"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </motion.h2>
      <div className="flex justify-center">
        <motion.div
          className="relative grid grid-cols-3 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-20">
        <a
          href="#contact"
          className={`hidden md:block absolute bottom-1.5 ${
            scrolled
              ? "opacity-0 translate-y-4 pointer-events-none"
              : "opacity-100"
          } transition delay-150 duration-300`}
        >
          <ArrowBigDown className=" animate-bounce cursor-pointer" />
        </a>
      </div>
    </section>
  );
};
