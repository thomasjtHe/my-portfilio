import { Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
        <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300")} >{!isDarkMode ? <Sun className='h-6 w-6 text-yellow-300 cursor-pointer' /> :
         <Moon className='h-6 w-6 text-blue-300 cursor-pointer'/>}</button>
    </div>
  )
}
