import { useEffect, useState } from "react";

type starProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
};

type meteorProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

export const StarBackground = () => {
  const [star, setStar] = useState<starProps[]>([]);
  const [meteor, setMeteor] = useState<meteorProps[]>([]);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      ((window.innerWidth / 100) * window.innerHeight) / 100
    );
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 4 + 1,
      });
    }
    setStar(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 20,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 15,
        duration: Math.random() * 3 + 3,
      });
    }
    setMeteor(newMeteors);
  };

  useEffect(() => {
    generateMeteors();
    generateStars();

    window.addEventListener("resize", () => { 
        generateStars();
        } );
        
    return () => {
      window.removeEventListener("resize", generateStars);
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {star.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "white",
            opacity: star.opacity,
            borderRadius: "50%",
            animation: `${star.duration}s`,
          }}
        ></div>
      ))}
      {meteor.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 0.5}px`,
            animationDuration: `${meteor.duration}s`,
          }}
        ></div>
      ))}
    </div>
  );
};
