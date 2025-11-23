import { IconChevronRight } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface OrgCardProps {
  id: string
  name: string
  image: string | null | undefined
  memberCount: number
}

export const OrgCard = ({ id, name, image, memberCount }: OrgCardProps) => {
  return (
    <Card className="border-none">
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="rounded-sm size-10">
              <AvatarImage src={image ?? undefined} alt={name} />
              <AvatarFallback className="max-w-xs text-md font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 rounded-lg">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="max-w-xs font-semibold tracking-tight text-black dark:text-zinc-50">
                {name}
              </span>
              <span className="text-xs text-muted-foreground">
                {memberCount} member{memberCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await authClient.organization.setActive({
                organizationId: id,
                fetchOptions: {
                  onRequest: () => {
                    toast.loading('Switching organization...')
                  },
                  onError: (error) => {
                    toast.dismiss()
                    toast.error(
                      error.error.message || 'Failed to switch organization',
                    )
                  },
                  onSuccess: () => {
                    toast.dismiss()
                    redirect('/dashboard')
                  },
                },
              })
            }}
          >
            <IconChevronRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
