'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      forcedTheme="dark"
    >
      <Toaster position="bottom-right" />
      {children}
    </NextThemesProvider>
  )
}
