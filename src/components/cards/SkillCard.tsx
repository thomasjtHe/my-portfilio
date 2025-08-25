import { useEffect, useRef, useState } from 'react';

export type MajorSkillProps = {
  id: number;
  name: string;
  minorSkills: MinorSkillProps[];
  imageSrc: string;
  description: string;
};

export type MinorSkillProps = {
  id: number;
  name: string;
  imageSrc: string;
};

type SkillCardProps = {
  skill: MajorSkillProps;
  isCenter: boolean;
  isAdjacent: boolean;
  isVisible: boolean;
  isMobile: boolean;
  onClick?: () => void;
};

export const SkillCard = ({ skill, isCenter, isAdjacent, isVisible, isMobile, onClick }: SkillCardProps) => {
  const [hoveredMinor, setHoveredMinor] = useState<string | null>(null);
  const [outgoingMinor, setOutgoingMinor] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const prevNameRef = useRef<string | null>(null);

  // Track previous name 
  useEffect(() => {
    const prev = prevNameRef.current;
    if (prev && prev !== hoveredMinor) {
      setOutgoingMinor(prev);
    }
    prevNameRef.current = hoveredMinor;
  }, [hoveredMinor]);

  if (!isVisible) {
    return <div className="w-80 flex-shrink-0" />;
  }

  // Make the center card occupy a wider slot
  const slotWidth = isCenter ? 'w-[23rem]' : 'w-80';
  const bannerVisible = Boolean(hoveredMinor || outgoingMinor);

  return (
    <div
      className={`
        ${isMobile ? 'w-full' : slotWidth} flex-shrink-0 flex justify-center px-4
        transition-[width] duration-500 ease-out
      `}
      onClick={onClick}
    >
      {/* Scale only the center card's content */}
      <div
        className={`
          origin-center transform-gpu transition-transform duration-500 ease-out
          ${isCenter ? 'scale-[1.12] opacity-100 z-10' : isAdjacent ? 'scale-95 opacity-80' : 'scale-90 opacity-60'}
          ${isMobile ? 'scale-100' : ''}
        `}
      >
        <div
          className={`
            group card-hover relative bg-background/50 backdrop-blur-sm rounded-xl border border-border
            ${isCenter ? 'shadow-2xl border-primary/20 bg-card/50' : 'shadow-lg border-border/50'}
            ${isCenter ? 'w-80 md:w-[22rem]' : 'w-64'}
            ${isMobile ? 'w-full max-w-sm' : ''}
            p-6 transition-colors duration-300 ease-out
            ${isCenter && !isMobile ? 'hover:scale-[1.02]' : ''}
            ${isMobile ? 'cursor-pointer' : ''}
          `}
          role="button"
          onClick={isMobile ? () => setIsExpanded(!isExpanded) : undefined}
        >
          {/* Skill Image */}
          <div className="flex justify-center mb-4">
            <div
              className={`
                ${isCenter ? 'w-20 h-20' : 'w-16 h-16'}
                rounded-lg flex items-center justify-center
                transition-all duration-500 ease-out
                ${isCenter ? 'bg-primary/20 shadow-lg' : 'bg-primary/10'}
              `}
            >
              <img
                src={skill.imageSrc}
                alt={skill.name}
                className={`
                  ${isCenter ? 'w-12 h-12' : 'w-10 h-10'}
                  object-contain transition-all duration-500 ease-out
                  ${isCenter ? 'filter-none' : 'grayscale-[0.5]'}
                `}
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMxNC40NzcyIDI4IDEwIDIzLjUyMjggMTAgMThDMTAgMTIuNDc3MiAxNC40NzcyIDggMjAgOEMyNS41MjI4IDggMzAgMTIuNDc3MiAzMCAxOEMzMCAyMy41MjI4IDI1LjUyMjggMjggMjAgMjhaIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          {/* Skill Name */}
          <h3
            className={`
              text-center font-bold mb-2 transition-colors duration-500 ease-out
              ${isCenter ? 'text-xl text-primary' : 'text-lg text-foreground/80'}
            `}
          >
            {skill.name}
          </h3>

          {/* Description */}
          <p className="text-center text-foreground/70 text-sm mb-2">
            {skill.description}
          </p>

          {/* Mobile tap indicator */}
          {isMobile && (
            <p className="text-center text-primary/60 text-xs mb-2">
              Tap to {isExpanded ? 'hide' : 'view'} skills
            </p>
          )}

          {/* Minor Skills - center card expands on hover (desktop) or click (mobile) */}
          <div
            className={`
              overflow-hidden transition-[max-height] duration-500 ease-in-out
              ${isCenter && !isMobile ? 'max-h-0 group-hover:max-h-[28rem]' : 'max-h-0'}
              ${isMobile && isExpanded ? 'max-h-[28rem]' : ''}
            `}
          >
            <div
              className="pt-3 border-t border-border/40"
              onMouseLeave={() => setHoveredMinor(null)}
            >
              <div
                className={`
                  grid grid-cols-3 gap-2
                  ${isCenter && !isMobile ? 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0' : 'opacity-0'}
                  ${isMobile && isExpanded ? 'opacity-100 translate-y-0' : ''}
                  transition-all duration-500 ease-out transform-gpu justify-center items-center
                `}
              >
                {skill.minorSkills.map((minorSkill, skillIndex) => (
                  <button
                    key={minorSkill.id}
                    type="button"
                    className={`
                      flex items-center justify-center p-2 rounded-md bg-background/30
                      transition-colors duration-200 ${(isCenter && !isMobile) || (isMobile && isExpanded) ? 'hover:bg-background/50' : ''}
                      focus:outline-none focus:ring-2 focus:ring-primary/40
                      will-change-transform
                    `}
                    style={{ transitionDelay: `${Math.min(skillIndex * 40, 400)}ms` }}
                    aria-label={minorSkill.name}
                    onMouseEnter={isCenter && !isMobile ? () => setHoveredMinor(minorSkill.name) : undefined}
                    onFocus={isCenter && !isMobile ? () => setHoveredMinor(minorSkill.name) : undefined}
                    onClick={isMobile ? (e) => { e.stopPropagation(); setHoveredMinor(minorSkill.name); } : undefined}
                    disabled={!isCenter && !isMobile}
                  >
                    <img
                      src={minorSkill.imageSrc}
                      alt={minorSkill.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Bottom banner: only for center card; cross-fades names with blur-in on enter and fade-out on exit */}
              {isCenter && (
                <div
                  className={`
                    overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out
                    ${bannerVisible ? 'max-h-10 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
                  `}
                  aria-live="polite"
                >
                  <div
                    className={`
                      relative w-full rounded-md bg-primary/10 border border-primary/20
                      text-foreground text-lg h-7
                      flex items-center justify-center
                      pointer-events-none
                    `}
                  >
                    {/* Outgoing name fades out */}
                    {outgoingMinor && (
                      <span
                        key={`out-${outgoingMinor}`}
                        className="absolute inset-0 flex items-center justify-center animate-blur-out"
                        onAnimationEnd={() => setOutgoingMinor(null)}
                      >
                        {outgoingMinor}
                      </span>
                    )}

                    {/* Incoming name uses predefined animate-blur-in */}
                    {hoveredMinor && (
                      <span
                        key={`in-${hoveredMinor}`}
                        className="absolute inset-0 flex items-center justify-center animate-blur-in"
                      >
                        {hoveredMinor}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {/* End banner */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};