import { useState, useEffect } from "react";
import {
  ArrowBigDown,
  BrainCog,
  BrickWallShield,
  Lightbulb,
  Github,
  Computer,
  Code,
  FileJson,
  Waypoints,
  Presentation,
  Users,
  ChartGantt,
  Keyboard,
  Workflow,
  Brain,
  MapPinned,
  DoorOpen,
  Rocket
} from "lucide-react";
import {
  VerticalTimelineElement,
  VerticalTimeline,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "motion/react";

export const RoadmapSection = () => {
  const [scrolled, setScrolled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY >
          100 +
            (document.getElementById("home")?.offsetHeight ?? 0) +
            (document.getElementById("about")?.offsetHeight ?? 0)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 3330);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="roadmap" className="min-h-screen py-24 px-4 relative">
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
            <MapPinned className="h-10 w-10" />
          </span>
          <span
            className="absolute flex items-center justify-center transition-transform duration-500 ease-in-out inset-0"
            style={{
              transform: showIcon ? "translateY(-100%)" : "translateY(0%)",
            }}
          >
            Roadmap
          </span>
          <span className="invisible">Roadmap</span>
        </span>
      </motion.h2>
      <VerticalTimeline
        className="vertical-timeline--education top-10"
        lineColor={`hsl(var(--foreground))`}
      >
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="Now"
          iconStyle={{
            background: `hsl(var(--card))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
          icon={
            <span className="h-14 w-14">
              <DoorOpen className="h-14 w-14" />
            </span>
          }
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Open to Work
          </h3>
          <div className="text-xl mt-2"> 
            Seeking IT related job opportunities while working on individual projects to gain experiences <Rocket className="mx-1 inline" />
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="July 2024 - December 2024"
          iconStyle={{
            background: `hsl(var(--card))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
          icon={<img src="/assets/qs.png" className="w-10 h-10" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Junior Software Engineer
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            Queue Solutions
          </h4>
          <ul className="list-disc space-y-2 text-xl mt-2">
            <li>
              Hired to work on Motivational Model Editor, an app built using
              React, TypeScript and Bootstrap{" "}
              <Keyboard className="mx-1 inline" />
            </li>
            <li>
              Mainly worked by requirements from supervisors, but also made a
              few satisfying user interface design by myself
              <Brain className="mx-1 inline" />
            </li>
            <li>
              Worked in Agile workflow where frquent, active and professional
              discussions were just as important as effective documentation
              using professional tools such as Slack, Trello and Jira
              <Workflow className="mx-1 inline" />{" "}
            </li>
            <li>
              Also responsible for version control in managing commits of
              different branches <Github className="mx-1 inline" />
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="March 2024 - July 2025"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/assets/unimelb.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Master of Information Technology
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            University of Melbourne
          </h4>
          <ul className="list-disc space-y-2 text-xl mt-2">
            <li>
              Machine Learning
              <BrainCog className="mx-1 inline" />: Computer Vision, Natural
              Language Processing
            </li>
            <li>
              Cyber Security
              <BrickWallShield className="mx-1 inline" />: Encryption &
              Decription Algorithms and Standards
            </li>
            <li>
              Innovation Project
              <Lightbulb className="mx-1 inline" />: Mobile Application for
              Reduce Waste on Foods
            </li>
            <li>
              Software Development Models and Design Methods
              <ChartGantt className="mx-1 inline" />: Agile, Formal, etc.
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="August 2023 - December 2023"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/assets/aia.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Algorithms in Action
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            Web Dev Intern
          </h4>

          <ul className="list-disc space-y-2 text-xl mt-2">
            <li>
              Dedicated in developing an application using React to demonstrate
              how searching algorithms work to students{" "}
              <Presentation className="mx-1 inline" />
            </li>
            <li>
              Worked on visualizing alogorithms including Dijkstra, Breath First
              Search, Depth First Search where users can customize the nodes and
              paths <Waypoints className="mx-1 inline" />{" "}
            </li>
            <li>
              Also played the role of product owner, who was responsible for
              arranging meetings and bridging the clients with the team{" "}
              <Users className="mx-1 inline" />{" "}
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="March 2021 - December 2023"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/assets/unimelb.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Bachelor of Science
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            University of Melbourne
          </h4>
          <ul className="list-disc space-y-2 text-xl mt-2">
            <li>
              Computer Fundamentals <Computer className="mx-1 inline" />: OS,
              Data Structure, Web, Hardware
            </li>
            <li>
              Coding and Dev Basics <Code className="mx-1 inline" />{" "}
            </li>
            <li>
              Data Analysis and Database Systems{" "}
              <FileJson className="mx-1 inline" />{" "}
            </li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline>

      <div className="flex justify-center mt-20">
        <a
          href="#skills"
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
