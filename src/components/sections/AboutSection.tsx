import {
  Briefcase,
  Code,
  User,
  ArrowBigDown,
  GraduationCap,
  Languages,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LuBinary } from "react-icons/lu";
import { motion } from "motion/react";

export const AboutSection = () => {
  const [scrolled, setScrolled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showIcon2, setShowIcon2] = useState(true);
  const [openCard, setOpenCard] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 3330);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon2((prev) => !prev);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY >
          150 + (document.getElementById("home")?.offsetHeight ?? 0)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const toggleCard = (cardId: string) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

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
            A
            <span className="relative overflow-hidden ml-1">
              <span
                className="absolute flex items-start transition-transform duration-500 ease-in-out"
                style={{
                  transform: showIcon ? "translateY(0%)" : "translateY(-100%)",
                }}
              >
                <LuBinary className="mt-[2px]" />
              </span>
              <span
                className="absolute flex items-start transition-transform duration-500 ease-in-out"
                style={{
                  transform: showIcon ? "translateY(-100%)" : "translateY(0%)",
                }}
              >
                Bit
              </span>
              <span className="invisible">
                <LuBinary className="mt-[2px]" />
              </span>
            </span>
          </span>{" "}
          About <span className="text-primary">Myself</span>
        </motion.h2>

        <motion.div
          className="grid grid-rows-[1fr_2fr] items-center text-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6 text-left">
            <div className="text-foreground">
              <div className="subtitle inline text-primary">I am</div> currently 21 y/o and just graduated from university. My study
              focus was on Artificial Intelleigence where I experimented with{" "}
              <div className="text-2xl inline text-primary">
                {" "}
                SOTA machine learning technologies{" "}
              </div>
              to perform tasks in different fields including{" "}
              <div className="text-2xl inline text-primary">
                {" "}
                semantic analysis, text classification, image classification and
                segmentation.
              </div>{" "}
              Besides that, I am also keen on{" "}
              <div className="text-2xl inline text-primary">
                Web Development,
              </div>{" "}
              where I would attempt to replicate popular web or mobile
              applications such as Netflix, Amazon in my spare time. I also
              worked as a{" "}
              <div className="text-2xl inline text-primary">Web Dev Intern</div>{" "}
              for a total of one year during both my Bachelor's and Master's
              studies. I enjoy solving problems individually as much as I enjoy
              collaborating with my peers, learning from people who are more
              experienced than me to deliver products that will come in handy
              and be impressive to our end users.
            </div>
            <div className="text-center">
              <a
              href="/assets/Jinting_He_Resume.pdf"
              className="pdf-link cosmic-button rounded-full border-primary hover:bg-primary/50 transition-colors duration-300"
              target="_blank"
            >
              📄 Check My Resume
            </a>
            </div>
            
          </div>

          {/* Desktop Version */}
          <div className="hidden md:flex flex-col text-foreground items-center justify-center">
            <div 
              className={`flex group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out my-2 min-w-[202px] cursor-pointer overflow-hidden ${
                openCard === "status" ? "bg-card/95" : "hover:bg-card/95"
              }`}
              onClick={() => toggleCard("status")}
            >
              <div className="flex items-center gap-4 min-w-0 w-full">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border flex-shrink-0">
                  <User className="text-white" />
                </div>
                <h4 className="text-lg font-semibold justify-center flex-shrink-0">Status</h4>
                <div className={`transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden flex-shrink-0 min-h-20 ${
                  openCard === "status" ? "w-[30rem]" : "group-hover:w-[30rem]"
                }`}>
                  <p className={`pr-6 line-clamp-3 transition-all duration-1000 delay-300 ${
                    openCard === "status" ? "blur-none opacity-100" : "blur-sm opacity-0 group-hover:blur-none group-hover:opacity-100"
                  }`}>
                    Based in Melbourne, currently actively seeking career
                    opportunities across Australia. Open to remote positions
                    Australia-wide or in-person/hybrid roles in Melbourne.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out my-2 min-w-[202px] cursor-pointer overflow-hidden ${
                openCard === "experience" ? "bg-card/95" : "hover:bg-card/95"
              }`}
              onClick={() => toggleCard("experience")}
            >
              <div className="flex items-center gap-4 min-w-0 w-full">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border relative overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(0%)"
                        : "translateX(-100%)",
                    }}
                  >
                    <Briefcase className="text-white" />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(100%)"
                        : "translateX(0%)",
                    }}
                  >
                    <GraduationCap className="text-white" />
                  </div>

                  <div className="invisible">
                    <GraduationCap />
                  </div>
                </div>

                <h4 className="text-lg font-semibold flex-shrink-0">Experience</h4>
                <div className={`transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden flex-shrink-0 min-h-20 ${
                  openCard === "experience" ? "w-[30rem]" : "group-hover:w-[30rem]"
                }`}>
                  <p className={`pr-6 line-clamp-4 transition-all duration-1000 delay-300 ${
                    openCard === "experience" ? "blur-none opacity-100" : "blur-sm opacity-0 group-hover:blur-none group-hover:opacity-100"
                  }`}>
                    Strong academic foundation in machine learning with hands-on
                    project experience in key deep learning domains including
                    Computer Vision and Natural Language Processing. One year of
                    working experience as a software engineer focusing on UI/UX
                    design and web development.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`group bg-card/50 backdrop-blur-sm p-6 card-hover rounded-full shadow-lg transition-all duration-300 ease-out my-2 min-w-[202px] cursor-pointer overflow-hidden ${
                openCard === "languages" ? "bg-card/95" : "hover:bg-card/95"
              }`}
              onClick={() => toggleCard("languages")}
            >
              <div className="flex items-center gap-4 min-w-0 w-full">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-border relative overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(0%)"
                        : "translateX(-100%)",
                    }}
                  >
                    <Code className="text-white" />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(100%)"
                        : "translateX(0%)",
                    }}
                  >
                    <Languages className="text-white" />
                  </div>

                  <div className="invisible">
                    <Code />
                  </div>
                </div>

                <h4 className="text-lg font-semibold whitespace-nowrap flex-shrink-0">
                  Languages
                </h4>
                <div className={`transition-all duration-500 ease-out w-0 min-w-0 overflow-hidden flex-shrink-0 h-20 ${
                  openCard === "languages" ? "w-[30rem]" : "group-hover:w-[30rem]"
                }`}>
                  <div className="grid grid-cols-5 auto-rows-min gap-2 pr-6">
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      HTML
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      CSS
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      JavaScript
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      Java
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      C
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      Python
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      MySQL
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      R
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      English
                    </div>
                    <div className={`px-3 py-1 bg-background rounded-xl text-center ${
                      openCard === "languages" ? "opacity-100 animate-blur-in" : "opacity-0 group-hover:opacity-100 group-hover:animate-blur-in"
                    }`}>
                      Mandarin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden flex flex-col text-foreground items-center justify-center space-y-4">
            <div 
              className={`bg-card/50 backdrop-blur-sm p-4 card-hover rounded-xl shadow-lg transition-all duration-300 ease-out w-full cursor-pointer ${
                openCard === "status" ? "bg-card/95" : ""
              }`}
              onClick={() => toggleCard("status")}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10 border-2 border-border flex-shrink-0">
                  <User className="text-white w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold">Status</h4>
              </div>
              <div className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "status" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <p className="text-sm mt-2 px-2">
                  Based in Melbourne, currently actively seeking career
                  opportunities across Australia. Open to remote positions
                  Australia-wide or in-person/hybrid roles in Melbourne.
                </p>
              </div>
            </div>

            <div 
              className={`bg-card/50 backdrop-blur-sm p-4 card-hover rounded-xl shadow-lg transition-all duration-300 ease-out w-full cursor-pointer ${
                openCard === "experience" ? "bg-card/95" : ""
              }`}
              onClick={() => toggleCard("experience")}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10 border-2 border-border relative overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(0%)"
                        : "translateX(-100%)",
                    }}
                  >
                    <Briefcase className="text-white w-5 h-5" />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(100%)"
                        : "translateX(0%)",
                    }}
                  >
                    <GraduationCap className="text-white w-5 h-5" />
                  </div>
                  <div className="invisible">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Experience</h4>
              </div>
              <div className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "experience" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <p className="text-sm mt-2 px-2">
                  Strong academic foundation in machine learning with hands-on
                  project experience in key deep learning domains including
                  Computer Vision and Natural Language Processing. One year of
                  working experience as a software engineer focusing on UI/UX
                  design and web development.
                </p>
              </div>
            </div>

            <div 
              className={`bg-card/50 backdrop-blur-sm p-4 card-hover rounded-xl shadow-lg transition-all duration-300 ease-out w-full cursor-pointer ${
                openCard === "languages" ? "bg-card/95" : ""
              }`}
              onClick={() => toggleCard("languages")}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10 border-2 border-border relative overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(0%)"
                        : "translateX(-100%)",
                    }}
                  >
                    <Code className="text-white w-5 h-5" />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform: showIcon2
                        ? "translateX(100%)"
                        : "translateX(0%)",
                    }}
                  >
                    <Languages className="text-white w-5 h-5" />
                  </div>
                  <div className="invisible">
                    <Code className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Languages</h4>
              </div>
              <div className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "languages" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="grid grid-cols-3 gap-2 mt-2 px-2">
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">HTML</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">CSS</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">JavaScript</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">Java</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">C</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">Python</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">MySQL</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">R</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">English</div>
                  <div className="px-2 py-1 bg-background rounded-lg text-center text-xs">Mandarin</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-20">
        <a
          href="#roadmap"
          className={`hidden md:block absolute bottom-5.5 ${
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
