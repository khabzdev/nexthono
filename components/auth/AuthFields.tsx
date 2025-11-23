import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { useAuthContext } from './AuthContext'

export const Title = () => {
  const { mode } = useAuthContext()
  return (
    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
      {mode === 'signin' ? 'Sign In to Your Account' : 'Create a New Account'}
    </h1>
  )
}

export const EmailField = () => {
  const { form, loading } = useAuthContext()

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const PasswordField = () => {
  const { form, loading } = useAuthContext()

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const ConfirmPasswordField = () => {
  const { form, mode, loading } = useAuthContext()
  if (mode !== 'signup') return null

  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const SubmitButton = () => {
  const { mode, loading } = useAuthContext()
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      {loading && <Spinner />}
    </Button>
  )
}

export const SwitchMode = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-center text-sm">{children}</div>
}
