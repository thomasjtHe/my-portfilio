import { useState, useEffect } from "react";
import { ArrowBigDown } from "lucide-react";
import {
  VerticalTimelineElement,
  VerticalTimeline,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const RoadmapSection = () => {
  const [scrolled, setScrolled] = useState(true);

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
  return (
    <section id="roadmap" className="min-h-screen py-24 px-4 relative">
      <h2 className="subtitle">Roadmap</h2>
      <VerticalTimeline
        className="vertical-timeline--education"
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
          icon={<span className="text-4xl" role="img" aria-label="hugging-face">
      🤗
    </span>}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Open to Work 
          </h3>
          <p>
            Seeking IT related job opportunities while taking the professional year program to gain experiences.
          </p>
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
          icon={<img src="/src/assets/qs.png" className="w-10 h-10" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Junior Software Engineer
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            Queue Solutions
          </h4>
          <p>
            Focused on software development, algorithms, and data structures.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="March 2024 - July 2025"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/src/assets/unimelb.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Master of Information Technology
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            University of Melbourne
          </h4>
          <p>
            Focused on software development, algorithms, and data structures.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="August 2023 - December 2023"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/src/assets/aia.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Algorithms in Action
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            University of Melbourne
          </h4>
          <p>
            Focused on software development, algorithms, and data structures.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element text-foreground"
          contentStyle={{
            background: `hsla(var(--primary), 10%)`,
            color: `hsl(var(--foreground))`,
          }}
          date="March 2021 - December 2023"
          iconStyle={{ background: `hsl(var(--card))`, color: "#fff" }}
          icon={<img src="/src/assets/unimelb.png" />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-2xl">
            Bachelor of Science
          </h3>
          <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">
            University of Melbourne
          </h4>
          <p>
            Focused on software development, algorithms, and data structures.
          </p>
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
