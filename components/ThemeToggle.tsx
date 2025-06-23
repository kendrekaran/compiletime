"use client"

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 bg-app-surface hover:bg-app-divider border border-app-divider"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5  transition-all duration-300 ${
            theme === 'dark' ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 text-white transition-all duration-300 ${
            theme === 'light' ? 'opacity-0 scale-0 -rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`}
        />
      </div>
    </button>
  )
} 