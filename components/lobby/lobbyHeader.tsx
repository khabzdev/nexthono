import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { Icons } from '../icons'
import { ThemeSwitcher } from '../theme-switcher'
import { Button } from '../ui/button'

export const LobbyHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link href="/">
              <Icons.logo className="size-5 font-bold" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
