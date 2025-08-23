export const FallingRubberDuck = ({
  size = 24,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`falling-duck ${className}`}
    style={{
      position: "absolute",
      top: `-100px`, // Start above the viewport
      ...style, // Merge dynamic styles
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Duck body */}
      <ellipse
        cx="12"
        cy="16"
        rx="8"
        ry="6"
        fill="#FFD700"
        stroke="#FFB000"
        strokeWidth="1"
      />
      {/* Duck head */}
      <circle
        cx="9"
        cy="8"
        r="5"
        fill="#FFD700"
        stroke="#FFB000"
        strokeWidth="1"
      />
      {/* Duck beak */}
      <ellipse cx="5" cy="9" rx="2" ry="1" fill="#FF8C00" />
      {/* Duck eye */}
      <circle cx="7" cy="6" r="0.75" fill="#000" />
      {/* Wing detail */}
      <path d="M13 12 Q16 10 17 14 Q15 16 13 14" fill="#FFB000" />
    </svg>
  </div>
);

export const SleepyDuck = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
    display?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Duck body */}
    <ellipse
      cx="12"
      cy="16"
      rx="8"
      ry="6"
      fill="#FFD700"
      stroke="#FFB000"
      strokeWidth="1"
    />
    {/* Duck head */}
    <circle
      cx="9"
      cy="8"
      r="5"
      fill="#FFD700"
      stroke="#FFB000"
      strokeWidth="1"
    />
    {/* Duck beak */}
    <ellipse cx="5" cy="9" rx="2" ry="1" fill="#FF8C00" />
    {/* Sleepy eye (closed) */}
    <path
      d="M6 6 Q7 5.5 8 6"
      stroke="#000"
      strokeWidth="0.6"
      fill="none"
      strokeLinecap="round"
    />
    {/* Wing detail */}
    <path d="M13 12 Q16 10 17 14 Q15 16 13 14" fill="#FFB000" />
    
    {/* ZZZ sleep effects */}
    <text x="15" y="4" fontSize="3" fill="#333" fontFamily="serif">Z</text>
    <text x="17" y="2.5" fontSize="2.5" fill="#555" fontFamily="serif">Z</text>
    <text x="19" y="1.5" fontSize="2" fill="#777" fontFamily="serif">Z</text>
  </svg>
);