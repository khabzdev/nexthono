'use client'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/enums'
import { getUserOrgs } from '@/trpc/orgs'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '../ui/sidebar'
import { Skeleton } from '../ui/skeleton'
import { MainNav } from './mainNav'
import { OrgSwitcher } from './orgSwitcher'
import { UserNav } from './userNav'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    id: string
    name: string
    email: string
    image: string | null | undefined
  }
  activeOrganizationId: string
}

export const AppSidebar = ({
  user,
  activeOrganizationId,
  ...props
}: AppSidebarProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_CURRENT_USER],
    queryFn: getUserOrgs,
  })
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isLoading ? (
          <Skeleton className="h-10 w-full rounded-lg" />
        ) : (
          <OrgSwitcher
            orgs={
              data?.map((org) => ({
                id: org.id,
                name: org.name,
                logo: org.logo,
                plan: 'Free',
              })) || []
            }
            activeOrganizationId={activeOrganizationId}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <MainNav />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
