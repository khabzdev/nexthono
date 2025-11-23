'use client'
import { usePathname } from 'next/navigation'
import { dashboardConfig } from '@/lib/config'
import { ThemeSwitcher } from '../theme-switcher'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

export const AppHeader = () => {
  const pathName = usePathname()

  const title =
    dashboardConfig.mainNav.find((item) => item.href === pathName)?.title ||
    'Dashboard'
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto px-3">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
