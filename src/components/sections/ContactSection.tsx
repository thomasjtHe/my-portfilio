import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ContactDuck } from "../models/ContactDuck";
import { useState, useEffect, useMemo } from "react";
import { FileUser, PhoneIncoming, ExternalLink, Copy, Check } from "lucide-react";

export const ContactSection = () => {
  const [duckLoading, setDuckLoading] = useState(true);
  const [duckVisible, setDuckVisible] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [copyNotification, setCopyNotification] = useState<{
    show: boolean;
    text: string;
  }>({ show: false, text: "" });

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

  const toggleCard = (cardId: string) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyNotification({ show: true, text: `Copied "${text}" to clipboard` });

      // Hide notification after 2 seconds
      setTimeout(() => {
        setCopyNotification({ show: false, text: "" });
      }, 2000);
    });
  };

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
      {/* Copy Notification Toast */}
      <AnimatePresence>
        {copyNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-15 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className="bg-primary/50 text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-sm border border-primary/20">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Desktop Version */}
        <div className="hidden md:flex flex-row flex-wrap justify-center items-center gap-6 mb-10">
          <div
            className={`group relative cursor-pointer ${
              openCard === "email" ? "z-10" : ""
            }`}
            onClick={() => toggleCard("email")}
          >
            <div
              className={`flex items-center bg-card/30 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out min-w-0 ${
                openCard === "email" ? "bg-card/65" : "group-hover:bg-card/65"
              }`}
            >
              <div className="p-4 text-3xl text-red-500 flex-shrink-0">
                <SiGmail />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-center ease-out ${
                  openCard === "email"
                    ? "w-60 animate-blur-in"
                    : "w-0 group-hover:w-60 group-hover:animate-blur-in"
                }`}
              >
                <div className="pr-6 whitespace-nowrap flex items-center justify-center gap-2">
                  <span className="text-md">thomashe42@gmail.com</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard("thomashe42@gmail.com");
                    }}
                    className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Copy email"
                  >
                    <Copy className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`group relative cursor-pointer ${
              openCard === "github" ? "z-10" : ""
            }`}
            onClick={() => toggleCard("github")}
          >
            <div
              className={`flex items-center bg-card/30 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out min-w-0 ${
                openCard === "github" ? "bg-card/65" : "group-hover:bg-card/65"
              }`}
            >
              <div className="p-4 text-3xl text-gray-200 flex-shrink-0">
                <FaGithub />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-center ease-out ${
                  openCard === "github"
                    ? "w-60 animate-blur-in"
                    : "w-0 group-hover:w-60 group-hover:animate-blur-in"
                }`}
              >
                <div className="pr-6 whitespace-nowrap flex items-center justify-center gap-2">
                  <a
                    href="https://github.com/thomasjtHe"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    github.com/thomasjtHe
                  </a>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`group relative cursor-pointer ${
              openCard === "linkedin" ? "z-10" : ""
            }`}
            onClick={() => toggleCard("linkedin")}
          >
            <div
              className={`flex items-center bg-card/30 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out min-w-0 ${
                openCard === "linkedin" ? "bg-card/65" : "group-hover:bg-card/65"
              }`}
            >
              <div className="p-4 text-3xl text-[#0077B5] flex-shrink-0">
                <FaLinkedinIn />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-right ease-out ${
                  openCard === "linkedin"
                    ? "w-80 animate-blur-in"
                    : "w-0 group-hover:w-80 group-hover:animate-blur-in"
                }`}
              >
                <div className="pr-6 whitespace-nowrap flex items-center justify-end gap-2">
                  <a
                    href="https://www.linkedin.com/in/thomas-he-8ba66336a"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    www.linkedin.com/in/thomas-he-8ba66336a
                  </a>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`group relative cursor-pointer ${
              openCard === "discord" ? "z-10" : ""
            }`}
            onClick={() => toggleCard("discord")}
          >
            <div
              className={`flex items-center bg-card/30 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out min-w-0 ${
                openCard === "discord" ? "bg-card/65" : "group-hover:bg-card/65"
              }`}
            >
              <div className="p-4 text-3xl text-[#5865F2] flex-shrink-0">
                <FaDiscord />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-right ease-out ${
                  openCard === "discord"
                    ? "w-40 animate-blur-in"
                    : "w-0 group-hover:w-40 group-hover:animate-blur-in"
                }`}
              >
                <div className="pr-6 whitespace-nowrap text-center flex items-center justify-center gap-2">
                  <span className="text-md">chillaxx</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard("chillaxx");
                    }}
                    className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Copy Discord username"
                  >
                    <Copy className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`group relative cursor-pointer ${
              openCard === "resume" ? "z-10" : ""
            }`}
            onClick={() => toggleCard("resume")}
          >
            <div
              className={`flex items-center bg-card/30 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out min-w-0 ${
                openCard === "resume" ? "bg-card/65" : "group-hover:bg-card/65"
              }`}
            >
              <div className="p-4 text-3xl text-black flex-shrink-0">
                <FileUser className="h-8 w-8" />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-right ease-out ${
                  openCard === "resume"
                    ? "w-36 animate-blur-in"
                    : "w-0 group-hover:w-36 group-hover:animate-blur-in"
                }`}
              >
                <div className="pr-6 whitespace-nowrap flex items-center justify-center gap-2">
                  <a
                    href="/assets/Jinting_He_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Resume
                  </a>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden flex flex-col items-center gap-4 mb-10">
          <div
            className={`bg-card/30 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 ease-out w-3/4 max-w-xs cursor-pointer ${
              openCard === "email" ? "bg-card/65" : ""
            }`}
            onClick={() => toggleCard("email")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-red-500/10 border-2 border-red-500/20 flex-shrink-0">
                <SiGmail className="text-red-500 w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold">Email</h4>
            </div>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "email"
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-background/50 rounded-lg p-2 mt-2 border border-border/20 hover:bg-background/70 transition-colors duration-200">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm break-all flex-1">
                    thomashe42@gmail.com
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard("thomashe42@gmail.com");
                    }}
                    className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Copy email"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-card/30 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 ease-out w-3/4 max-w-xs cursor-pointer ${
              openCard === "github" ? "bg-card/65" : ""
            }`}
            onClick={() => toggleCard("github")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-gray-200/10 border-2 border-gray-200/20 flex-shrink-0">
                <FaGithub className="text-gray-200 w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold">GitHub</h4>
            </div>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "github"
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-background/50 rounded-lg p-2 mt-2 border border-border/20 hover:bg-background/70 transition-colors duration-200">
                <a
                  href="https://github.com/thomasjtHe"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm break-all flex-1 group-hover:underline">
                    github.com/thomasjtHe
                  </span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`bg-card/30 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 ease-out w-3/4 max-w-xs cursor-pointer ${
              openCard === "linkedin" ? "bg-card/65" : ""
            }`}
            onClick={() => toggleCard("linkedin")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-[#0077B5]/10 border-2 border-[#0077B5]/20 flex-shrink-0">
                <FaLinkedinIn className="text-[#0077B5] w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold">LinkedIn</h4>
            </div>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "linkedin"
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-background/50 rounded-lg p-2 mt-2 border border-border/20 hover:bg-background/70 transition-colors duration-200">
                <a
                  href="https://www.linkedin.com/in/thomas-he-8ba66336a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm break-all flex-1 group-hover:underline">
                    www.linkedin.com/in/thomas-he-8ba66336a
                  </span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`bg-card/30 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 ease-out w-3/4 max-w-xs cursor-pointer ${
              openCard === "discord" ? "bg-card/65" : ""
            }`}
            onClick={() => toggleCard("discord")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-[#5865F2]/10 border-2 border-[#5865F2]/20 flex-shrink-0">
                <FaDiscord className="text-[#5865F2] w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold">Discord</h4>
            </div>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "discord"
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-background/50 rounded-lg p-2 mt-2 border border-border/20 hover:bg-background/70 transition-colors duration-200">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm flex-1">chillaxx</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard("chillaxx");
                    }}
                    className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Copy username"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-card/30 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 ease-out w-3/4 max-w-xs cursor-pointer ${
              openCard === "resume" ? "bg-card/65" : ""
            }`}
            onClick={() => toggleCard("resume")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-black/10 border-2 border-black/20 flex-shrink-0">
                <FileUser className="text-black w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold">Resume</h4>
            </div>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openCard === "resume"
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-background/50 rounded-lg p-2 mt-2 border border-border/20 hover:bg-background/70 transition-colors duration-200">
                <a
                  href="/assets/Jinting_He_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm flex-1 group-hover:underline">
                    Download My Resume
                  </span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};