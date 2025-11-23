import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'
import { auth } from '@/lib/auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin')
  }

  if (!session.session.activeOrganizationId) {
    redirect('/lobby')
  }
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Dashboard Footer</footer>
    </div>
  )
}
