import { Briefcase, Code, User } from "lucide-react";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export const AboutSection = () => {
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY >
          100 + (document.getElementById("home")?.offsetHeight ?? 0)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <section id="about" className="py-24 px-4 relative min-h-screen">
      {""}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-40">
          <div className="space-y-6">
            <h3 className="font-semibold text-2xl">
              A <span className="text-primary">Graduate Developer</span>
            </h3>
            <p className="text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam,
              corporis magni ea labore fugiat suscipit commodi iure, sunt
              nostrum repudiandae harum dolorum veniam numquam! Modi facilis
              repellendus fuga nam dignissimos, sapiente exercitationem
              repudiandae voluptate nulla debitis illum totam non optio earum,
              in iste iure magni explicabo aut ipsum. Quos, mollitia?
            </p>
            <a
              href="src/assets/Jinting_He_Resume.pdf"
              className="pdf-link cosmic-button rounded-full border-primary hover:bg-primary/50 transition-colors duration-300"
              target="_blank"
            >
              📄 My Resume
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 text-foreground">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <Code className="text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Skills</h4>
                  <p className="text-foreground/80">
                    JavaScript, React, Node.js, TypeScript, Python
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <User className="text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Focus</h4>
                  <p className="text-foreground/80">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, voluptatibus?
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <Briefcase className="text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Experience</h4>
                  <p className="text-foreground/80">
                    6 months internship at XYZ Company, 1 year freelance
                    experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <a
          href="#skills"
          className={`hidden md:block absolute bottom-1.5 ${
            scrolled
              ? "opacity-0 translate-y-4 pointer-events-none"
              : "opacity-100"
          } transition delay-150 duration-300`}
        >
          <ArrowDown className=" animate-bounce cursor-pointer" />
        </a>
      </div>
    </section>
  );
};
