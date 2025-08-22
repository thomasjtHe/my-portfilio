import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "../lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const scrollTicking = useRef(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Update scrolled background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Midpoint-based active section detection
  useEffect(() => {
    const sectionIds = navItems.map(i => i.href.slice(1));
    const sections: HTMLElement[] = sectionIds
      .map(id => document.getElementById(id) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const recalc = () => {
      scrollTicking.current = false;
      const viewportMid = window.scrollY + window.innerHeight / 2;

      // Handle near-bottom edge case: if scrolled to bottom, force last section active
      if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const sec of sections) {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (viewportMid >= top && viewportMid < top + height) {
          current = sec.id;
          break;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!scrollTicking.current) {
        scrollTicking.current = true;
        requestAnimationFrame(recalc);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recalc);
    recalc();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recalc);
    };
  }, [navItems]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    // Let scroll behavior set the active, but we optimistically set it
    setActiveSection(href.slice(1));
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 w-full bg-background transition-all duration-300 z-40",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Theme Toggle */}
        <div className="text-sm font-medium text-foreground/80">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1 rounded-md hover:bg-foreground/5 transition-colors"
          >
            {!isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-300 hover:text-foreground transition-colors duration-300" />
            ) : (
              <Moon className="h-6 w-6 text-primary hover:text-foreground transition-colors duration-300" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-end space-x-2">
          {navItems.map(item => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "mx-4 text-lg font-medium relative transition-colors duration-300",
                  isActive
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                <span
                  className={cn(
                  "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 rounded bg-primary transition-all duration-300",
                  isActive ? "w-6" : undefined
                  )}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(p => !p)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map(item => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "mx-4 text-lg font-medium text-center transition-colors duration-300",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};