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
  onClick?: () => void;
};

// SkillCard Component
export const SkillCard = ({ skill, isCenter, isAdjacent, isVisible, onClick }: SkillCardProps) => {
  if (!isVisible) {
    return <div className="w-80 flex-shrink-0" />;
  }

  return (
    <div className="w-80 flex-shrink-0 flex justify-center" onClick={onClick}>
      <div
        className={`
          transition-all duration-500 ease-out transform origin-center
          ${isCenter 
            ? 'scale-110 opacity-100' 
            : isAdjacent 
            ? 'scale-90 opacity-70' 
            : 'scale-75 opacity-40'
          }
        `}
      >
        <div className={`
          bg-background/50 backdrop-blur-sm rounded-xl border border-border p-6 
          ${isCenter ? 'shadow-2xl border-primary/20 bg-background/70' : 'shadow-lg border-border/50'}
          ${isCenter ? 'w-72' : 'w-64'}
          transition-all duration-500 ease-out
          ${isCenter ? 'hover:scale-105' : 'hover:scale-95'}
        `}>
          {/* Skill Image */}
          <div className="flex justify-center mb-4">
            <div className={`
              ${isCenter ? 'w-20 h-20' : 'w-16 h-16'}
              bg-primary/10 rounded-lg flex items-center justify-center
              transition-all duration-500 ease-out
              ${isCenter ? 'bg-primary/20 shadow-lg' : 'bg-primary/5'}
            `}>
              <img 
                src={skill.imageSrc} 
                alt={skill.name}
                className={`
                  ${isCenter ? 'w-12 h-12' : 'w-10 h-10'} 
                  object-contain transition-all duration-500 ease-out
                  ${isCenter ? 'filter-none' : 'grayscale-[0.5]'}
                `}
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMxNC40NzcyIDI4IDEwIDIzLjUyMjggMTAgMThDMTAgMTIuNDc3MiAxNC40NzcyIDggMjAgOEMyNS41MjI4IDggMzAgMTIuNDc3MiAzMCAxOEMzMCAyMy41MjI4IDI1LjUyMjggMjggMjAgMjhaIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          {/* Skill Name */}
          <h3 className={`
            text-center font-bold mb-2 transition-all duration-500 ease-out
            ${isCenter ? 'text-xl text-primary' : 'text-lg text-foreground/80'}
          `}>
            {skill.name}
          </h3>

          {/* Description (only show for center item) */}
          <div className="overflow-hidden">
            <p className={`
              text-center text-foreground/70 text-sm mb-4 
              transition-all duration-300 ease-in-out
              ${isCenter ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}
            `}>
              {skill.description}
            </p>
          </div>

          {/* Minor Skills */}
          <div className={`
            grid gap-2
            ${isCenter ? 'grid-cols-2' : 'grid-cols-1'}
          `}>
            {skill.minorSkills.slice(0, isCenter ? 4 : 2).map((minorSkill, skillIndex) => (
              <div 
                key={minorSkill.id}
                className={`
                  flex items-center gap-2 p-2 rounded-lg bg-background/30 
                  transition-all duration-300 hover:bg-background/50
                  ${isCenter 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-80 transform translate-y-1'
                  }
                `}
                style={{
                  transitionDelay: isCenter ? `${skillIndex * 50}ms` : '0ms'
                }}
              >
                <img 
                  src={minorSkill.imageSrc} 
                  alt={minorSkill.name}
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-foreground/80 text-xs">
                  {minorSkill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};