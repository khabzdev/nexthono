import { IconHome2, IconUsers } from '@tabler/icons-react'

export const siteConfig = {
  name: 'nexthono',
  description: 'An opinionated NextJS and HonoJS starter kit',
  links: {
    twitter: 'https://twitter.com/khabubundivhu',
    github: 'https://github.com/khabzdev/nexthono',
  },
}

export const dashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: IconHome2,
    },
    {
      title: 'Members',
      href: '/members',
      icon: IconUsers,
    },
  ],
}
