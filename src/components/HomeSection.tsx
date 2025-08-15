import { ArrowBigDown } from "lucide-react";
import { useState, useEffect } from "react";


export const HomeSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      console.log(scrolled)
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log(scrolled)
    };
  }, []);
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen px-4">
  <div className="container max-w-xl mx-auto text-center z-10">
    <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight rounded-2xl">
      <span className="opacity-0 animate-fade-in">Hi, I'm </span>
      <span className="text-primary opacity-0 animate-fade-in-delay-1">CCDUCK</span>
    </h1>
    <p className="opacity-0 animate-fade-in-delay-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nesciunt.</p>
    <div className="pt-4 opacity-0 animate-fade-in-delay-3">
    </div>
  </div>
 
  <a href="#about" className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 text-center ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100'} transition delay-150 duration-300`}>
  <div className="bottom-6 animate-bounce cursor-pointer flex flex-col items-center">
    Scroll Down to Check More!
    <ArrowBigDown />
  </div>
</a>
  
</section>

  );
};
