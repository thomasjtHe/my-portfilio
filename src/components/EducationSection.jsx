import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export const EducationSection = () => {
    const [scrolled, setScrolled] = useState(true);
      
        useEffect(() => {
          const handleScroll = () => {
            setScrolled(
              window.scrollY >
                (
                  100 +
                  (document.getElementById("home")?.offsetHeight ?? 0) +
                  (document.getElementById("about")?.offsetHeight ?? 0) 
                )
            );
          };
          window.addEventListener("scroll", handleScroll);
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        });
  return (
    <section id="education" className="min-h-screen py-24 px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Education
      </h2>


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
  )
}
