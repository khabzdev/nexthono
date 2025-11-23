import { and, eq } from 'drizzle-orm'
import { db } from '@/db'
import { member } from '@/db/schema'

export const orgService = {
  async getUserOrgs(userId: string) {
    const userOrgs = await db.query.organization.findMany({
      where: (org, { exists }) =>
        exists(
          db
            .select()
            .from(member)
            .where(
              and(eq(member.userId, userId), eq(member.organizationId, org.id)),
            ),
        ),
      with: {
        members: true,
      },
    })

    return userOrgs
  },
}
