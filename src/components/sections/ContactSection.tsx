import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ContactDuck } from "../models/ContactDuck";
import { useState, useEffect, useMemo } from "react";
import { FileUser, PhoneIncoming } from "lucide-react";

export const ContactSection = () => {
  const [duckLoading, setDuckLoading] = useState(true);
  const [duckVisible, setDuckVisible] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 3330);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!duckLoading) {
      setTimeout(() => setDuckVisible(true), 100);
    }
  }, [duckLoading]);

  const canvasComponent = useMemo(
    () => (
      <Canvas camera={{ position: [0.8, 0.7, 0.4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={0.5} />
        <ContactDuck scale={1.2} onLoad={() => setDuckLoading(false)} />
        <OrbitControls
          target={[0, 0.5, 0]}
          minDistance={2}
          maxDistance={4}
          enableZoom={false}
        />
        <Environment preset="sunset" />
      </Canvas>
    ),
    [duckLoading]
  );

  return (
    <section
      id="contact"
      className="min-h-screen pt-24 px-4 relative flex flex-col"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mt-15 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center justify-center gap-3 h-12">
          <span className="relative inline-grid h-full overflow-hidden">
            <span
              className={`col-start-1 row-start-1 flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out ${
                showIcon ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <PhoneIncoming className="h-8 w-8" />
            </span>
            <span
              className={`col-start-1 row-start-1 flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out ${
                showIcon ? "translate-y-full" : "translate-y-0"
              }`}
            >
              Contact
            </span>
          </span>
          <span className="text-primary">Me</span>
        </span>
      </motion.h2>

      <div className="container mx-auto flex-1 grid grid-rows-[2fr_auto] gap-8 mt-15">
        <div className="h-100 items-center justify-center flex relative min-h-[300px]">
          <div
            className={`absolute inset-0 flex items-center justify-center bg-background/0 z-20 transition-opacity duration-300 ${
              duckLoading
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
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

          <div
            className={`w-full h-full transition-opacity duration-300 ${
              duckVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {canvasComponent}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-0 right-0 pointer-events-auto bg-transparent"
              style={{ height: "calc(50% - 128px)" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-auto bg-transparent"
              style={{ height: "calc(50% - 128px)" }}
            ></div>
            <div
              className="absolute left-0 pointer-events-auto bg-transparent"
              style={{
                top: "calc(50% - 128px)",
                width: "calc(50% - 128px)",
                height: "256px",
              }}
            ></div>
            <div
              className="absolute right-0 pointer-events-auto bg-transparent"
              style={{
                top: "calc(50% - 128px)",
                width: "calc(50% - 128px)",
                height: "256px",
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center items-center gap-6 mb-10">
          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              <div className="p-4 text-3xl text-red-500">
                <SiGmail />
              </div>
              <div className="overflow-hidden transition-all duration-300 text-center ease-out w-0 group-hover:w-48 group-hover:animate-blur-in">
                <div className="pr-6 whitespace-nowrap">
                  <span className="text-md">thomashe42@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              <div className="p-4 text-3xl text-gray-200">
                <FaGithub />
              </div>
              <div className="overflow-hidden transition-all duration-300 text-center ease-out w-0 group-hover:w-48 group-hover:animate-blur-in">
                <div className="pr-6 whitespace-nowrap">
                  <a
                    href="https://github.com/thomasjtHe"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                  >
                    github.com/thomasjtHe
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              <div className="p-4 text-3xl text-[#0077B5]">
                <FaLinkedinIn />
              </div>
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-72 group-hover:animate-blur-in">
                <div className="pr-6 whitespace-nowrap">
                  <a
                    href="https://www.linkedin.com/in/thomas-he-8ba66336a"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                  >
                    www.linkedin.com/in/thomas-he-8ba66336a
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              <div className="p-4 text-3xl text-[#5865F2]">
                <FaDiscord />
              </div>
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-32 group-hover:animate-blur-in">
                <div className="pr-6 whitespace-nowrap text-center">
                  <span className="text-md">chillaxx</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out group-hover:bg-card/95 min-w-0">
              <div className="p-4 text-3xl text-white">
                <FileUser />
              </div>
              <div className="overflow-hidden transition-all duration-300 text-right ease-out w-0 group-hover:w-16 group-hover:animate-blur-in">
                <div className="pr-6 whitespace-nowrap">
                  <a
                    href="src/assets/Jinting_He_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
};