import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import { RubberDuck, SleepyDuck } from "./Icons/RubberDuck";

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

type duckProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
};

type travelingDuckProps = {
  id: number;
  y: number;
  size: number;
  opacity: number;
};

export const StarBackground = () => {
  const [star, setStar] = useState<starProps[]>([]);
  const [meteor, setMeteor] = useState<meteorProps[]>([]);
  const [ducks, setDucks] = useState<duckProps[]>([]);
  const [travelingDucks, setTravelingDucks] = useState<travelingDuckProps[]>(
    []
  );
  const { isDarkMode } = useTheme();

  const generateStars = () => {
    const numberOfStars = Math.floor(
      ((window.innerWidth / 100) * window.innerHeight) / 100
    );
    const newStars: starProps[] = [];
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
    const newMeteors: meteorProps[] = [];
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

  const generateDucks = () => {
    // Calculate how many ducks fit with 10px padding
    const duckSize = 100; // Base size of duck
    const padding = 20;
    const totalDuckSize = duckSize + padding * 2;
    const ducksPerRow = Math.floor(window.innerWidth / totalDuckSize);
    const ducksPerColumn = Math.floor(window.innerHeight / totalDuckSize);
    const totalDucks = ducksPerRow * ducksPerColumn;
    const newDucks: duckProps[] = [];

    for (let i = 0; i < totalDucks; i++) {
      const row = Math.floor(i / ducksPerRow);
      const col = i % ducksPerRow;

      // Calculate position with padding
      const x =
        ((col * totalDuckSize + padding + duckSize / 2) / window.innerWidth) *
        100;
      const y =
        ((row * totalDuckSize + padding + duckSize / 2) / window.innerHeight) *
        100;

      newDucks.push({
        id: i,
        x: x,
        y: y,
        size: Math.random() * 20 + 80,
        opacity: 0.2,
        delay: Math.random() * 1000,
      });
    }

    setDucks(newDucks);
  };

  const createTravelingDuck = useCallback((id: number): travelingDuckProps => {
    return {
      id,
      y: Math.random() * 80 + 10,
      size: Math.random() * 20 + 80,
      opacity: 0.7,
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTravelingDucks([]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      generateStars();
      generateMeteors();
    } else {
      generateDucks();
    }
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
    const newDuck = createTravelingDuck(Date.now());
    setTravelingDucks((prev) => [...prev, newDuck]);

    setTimeout(() => {
      setTravelingDucks((prev) => prev.filter((duck) => duck.id !== newDuck.id));
    }, 60000);
  }, 5000);

    return () => clearInterval(interval);
  }, [createTravelingDuck]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isDarkMode) {
        generateStars();
      } else {
        generateDucks();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {isDarkMode &&
        star.map((star) => (
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
      {isDarkMode &&
        meteor.map((meteor) => (
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
      {travelingDucks.map((duck) => {
        return (
          <div
            key={duck.id}
            className="absolute animate-duck-spin"
            style={{
              left: "-100px",
              top: `${duck.y}%`,
              opacity: duck.opacity,
              visibility: isDarkMode ? "visible" : "hidden",
            }}
          >
            <SleepyDuck size={duck.size} />
          </div>
        );
      })}
      {!isDarkMode &&
        ducks.map((duck) => (
          <div
            key={duck.id}
            className={`absolute animate-duck-wiggle`}
            style={{
              left: `${duck.x}%`,
              top: `${duck.y}%`,
              opacity: duck.opacity,
              animationDelay: `${duck.delay}ms`,
            }}
          >
            <RubberDuck size={duck.size} />
          </div>
        ))}
    </div>
  );
};
