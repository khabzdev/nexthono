import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { SignInData, SignUpData } from '@/lib/validation/auth'

export type AuthMode = 'signin' | 'signup'

export interface AuthContextValue {
  mode: AuthMode
  form: UseFormReturn<SignInData | SignUpData>
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
