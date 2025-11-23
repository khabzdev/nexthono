import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'
import { AppHeader } from '@/components/layout/appHeader'
import { AppSidebar } from '@/components/layout/appSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
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
    <SidebarProvider>
      <AppSidebar
        variant="sidebar"
        user={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }}
        activeOrganizationId={session.session.activeOrganizationId}
      />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
