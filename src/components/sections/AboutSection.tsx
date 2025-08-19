import { Briefcase, Code, User, ArrowBigDown } from "lucide-react";
import { useState, useEffect } from "react";
import { LuBinary } from "react-icons/lu";
import { motion } from "motion/react";

export const AboutSection = () => {
  const [scrolled, setScrolled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
        <motion.h2
          className="subtitle"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary inline-flex">
            A {showIcon ? <LuBinary className="mt-[2px]" /> : "Bit"}{" "}
          </span>{" "}
          About <span className="text-primary">Myself</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 items-center text-center gap-8 mt-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <h3 className="font-semibold text-2xl">
              A <span className="text-primary">Graduate Developer</span>
            </h3>
            <p className="text-foreground items-center">
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
          <div className="flex flex-col text-foreground items-center justify-center ml-50">
            <div className="flex group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 my-2 min-w-[202px]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <User className="text-white" />
                </div>
                <h4 className="text-lg font-semibold justify-center">Status</h4>
                <div className="transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden group-hover:w-[30rem] flex-shrink-0 min-h-20">
                  <p className="pr-6 line-clamp-3 blur-sm opacity-0 group-hover:blur-none group-hover:opacity-100 transition-all duration-1000 delay-300">
                    Recent university graduate based in Melbourne, currently actively
                    seeking career opportunities across Australia. Open to
                    remote positions Australia-wide or in-person/hybrid roles in
                    Melbourne.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 my-2 min-w-[202px]">
              <div className="flex items-center gap-4 ">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <Briefcase className="text-white" />
                </div>

                <h4 className="text-lg font-semibold">Experience</h4>
                <div className="transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden group-hover:w-[30rem] flex-shrink-0 min-h-20">
                  <p className="pr-6 line-clamp-4 blur-sm opacity-0 group-hover:blur-none group-hover:opacity-100 transition-all duration-1000 delay-300">
                    Strong academic foundation in machine learning with hands-on
                    project experience in key deep learning domains including
                    Computer Vision and Natural Language Processing. One year of
                    working experience as a software engineer focusing on UI/UX
                    design and web development.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 my-2 min-w-[202px]">
              <div className="flex items-center gap-4 ">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border">
                  <Code className="text-white" />
                </div>

                <h4 className="text-lg font-semibold whitespace-nowrap">
                  Languages
                </h4>
                <div className="transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden group-hover:w-[30rem] flex-shrink-0 h-20">
                  <div className="grid grid-cols-5 auto-rows-min gap-2 pr-6">
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      HTML
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      CSS
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      JavaScript
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      Java
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xltext-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      C
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      Python
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      MySQL
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      R
                    </div>
                    <div className="px-3 py-1 bg-background rounded-xl text-center opacity-0 group-hover:opacity-100 group-hover:animate-blur-in">
                      Haskell
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-20">
        <a
          href="#roadmap"
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
