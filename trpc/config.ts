import { hc } from 'hono/client'
import type { AppTypes } from '@/server'

export const trpc = hc<AppTypes>('http://localhost:3000').api.trpc
