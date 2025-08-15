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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Roadmap
      </h2>
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
          date="March 2021 - December 2023"
          iconStyle={{ background: "#3f51b5", color: "#fff" }}
          icon={<i className="fas fa-graduation-cap"></i>}
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
