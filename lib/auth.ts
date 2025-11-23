import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { organization } from 'better-auth/plugins'
import { db } from '@/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              name: `Personal`,
              userId: user.id,
              slug: `personal-${user.id}`,
            },
          })
        },
      },
    },
  },
})
