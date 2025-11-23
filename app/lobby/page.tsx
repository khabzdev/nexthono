'use client'
import { IconCirclePlus, IconSearch } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { LobbyHeader } from '@/components/lobby/lobbyHeader'
import { OrgCard } from '@/components/organizations/orgCard'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Skeleton } from '@/components/ui/skeleton'
import { QueryKeys } from '@/enums'
import { getUserOrgs } from '@/trpc/orgs'

export default function Page() {
  const { data: orgs, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_USER_ORGS],
    queryFn: getUserOrgs,
  })
  return (
    <div className="flex flex-col gap-4 h-screen">
      <LobbyHeader />
      <div className="flex flex-col gap-4 container">
        <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Your organizations
        </h1>
        <div className="flex justify-between items-center">
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
          <Button>
            <IconCirclePlus />
            New organization
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            <React.Fragment>
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </React.Fragment>
          ) : (
            orgs?.map((org) => (
              <OrgCard
                key={org.id}
                id={org.id}
                name={org.name}
                image={org.logo}
                memberCount={org.members.length}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
