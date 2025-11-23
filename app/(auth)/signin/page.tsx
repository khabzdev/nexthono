'use client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import AuthForm from '@/components/auth/AuthForm'
import { signIn } from '@/lib/auth-client'
import type { SignInData } from '@/lib/validation/auth'

export default function Page() {
  const [loading, setLoading] = React.useState(false)
  const handleSignIn = async (data: SignInData) => {
    setLoading(true)
    await signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (error) => {
          toast.error(error.error.message || 'Failed to sign in')
        },
        onSuccess: () => {
          redirect('/dashboard')
        },
      },
    })
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <AuthForm mode="signin" onSubmit={handleSignIn} loading={loading}>
          <div className="space-y-6">
            <AuthForm.Title />
            <AuthForm.EmailField />
            <AuthForm.PasswordField />
            <AuthForm.SubmitButton />
            <AuthForm.SwitchMode>
              <span className="text-muted-foreground">
                Don't have an account?{' '}
              </span>
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </AuthForm.SwitchMode>
          </div>
        </AuthForm>
      </div>
    </div>
  )
}
