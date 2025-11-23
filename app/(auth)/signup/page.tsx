'use client'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import AuthForm from '@/components/auth/AuthForm'
import { signUp } from '@/lib/auth-client'
import type { SignInData } from '@/lib/validation/auth'

export default function Page() {
  const [loading, setLoading] = React.useState(false)
  const handleSignUp = async (data: SignInData) => {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.email.split('@')[0],
      fetchOptions: {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (error) => {
          toast.error(error.error.message || 'Failed to sign up')
        },
        onSuccess: () => {
          toast.success(
            'Account created successfully. Please check your email to verify your account.',
          )
        },
      },
    })
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <AuthForm mode="signup" onSubmit={handleSignUp} loading={loading}>
          <div className="space-y-6">
            <AuthForm.Title />
            <AuthForm.EmailField />
            <AuthForm.PasswordField />
            <AuthForm.ConfirmPasswordField />
            <AuthForm.SubmitButton />
            <AuthForm.SwitchMode>
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </AuthForm.SwitchMode>
          </div>
        </AuthForm>
      </div>
    </div>
  )
}
