import { useState, useEffect } from "react";


export type ProjectProps = {
    name: string;
    imageSrc: string[];
    description: string;
}

type ProjectCardProps = {
  project: ProjectProps;
  onClick?: () => void;
};

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.imageSrc.length);
      }, 3000); // Switch image every 3 seconds
      return () => clearInterval(interval);
    }
  , [])

  return (
    <div className="w-80 flex-shrink-0 flex justify-center card-hover m-8 items-center" onClick={onClick}>
      <div
        className={`
          transition-all duration-500 ease-out transform origin-center scale-110 opacity-100`}
      >
        <div
          className={`
            bg-background/50 backdrop-blur-sm rounded-xl border border-border p-6 
            shadow-2xl  w-72 transition-all duration-500 ease-out hover:scale-105'`}
        >
          {/* Image Container */}
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
            {project.imageSrc.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${project.name} - ${index}`}
                className={`
                  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                  ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                `}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>

          {/* Project Name */}
          <h3
            className={`
              text-center font-bold mb-2 transition-all duration-500 ease-out
              text-xl text-primary
            `}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p
            className={`
              text-center text-foreground/70 text-sm mb-4 
              transition-all duration-300 ease-in-out
              opacity-100 max-h-20
            `}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};
