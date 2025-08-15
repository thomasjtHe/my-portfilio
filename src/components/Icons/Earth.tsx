import { motion } from "framer-motion";

export default function Earth({
  width = "100%",
  height = "auto"
}) {
  return (
    <motion.div
      initial={{ y: 100 }} 
      animate={{ y: 0 }} 
      exit={{ y: 400 }} 
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none"
    >
      <svg
        viewBox="0 -20 800 400"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <radialGradient id="planetGradient" cx="0.5" cy="1.1" r="1.2">
            <stop offset="0%" stopColor="#4a90e2" />
            <stop offset="30%" stopColor="#357abd" />
            <stop offset="60%" stopColor="#2c5f8f" />
            <stop offset="100%" stopColor="#1a3d5c" />
          </radialGradient>

          {/* Thinner atmosphere gradient with shorter radius */}
          <radialGradient id="atmosphereGradient" cx="0.5" cy="1" r="0.8">
            <stop offset="0%" stopColor="rgba(135, 206, 235, 0)" />
            <stop offset="80%" stopColor="rgba(135, 206, 235, 0.2)" />
            <stop offset="95%" stopColor="rgba(100, 149, 237, 0.4)" />
            <stop offset="100%" stopColor="rgba(70, 130, 180, 0.5)" />
          </radialGradient>

          <radialGradient id="landGradient" cx="0.5" cy="1" r="1.2">
            <stop offset="0%" stopColor="#8FBC8F" />
            <stop offset="50%" stopColor="#556B2F" />
            <stop offset="100%" stopColor="#2F4F2F" />
          </radialGradient>
          <radialGradient id="cloudGradient" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </radialGradient>
        </defs>

        {/* Main planet curve */}
        <path d="M -100 420 Q 400 220 900 420 Z" fill="url(#planetGradient)" />

        {/* Main continent */}
        <path
          d="M 50 420 Q 250 320 550 400 Q 700 340 850 420 Z"
          fill="url(#landGradient)"
          opacity="0.7"
        />

        {/* Secondary continent */}
        <path
          d="M 200 420 Q 400 360 650 400 Q 750 380 820 420 Z"
          fill="url(#landGradient)"
          opacity="0.5"
        />

        {/* Additional islands */}
        <path
          d="M 300 410 Q 310 400 320 410 Z"
          fill="url(#landGradient)"
          opacity="0.8"
        />
        <path
          d="M 370 405 Q 375 395 385 405 Z"
          fill="url(#landGradient)"
          opacity="0.8"
        />
        <path
          d="M 450 395 Q 460 385 470 395 Z"
          fill="url(#landGradient)"
          opacity="0.75"
        />
        <path
          d="M 520 400 Q 530 390 540 400 Z"
          fill="url(#landGradient)"
          opacity="0.7"
        />
        <path
          d="M 600 410 Q 610 400 620 410 Z"
          fill="url(#landGradient)"
          opacity="0.7"
        />

        {/* Clouds */}
        <path
          d="M 200 360 
     q 20 -15 40 0 
     q 15 -10 30 0 
     q 15 -8 25 5 
     q 12 -6 22 4 
     q 20 10 0 20 
     q -15 10 -35 5 
     q -15 8 -35 -2 
     q -20 5 -35 -5 
     q -18 -6 -12 -27
     z"
          fill="url(#cloudGradient)"
          opacity="0.6"
        />

        <path
          d="M 420 340
     q 18 -12 38 0
     q 12 -8 25 0
     q 14 -6 22 6
     q 10 -5 18 3
     q 16 8 0 18
     q -12 8 -28 4
     q -12 6 -28 -2
     q -16 4 -28 -4
     q -15 -5 -20 -21
     z"
          fill="url(#cloudGradient)"
          opacity="0.5"
        />

        <path
          d="M 600 355
     q 14 -10 30 0
     q 10 -7 20 0
     q 12 -5 18 5
     q 8 -4 14 3
     q 14 6 0 14
     q -10 6 -24 3
     q -10 5 -24 -1
     q -14 3 -24 -3
     q -12 -4 -8 -16
     z"
          fill="url(#cloudGradient)"
          opacity="0.4"
        />

        {/* Thinner atmospheric glow with shorter radius */}
        <path
          d="M -80 420 Q 400 200 880 420 Z"
          fill="url(#atmosphereGradient)"
          opacity="0.25"
        />

        {/* Rim lighting */}
        <path
          d="M -100 420 Q 400 220 900 420"
          stroke="rgba(173, 216, 230, 0.6)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
