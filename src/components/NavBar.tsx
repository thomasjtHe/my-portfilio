import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme, ThemeProvider } from "../hooks/useTheme";


export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full bg-background duration-300 z-40 transition-all",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between pr-0">
        <a
          className="text-2xl font-bold text-primary flex items-center"
          href="#home"
        >
          <span>
            {""}
            <span className="text-glow text-foreground">My</span> Portfolio
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="mx-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <div className="mx-4 text-sm font-medium text-foreground/80 pl-10">
            <ThemeProvider>
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {!isDarkMode ? (
                  <Sun className="h-6 w-6 text-yellow-300 cursor-pointer hover:text-foreground transition-colors duration-300" />
                ) : (
                  <Moon className="h-6 w-6 text-primary cursor-pointer hover:text-foreground transition-colors duration-300" />
                )}
              </button>
            </ThemeProvider>
          </div>
        </div>
        {/* Mobile */}
        <button onClick={() => setIsOpen((prev) => !prev )} className="md:hidden p-2 text-foreground z-50"
            aria-label={isOpen ? "Close Menu" : "Open Menu" }>{isOpen ? <X size={24} /> : <Menu size={24} /> }</button>
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center duration-300 md:hidden",
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="mx-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
