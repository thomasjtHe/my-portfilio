import { StarBackground } from "../components/StarBackground"
import { ThemeToggle } from "../components/ThemeToggle"

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* BG Effect */}
        <StarBackground />
        {/* Nav Bar */}

        {/* Content */}

        {/* Footer */}
    </div>
  )
}
