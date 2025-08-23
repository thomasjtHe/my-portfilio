import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { FallingRubberDuck, SleepyDuck } from "./Icons/RubberDuck";

type StarProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
};

type MeteorProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;    
  duration: number;  
};

type TravelingDuckProps = {
  id: number;
  y: number;
  size: number;
  opacity: number;
};

export const StarBackground = () => {
  const { isDarkMode } = useTheme();
  const [stars, setStars] = useState<StarProps[]>([]);
  const [meteors, setMeteors] = useState<MeteorProps[]>([]);
  const [travelingDucks, setTravelingDucks] = useState<TravelingDuckProps[]>([]);

  const idCounter = useRef(0);
  const nextId = () => ++idCounter.current;

  /* -------------------- Generators -------------------- */

  const generateStars = useCallback(() => {
    if (typeof window === "undefined") return;
    const numberOfStars = Math.floor(
      ((window.innerWidth / 100) * window.innerHeight) / 100
    );
    const newStars: StarProps[] = [];
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
    setStars(newStars);
  }, []);

  const generateMeteors = useCallback(() => {
    const count = 6;
    const newMeteors: MeteorProps[] = [];
    for (let i = 0; i < count; i++) {
      const duration = Math.random() * 3 + 3;          // 3 - 6 s
      const progressOffset = Math.random() * duration; // seconds into the flight
      newMeteors.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: Math.random() * 3 + 1,
        delay: -progressOffset,  // negative so it starts mid-flight
        duration,
      });
    }
    setMeteors(newMeteors);
  }, []);

  const createTravelingDuck = useCallback(
    (): TravelingDuckProps => ({
      id: nextId(),
      y: Math.random() * 60 + 5,
      size: Math.random() * 20 + 80,
      opacity: 0.7,
    }),
    []
  );

  /* -------------------- Effects -------------------- */

  // Visibility reset
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

  // Initialize stars + meteors on dark mode change
  useEffect(() => {
    if (isDarkMode) {
      generateStars();
      generateMeteors();
    }
  }, [isDarkMode, generateStars, generateMeteors]);

  // Window resize (throttled)
  useEffect(() => {
    if (!isDarkMode) return;
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(generateStars);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [isDarkMode, generateStars]);

  // Traveling ducks every 5s (always, but only visible in dark mode)
  useEffect(() => {
    const interval = setInterval(() => {
      const duck = createTravelingDuck();
      setTravelingDucks((prev) => [...prev, duck]);
      setTimeout(
        () =>
          setTravelingDucks((prev) => prev.filter((d) => d.id !== duck.id)),
        60000
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [createTravelingDuck]);

  /* -------------------- Render -------------------- */

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {isDarkMode &&
        stars.map((s) => (
          <div
            key={s.id}
            className="absolute animate-pulse-subtle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: "white",
              opacity: s.opacity,
              borderRadius: "50%",
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

      {isDarkMode &&
        meteors.map((m) => (
          <div
            key={m.id}
            className="absolute animate-meteor"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: `${m.size * 45}px`,
              height: `${Math.max(2, m.size * 0.5)}px`,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
              borderRadius: "999px",
              boxShadow: "0 0 6px 2px rgba(255,255,255,0.5)",
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`, // negative => starts mid-flight
              animationTimingFunction: "linear",
            }}
          />
        ))}

      {travelingDucks.map((duck) => (
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
      ))}

      {!isDarkMode && (
        <div className="clouds">
          <div className="clouds-1"></div>
            <div className="clouds-2"></div>
            <div className="clouds-3"></div>
        </div>
      )}
    </div>
  );
};