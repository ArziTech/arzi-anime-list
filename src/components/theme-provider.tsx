'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored || (prefersDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}
