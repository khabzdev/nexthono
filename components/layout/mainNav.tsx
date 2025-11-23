import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dashboardConfig } from '@/lib/config'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

export const MainNav = () => {
  const pathName = usePathname()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {dashboardConfig.mainNav.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton isActive={pathName === item.href} asChild>
              <Link href={item.href}>
                <item.icon className="size-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
