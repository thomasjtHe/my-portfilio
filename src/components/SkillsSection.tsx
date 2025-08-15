import { useState, useEffect } from "react";
import { SkillCard, type MajorSkillProps } from "./SkillCard";
import { ArrowBigDown } from "lucide-react";
import { motion } from "motion/react";

export const SkillsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY >
          100 +
            (document.getElementById("home")?.offsetHeight ?? 0) +
            (document.getElementById("about")?.offsetHeight ?? 0) +
            (document.getElementById("roadmap")?.offsetHeight ?? 0)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const majorSkills: MajorSkillProps[] = [
    {
      id: 1,
      name: "Web Development",
      description: "Building responsive and interactive web applications.",
      imageSrc: "/images/web-development.png",
      minorSkills: [
        { id: 1, name: "HTML", imageSrc: "/images/html.png" },
        { id: 2, name: "CSS", imageSrc: "/images/css.png" },
        { id: 3, name: "JavaScript", imageSrc: "/images/javascript.png" },
        { id: 4, name: "React", imageSrc: "/images/react.png" },
      ],
    },
    {
      id: 2,
      name: "Backend Development",
      description: "Creating robust server-side applications.",
      imageSrc: "/images/backend-development.png",
      minorSkills: [
        { id: 1, name: "Node.js", imageSrc: "/images/nodejs.png" },
        { id: 2, name: "Express.js", imageSrc: "/images/express.png" },
        { id: 3, name: "MongoDB", imageSrc: "/images/mongodb.png" },
        { id: 4, name: "SQL", imageSrc: "/images/sql.png" },
      ],
    },
    {
      id: 3,
      name: "DevOps",
      description:
        "Implementing CI/CD pipelines and managing cloud infrastructure.",
      imageSrc: "/images/devops.png",
      minorSkills: [
        { id: 1, name: "Docker", imageSrc: "/images/docker.png" },
        { id: 2, name: "Kubernetes", imageSrc: "/images/kubernetes.png" },
        { id: 3, name: "AWS", imageSrc: "/images/aws.png" },
        { id: 4, name: "CI/CD", imageSrc: "/images/cicd.png" },
      ],
    },
    {
      id: 4,
      name: "Mobile Development",
      description: "Creating mobile applications for iOS and Android.",
      imageSrc: "/images/mobile-development.png",
      minorSkills: [
        { id: 1, name: "React Native", imageSrc: "/images/react-native.png" },
        { id: 2, name: "Flutter", imageSrc: "/images/flutter.png" },
        { id: 3, name: "Swift", imageSrc: "/images/swift.png" },
        { id: 4, name: "Kotlin", imageSrc: "/images/kotlin.png" },
      ],
    },
  ];

  const getExtendedSkills = () => {
    return [...majorSkills, ...majorSkills, ...majorSkills];
  };

  const extendedSkills = getExtendedSkills();
  const baseIndex = majorSkills.length;

  return (
    <section id="skills" className="min-h-screen py-24 px-4 relative">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="relative flex items-center justify-center mt-40"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cards Container */}
        <div className="relative w-full max-w-6xl mx-auto px-16">
          <div
            className="flex items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${
                -((baseIndex + currentIndex) * 320) + 360
              }px)`,
              width: `${extendedSkills.length * 320}px`,
            }}
          >
            {extendedSkills.map((skill, index) => {
              const distanceFromCenter = Math.abs(
                index - (baseIndex + currentIndex)
              );
              const isCenter = index === baseIndex + currentIndex;
              const isAdjacent = distanceFromCenter === 1;
              const isVisible = distanceFromCenter <= 1;

              return (
                <SkillCard
                  key={`${skill.id}-${index}`}
                  skill={skill}
                  isCenter={isCenter}
                  isAdjacent={isAdjacent}
                  isVisible={isVisible}
                  onClick={() => setCurrentIndex(skill.id - 1)}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Indicators */}
      <motion.div
        className="flex justify-center mt-8 gap-2"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {majorSkills.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 50);
                }, 250);
              }
            }}
            disabled={isAnimating}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 ease-out
              ${
                index === currentIndex
                  ? "bg-primary scale-125 shadow-lg"
                  : "bg-foreground/30 hover:bg-foreground/50 hover:scale-110"
              }
              disabled:opacity-50
            `}
            aria-label={`Go to skill ${index + 1}`}
          />
        ))}
      </motion.div>
      <div className="flex justify-center mt-20">
        <a
          href="#projects"
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
