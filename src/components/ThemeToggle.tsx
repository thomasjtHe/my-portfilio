import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = ():void => {
        if (isDarkMode) {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        console.log('Current theme:', currentTheme);
        if (currentTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

  return (
    <div>
        <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300")} >{isDarkMode ? <Sun className='h-6 w-6 text-yellow-300 cursor-pointer' /> :
         <Moon className='h-6 w-6 text-blue-300 cursor-pointer'/>}</button>
    </div>
  )
}
