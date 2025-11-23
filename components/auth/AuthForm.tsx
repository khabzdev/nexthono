'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import {
  type SignInData,
  type SignUpData,
  signInSchema,
  signUpSchema,
} from '@/lib/validation/auth'
import { Form } from '../ui/form'
import { AuthContext, type AuthMode } from './authContext'
import {
  ConfirmPasswordField,
  EmailField,
  PasswordField,
  SubmitButton,
  SwitchMode,
  Title,
} from './authFields'

interface AuthFormProps {
  mode: AuthMode
  onSubmit: (data: SignInData | SignUpData) => void
  children: ReactNode
  loading: boolean
}

function AuthForm({ mode, onSubmit, children, loading }: AuthFormProps) {
  const schema = mode === 'signin' ? signInSchema : signUpSchema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'signup' ? { confirmPassword: '' } : {}),
    },
  })
  return (
    <AuthContext.Provider value={{ mode, form, loading }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </AuthContext.Provider>
  )
}

AuthForm.Title = Title
AuthForm.EmailField = EmailField
AuthForm.PasswordField = PasswordField
AuthForm.ConfirmPasswordField = ConfirmPasswordField
AuthForm.SubmitButton = SubmitButton
AuthForm.SwitchMode = SwitchMode

export default AuthForm
