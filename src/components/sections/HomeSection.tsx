import { ArrowBigDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Duck } from "../models/Duck";

export const HomeSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const [duckLoading, setDuckLoading] = useState(true);
  const [duckVisible, setDuckVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      console.log(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log(scrolled);
    };
  }, []);

  useEffect(() => {
    if (!duckLoading) {
      // Delay to allow loading overlay to fade out
      setTimeout(() => setDuckVisible(true), 100); // optional small delay
    }
  }, [duckLoading]);
  
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen px-4"
    >
      <div className="container max-w-xl mx-auto text-center z-10">
        <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight rounded-2xl">
          <span className="opacity-0 animate-fade-in">Hi, I 'm </span>
          <span className="text-primary opacity-0 animate-fade-in-delay-1">
            Thomas He
          </span>
        </h1>
        <p className="opacity-0 animate-fade-in-delay-2 text-xl">
          {" "}
          I make Techy and Goofy stuff
        </p>
        <div className="h-100 items-center justify-center flex relative min-h-[300px]">
          {/* Loading Overlay with Spinner */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-background/0 z-20 transition-opacity duration-300 ${
              duckLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* SVG Loading Ring Spinner */}
            <svg
              className="animate-spin h-12 w-12 text-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
          {/* Fade-in Duck Canvas */}
          <div
            className={`w-full h-full transition-opacity duration-300 ${
              duckVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Canvas camera={{ position: [1, 0, 0.5], fov: 40 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 2]} intensity={0.5} />
              <Duck scale={1} onLoad={() => setDuckLoading(false)} />
              <OrbitControls target={[0, 0.5, 0]} minDistance={3} maxDistance={6} enableZoom={false} />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 text-center ${
          scrolled
            ? "opacity-0 translate-y-4 pointer-events-none"
            : "opacity-100"
        } transition delay-150 duration-300`}
      >
        <div className="bottom-6 animate-bounce cursor-pointer flex flex-col items-center">
          Scroll Down to Learn More!
          <ArrowBigDown />
        </div>
      </a>
    </section>
  );
};
