import { auth } from '@/lib/auth'
import createApp from './createApp'
import { orgRoutes } from './routes/orgs'

const app = createApp().basePath('/api/trpc')

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  const activeMember = await auth.api.getActiveMember({
    headers: c.req.raw.headers,
  })
  if (!session) {
    c.set('user', null)
    c.set('session', null)
    c.set('activeMember', null)
    await next()
    return
  }
  c.set('user', session.user)
  c.set('session', session.session)
  c.set('activeMember', activeMember)
  await next()
})

app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

const routes = app.route('/orgs', orgRoutes)

export type AppTypes = typeof routes

export default app
