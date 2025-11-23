import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod/v4'

export const env = createEnv({
  server: {
    DATABASE_URL: z.url().startsWith('postgresql://'),
    NODE_ENV: z.enum(['development', 'production', 'test']),
    BETTER_AUTH_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: process.env.NODE_ENV !== 'production',
})
