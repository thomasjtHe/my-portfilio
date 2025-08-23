import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
  useRef,
} from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
}

const THEME_STORAGE_KEY = 'theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_DURATION_MS = 650;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const timeoutRef = useRef<number | null>(null);

  const applyHtmlClass = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const startSmoothTransition = () => {
    const root = document.documentElement;

    // Clear any existing timer first
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Add the transition class (enables CSS transitions)
    root.classList.add(TRANSITION_CLASS);

    // Remove after duration to avoid affecting unrelated style changes
    timeoutRef.current = window.setTimeout(() => {
      root.classList.remove(TRANSITION_CLASS);
      timeoutRef.current = null;
    }, TRANSITION_DURATION_MS);
  };

  const setTheme = useCallback((mode: 'light' | 'dark') => {
    startSmoothTransition();
    const dark = mode === 'dark';
    setIsDarkMode(dark);
    applyHtmlClass(dark);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(isDarkMode ? 'light' : 'dark');
  }, [isDarkMode, setTheme]);

  useEffect(() => {
    // On mount, read stored preference (NO transition on initial load)
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const effective = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : (prefersDark ? 'dark' : 'light');
    const dark = effective === 'dark';
    setIsDarkMode(dark);
    applyHtmlClass(dark);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};