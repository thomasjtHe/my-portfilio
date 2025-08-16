import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ContactDuck } from "./models/ContactDuck";
import { useState, useEffect } from "react";

export const ContactSection = () => {
  const [duckLoading, setDuckLoading] = useState(true);
  const [duckVisible, setDuckVisible] = useState(false);

  useEffect(() => {
    if (!duckLoading) {
      // Delay to allow loading overlay to fade out
      setTimeout(() => setDuckVisible(true), 100); // optional small delay
    }
  }, [duckLoading]);

  return (
    <section id="contact" className="min-h-screen py-24 px-4 relative">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Contact Me
      </motion.h2>

      <div className="container mx-auto h-[70vh] grid grid-rows-2 gap-8">
        {/* Contact Information - Hover Tabs */}
        {/* Duck Canvas - Takes up half the viewport height and centers the duck */}
        <div className="h-100 items-center justify-center flex relative min-h-[300px]">
          {/* Loading Overlay with Spinner */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-background/0 z-20 transition-opacity duration-300 ${
              duckLoading
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
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
              <ContactDuck scale={1} onLoad={() => setDuckLoading(false)} />
              <OrbitControls
                target={[0, 0.5, 0]}
                minDistance={3}
                maxDistance={6}
              />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-6 pl-8">
          {/* Gmail Tab */}
          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              {/* Icon (always visible) */}
              <div className="p-4 text-3xl text-red-500">
                <SiGmail />
              </div>

              {/* Expandable content */}
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-64">
                <div className="pr-6 whitespace-nowrap">
                  <span className="text-md">github.com/yourusername</span>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Tab */}
          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              {/* Icon (always visible) */}
              <div className="p-4 text-3xl text-gray-200">
                <FaGithub />
              </div>

              {/* Expandable content */}
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-64">
                <div className="pr-6 whitespace-nowrap">
                  <span className="text-md">github.com/yourusername</span>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Tab */}
          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              {/* Icon (always visible) */}
              <div className="p-4 text-3xl text-[#0077B5]">
                <FaLinkedinIn />
              </div>

              {/* Expandable content */}
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-64">
                <div className="pr-6 whitespace-nowrap">
                  <span className="text-md">github.com/yourusername</span>
                </div>
              </div>
            </div>
          </div>
          {/* Discord Tab */}
          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              {/* Icon (always visible) */}
              <div className="p-4 text-3xl text-[#5865F2]">
                <FaDiscord />
              </div>

              {/* Expandable content */}
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-64">
                <div className="pr-6 whitespace-nowrap">
                  <span className="text-md">github.com/yourusername</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};