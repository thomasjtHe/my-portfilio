import { Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }

  return (
    <div>
        <button onClick={toggleTheme}>{isDarkMode ? <Sun className='h-6 w-6 text-yellow-300 ' /> : <Moon className='h-6 w-6 text-blue-300'/>}</button>
    </div>
  )
}
