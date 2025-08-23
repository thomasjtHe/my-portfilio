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
  rotation: number;
  flip: boolean;
};

type FallingDuckProps = {
  id: number;
  x: number;
  size: number;
  opacity: number;
  delay: number;
  rotation: number;
  flip: boolean;
};

export const StarBackground = () => {
  const { isDarkMode } = useTheme();
  const [itemsVisible, setItemsVisible] = useState(false);
  const [cloudsVisible, setCloudsVisible] = useState(false);
  const [stars, setStars] = useState<StarProps[]>([]);
  const [meteors, setMeteors] = useState<MeteorProps[]>([]);
  const [travelingDucks, setTravelingDucks] = useState<TravelingDuckProps[]>(
    []
  );
  const [fallingDucks, setFallingDucks] = useState<FallingDuckProps[]>([]);
  const idCounter = useRef(0);
  const nextId = () => ++idCounter.current;

  // Delay to wait for the theme switch animation to finish (ms).
  const THEME_ANIMATION_DELAY = 600;
  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);

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
      const duration = Math.random() * 3 + 3; 
      const progressOffset = Math.random() * duration; 
      newMeteors.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: Math.random() * 3 + 1,
        delay: -progressOffset, 
        duration,
      });
    }
    setMeteors(newMeteors);
  }, []);

  const createTravelingDuck = useCallback((): TravelingDuckProps => {
    const rotationDirection = Math.random() > 0.5 ? 1 : -1; 
    const rotationDegrees = Math.random() * (450 - 300) + 300; 
    const flip = Math.random() > 0.5; 
    return {
      id: nextId(),
      y: Math.random() * 60 + 5,
      size: Math.random() * 20 + 80,
      opacity: 0.7,
      rotation: rotationDirection * rotationDegrees,
      flip,
    };
  }, []);

  const generateFallingDucks = useCallback(() => {
    const ducks: FallingDuckProps[] = [];
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationDegrees = Math.random() * (450 - 300) + 300;
    const flip = Math.random() > 0.5;
    for (let i = 0; i < 5; i++) {
      ducks.push({
        id: nextId(),
        x: Math.random() * 90 + 5, // 5% to 95% to avoid edges
        size: Math.random() * 20 + 80, // 30-50px size
        opacity: 0.7,
        delay: i * 2000, // 0ms, 2000ms, 4000ms, 6000ms, 8000ms
        rotation: rotationDirection * rotationDegrees,
        flip,
      });
    }
    setFallingDucks(ducks);
  }, []);


  // Initialize stars + meteors on dark mode change 
  useEffect(() => {
    // clear any pending timers for safety
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setItemsVisible(false);
    if (isDarkMode) {
      const t = window.setTimeout(() => {
        generateStars();
        generateMeteors();
        // show items with fade after a tiny extra delay
        const vis = window.setTimeout(() => setItemsVisible(true), 50);
        timersRef.current.push(vis);
      }, THEME_ANIMATION_DELAY);
      timersRef.current.push(t);
    } else {
      setStars([]);
      setMeteors([]);
      setItemsVisible(false);
    }
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [isDarkMode, generateStars, generateMeteors]);

  // Initialize falling ducks on light mode (delayed)
  useEffect(() => {
    // only schedule falling ducks when leaving dark mode.
    setItemsVisible(false);
    setCloudsVisible(false);
    if (!isDarkMode) {
      const t = window.setTimeout(() => {
        generateFallingDucks();
        const vis = window.setTimeout(() => setItemsVisible(true), 50);
        timersRef.current.push(vis);
        // show clouds a bit after ducks/items become visible
        const cloudTimer = window.setTimeout(() => setCloudsVisible(true), 220);
        timersRef.current.push(cloudTimer);
      }, THEME_ANIMATION_DELAY);
      timersRef.current.push(t);
      return () => {
        clearTimeout(t);
        timersRef.current = timersRef.current.filter((id) => id !== t);
        // ensure clouds hidden on cleanup
        setCloudsVisible(false);
      };
    } else {
      setFallingDucks([]);
      setItemsVisible(false);
      setCloudsVisible(false);
      return;
    }
  }, [isDarkMode, generateFallingDucks]);

  // Visibility reset
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTravelingDucks([]);
        setFallingDucks([]);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Window resize 
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
    // store timeout and interval IDs in refs for cleanup
    const startTimer = window.setTimeout(() => {
      const intervalId = window.setInterval(() => {
        if (!isDarkMode) return; 
        const duck = createTravelingDuck();
        setTravelingDucks((prev) => [...prev, duck]);
        const removeTimer = window.setTimeout(
          () => setTravelingDucks((prev) => prev.filter((d) => d.id !== duck.id)),
          60000
        );
        timersRef.current.push(removeTimer);
      }, 5000);
      intervalsRef.current.push(intervalId);
    }, THEME_ANIMATION_DELAY);
    timersRef.current.push(startTimer);

    return () => {
      intervalsRef.current.forEach((id) => clearInterval(id));
      timersRef.current.forEach((t) => clearTimeout(t));
      intervalsRef.current = [];
      timersRef.current = [];
    };
  }, [createTravelingDuck, isDarkMode]);

  // Falling ducks cycle (only in light mode)
  useEffect(() => {
    // start cycle after a small delay so ducks don't appear during theme animation
    if (isDarkMode) return;
    const startId = window.setTimeout(() => {
      generateFallingDucks();
      const intervalId = window.setInterval(() => {
        generateFallingDucks();
      }, 15000);
      intervalsRef.current.push(intervalId);
    }, THEME_ANIMATION_DELAY);
    timersRef.current.push(startId);
    return () => {
      // clear only what this effect created
      intervalsRef.current.forEach((id) => clearInterval(id));
      clearTimeout(startId);
    };
  }, [isDarkMode, generateFallingDucks]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach((id) => clearInterval(id));
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

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
              opacity: itemsVisible ? s.opacity : 0,
              transform: itemsVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 420ms ease, transform 420ms ease",
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
              width: `${m.size * 50}px`,
              height: `${Math.max(2, m.size * 0.5)}px`,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              opacity: itemsVisible ? 1 : 0,
              transform: itemsVisible ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 780ms ease, transform 780ms ease",
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
            opacity: itemsVisible && isDarkMode ? duck.opacity : 0,
            visibility: isDarkMode ? "visible" : "hidden",
            transform: itemsVisible ? "translateX(0) scaleY(1)" : "translateX(-12px) scaleY(0.98)",
            transition: "opacity 1020ms ease, transform 1020ms ease",
            "--rotation-degrees": `${duck.rotation}deg`,
            "--flip-scale": duck.flip ? -1 : 1,
          } as React.CSSProperties & Record<string, any>}
        >
          <SleepyDuck size={duck.size} />
        </div>
      ))}

      {fallingDucks.map((duck) => (
        <div
          key={duck.id}
          className="absolute animate-duck-fall"
          style={{
            left: `${duck.x}%`,
            top: "-100px",
            opacity: itemsVisible && !isDarkMode ? duck.opacity : 0,
            visibility: !isDarkMode ? "visible" : "hidden",
            transform: itemsVisible ? "translateY(0) scaleY(1)" : "translateY(-6px) scaleY(0.99)",
            transition: "opacity 1020ms ease, transform 1020ms ease",
            animationDelay: `${duck.delay}ms`,
            "--rotation-degrees": `${duck.rotation}deg`,
            "--flip-scale": duck.flip ? -1 : 1,
          } as React.CSSProperties & Record<string, any>}
        >
          <FallingRubberDuck size={duck.size} />
        </div>
      ))}

      {!isDarkMode && (
        <div
          className="clouds"
          style={{
            pointerEvents: "none",
            opacity: cloudsVisible ? 1 : 0,
            transform: cloudsVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 600ms ease, transform 600ms ease",
          }}
        >
          <div
            className="clouds-1"
            style={{
              opacity: cloudsVisible ? 0.5 : 0,
              transform: cloudsVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 700ms ease, transform 700ms ease",
              transitionDelay: "100ms",
            }}
          />
          <div
            className="clouds-2"
            style={{
              opacity: cloudsVisible ? 0.5 : 0,
              transform: cloudsVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 750ms ease, transform 750ms ease",
              transitionDelay: "220ms",
            }}
          />
          <div
            className="clouds-3"
            style={{
              opacity: cloudsVisible ? 0.5 : 0,
              transform: cloudsVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 800ms ease, transform 800ms ease",
              transitionDelay: "320ms",
            }}
          />
        </div>
      )}
    </div>
  );
};