import { useState, useEffect } from "react";
import { SkillCard, type MajorSkillProps } from "../cards/SkillCard";
import { ArrowBigDown, Hammer } from "lucide-react";
import { motion } from "motion/react";

export const SkillsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 3330);
    return () => clearInterval(interval);
  }, []);

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
  }, []);

  const majorSkills: MajorSkillProps[] = [
    {
      id: 1,
      name: "Web Development",
      description: "Building responsive and interactive web applications.",
      imageSrc: "/assets/webDev.svg",
      minorSkills: [
        { id: 1, name: "HTML", imageSrc: "/assets/html.png" },
        { id: 2, name: "CSS", imageSrc: "/assets/css.png" },
        { id: 3, name: "JavaScript", imageSrc: "/assets/js.png" },
        { id: 4, name: "TypeScript", imageSrc: "/assets/ts.png" },
        { id: 5, name: "React", imageSrc: "/assets/react.svg" },
        { id: 6, name: "npm", imageSrc: "/assets/npm.png" },
        { id: 7, name: "Tailwind", imageSrc: "/assets/tailwind.png" },
        { id: 8, name: "Bootstrap", imageSrc: "/assets/bs.png" },
        { id: 9, name: "Vite", imageSrc: "/assets/vite.svg" },
        {
          id: 10,
          name: "React Native",
          imageSrc: "/assets/reactNative.svg",
        },
        { id: 11, name: "Three.js", imageSrc: "/assets/3js.png" },
        { id: 12, name: "Material UI", imageSrc: "/assets/mui.svg" },
      ],
    },
    {
      id: 2,
      name: "DevOps",
      description:
        "Implementing CI/CD pipelines, source control and documentation.",
      imageSrc: "/s/devops.png",
      minorSkills: [
        { id: 1, name: "Git", imageSrc: "/assets/git.png" },
        { id: 2, name: "Github", imageSrc: "/assets/github.svg" },
        { id: 3, name: "Jira", imageSrc: "/assets/jira.svg" },
        { id: 4, name: "Slack", imageSrc: "/assets/slack.svg" },
      ],
    },
    {
      id: 3,
      name: "Data Analytics",
      description:
        "Manipulate and analyze data, obtain knowledge from information.",
      imageSrc: "/assets/da.svg",
      minorSkills: [
        { id: 1, name: "Python", imageSrc: "/assets/python.svg" },
        {
          id: 2,
          name: "Pandas",
          imageSrc:
            "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg",
        },
        { id: 3, name: "NumPy", imageSrc: "/assets/numpy.svg" },
        {
          id: 4,
          name: "Matplotlib",
          imageSrc:
            "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
        },
        { id: 5, name: "Seaborn", imageSrc: "/assets/seaborn.svg" },
        {
          id: 6,
          name: "Scikit-learn",
          imageSrc: "/assets/scikitLearn.svg",
        },
        { id: 7, name: "MySQL", imageSrc: "/assets/mysql.svg" },
        {
          id: 8,
          name: "MS Excel",
          imageSrc:
            "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
        },
      ],
    },
    {
      id: 4,
      name: "Machine Learning",
      description:
        "Build generative or predictive models to perform tasks autonomously.",
      imageSrc: "/assets/ml.svg",
      minorSkills: [
        { id: 1, name: "Python", imageSrc: "/assets/python.svg" },
        {
          id: 2,
          name: "Pandas",
          imageSrc:
            "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg",
        },
        {
          id: 3,
          name: "Scikit-learn",
          imageSrc: "/assets/scikitLearn.svg",
        },
        { id: 4, name: "PyTorch", imageSrc: "/assets/pytorch.svg" },
        { id: 5, name: "TensorFlow", imageSrc: "/assets/tf.svg" },
        { id: 6, name: "Keras", imageSrc: "/assets/Keras.svg" },
        { id: 7, name: "OpenCV", imageSrc: "/assets/opencv.svg" },
        { id: 8, name: "NLTK", imageSrc: "/assets/nltk.png" },
        { id: 9, name: "Hugging Face", imageSrc: "/assets/hf.svg" },
      ],
    },
  ];

  const getExtendedSkills = () => {
    return [...majorSkills, ...majorSkills, ...majorSkills];
  };

  const extendedSkills = getExtendedSkills();

  // Card dimensions 
  const CARD_SLOT_WIDTH = 320; 
  const CARD_GAP = 32;
  
  return (
    <section id="skills" className="min-h-screen py-24 px-4 relative">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <span className="relative flex items-center justify-center overflow-hidden h-12">
          <span
            className="absolute flex items-center justify-center transition-transform duration-500 ease-in-out inset-0"
            style={{
              transform: showIcon ? "translateY(0%)" : "translateY(-100%)",
            }}
          >
            <Hammer className="h-10 w-10" />
          </span>
          <span
            className="absolute flex items-center justify-center transition-transform duration-500 ease-in-out inset-0"
            style={{
              transform: showIcon ? "translateY(-100%)" : "translateY(0%)",
            }}
          >
            Skills
          </span>
          <span className="invisible">Skills</span>
        </span>
      </motion.h2>

      <motion.div
        className="relative flex items-center justify-center mt-40"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cards Container */}
        <div className="relative w-full max-w-6xl mx-auto px-8 overflow-visible">
          <div
            className="flex items-center gap-8 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${-((majorSkills.length + currentIndex) * (CARD_SLOT_WIDTH + CARD_GAP)) + 360}px)`,
              width: `${extendedSkills.length * (CARD_SLOT_WIDTH + CARD_GAP)}px`,
            }}
          >
            {extendedSkills.map((skill, index) => {
              const actualIndex = index % majorSkills.length;
              const distanceFromCenter = Math.abs(index - (majorSkills.length + currentIndex));
              const isCenter = index === majorSkills.length + currentIndex;
              const isAdjacent = distanceFromCenter === 1;
              const isVisible = distanceFromCenter <= 1;

              return (
                <SkillCard
                  key={`${skill.id}-${index}`}
                  skill={skill}
                  isCenter={isCenter}
                  isAdjacent={isAdjacent}
                  isVisible={isVisible}
                  onClick={() => setCurrentIndex(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Indicators */}
      <motion.div
        className="flex justify-center mt-10 gap-2"
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