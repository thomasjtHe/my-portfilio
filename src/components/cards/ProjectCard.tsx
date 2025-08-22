import { useState, useEffect, useRef } from "react";

export type ProjectProps = {
  name: string;
  imageSrc: string[];
  description: string;
  skills: string[];
  link: string;
};

type ProjectCardProps = {
  project: ProjectProps;
  onClick?: () => void;
  isExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  index: number;
};

export const ProjectCard = ({
  project,
  onClick,
  isExpanded = false,
  onExpand,
}: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to truncate description to first 20 words
  const truncateDescription = (text: string, wordLimit: number = 20) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Stable interval (consider pausing when not visible if performance matters)
  useEffect(() => {
    if (project.imageSrc.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.imageSrc.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project.imageSrc.length]);

  const handleCardClick = () => {
    setIsAnimating(true);
    onExpand?.(!isExpanded);
    onClick?.();
    
    // Re-enable content after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Match the animation duration
  };

  // Heights for smooth animation (you can tune these)
  const COLLAPSED_IMAGE_HEIGHT = 128; 

  return (
    <div
      className={`
        flex-shrink-0 flex justify-center items-center relative 
        transition-all duration-1000 ease-in-out cursor-pointer
        ${isExpanded ? "flex-1 w-full" : "w-80"}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        zIndex: isExpanded ? 50 : 10,
      }}
    >
      <div
        className={`
          transition-all duration-1000 ease-in-out transform origin-center
          ${isExpanded ? "w-full max-w-6xl" : "w-72"}
        `}
      >
        <div
          className={`
            bg-background/50 backdrop-blur-sm rounded-xl p-6
            shadow-2xl transition-all duration-1000 ease-in-out w-full overflow-hidden
            ${isExpanded 
              ? "h-auto min-h-96 shadow-3xl bg-card/70" 
              : "h-64 hover:scale-105 hover:shadow-xl"
            }
          `}
          style={{
            border: isExpanded 
              ? "1px solid hsl(var(--primary) / 0.3)" 
              : "1px solid hsl(var(--border))"
          }}
        >
          {/* Use one consistent flex container; switch direction & gaps only */}
          <div
            className={`
              flex transition-all duration-1000 ease-in-out h-full
              ${isExpanded ? "flex-row gap-6" : "flex-col"}
            `}
          >
            {/* Image Container */}
            <div
              className={`
                relative overflow-hidden rounded-lg transition-all duration-1000 ease-in-out animate-blur-in
                ${isExpanded ? "w-1/2" : "w-full"}
              `}
              style={{
                height: isExpanded ? "100%" : `${COLLAPSED_IMAGE_HEIGHT}px`,
                minHeight: isExpanded ? "400px" : `${COLLAPSED_IMAGE_HEIGHT}px`,
              }}
            >
              {/* A static background (current image) to ensure no blank frame */}
              {project.imageSrc.map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt={`${project.name} - ${imgIndex}`}
                  className={`
                    absolute inset-0 w-full h-full object-cover 
                    transition-all duration-700 will-change-opacity
                    ${imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"}
                    ${!isExpanded && !isHovered ? "blur-sm" : "blur-none"}
                  `}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                  draggable={false}
                />
              ))}

              {/* Overlay gradient when expanded */}
              <div
                className={`
                  pointer-events-none absolute inset-0 bg-gradient-to-r 
                  from-black/60 via-black/20 to-transparent transition-opacity duration-1000 ease-in-out
                  ${isExpanded ? "opacity-100" : "opacity-0"}
                `}
              />

              {/* Click indicator when not expanded */}
              {!isExpanded && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Click to expand
                  </div>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div
              className={`
                transition-all duration-1000 ease-in-out
                flex flex-col overflow-hidden
                ${isExpanded ? "w-1/2 text-left py-4 pl-6" : "w-full text-center"}
                ${isAnimating ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            >
              {!isAnimating && (
                <>
                  <h3
                    className={`
                      font-bold transition-all duration-300 ease-in-out
                      ${isExpanded ? "text-3xl md:text-4xl text-primary mb-4" : "text-xl text-primary mb-2"}
                    `}
                  >
                    {project.name}
                  </h3>

                  <p
                    className={`
                      text-foreground/70 transition-all duration-300 ease-in-out
                      ${isExpanded ? "text-base md:text-lg leading-relaxed mb-6" : "text-sm mb-2"}
                    `}
                  >
                    {isExpanded ? project.description : truncateDescription(project.description)}
                  </p>

                  {/* Additional content when expanded */}
                  {isExpanded && (
                    <div className="transition-all duration-300 ease-in-out">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground/80 mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full whitespace-nowrap"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          View Project
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};