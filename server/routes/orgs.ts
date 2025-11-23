import createApp from '../createApp'
import { orgService } from '../services/orgs'

const app = createApp()

export const orgRoutes = app.get('/', async (c) => {
  const session = c.get('session')
  if (!session || !session.userId) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = session.userId
  const orgs = await orgService.getUserOrgs(userId)

  return c.json({ data: orgs }, 200)
})
