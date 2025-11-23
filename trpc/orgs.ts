import { trpc } from './config'

const routes = trpc.orgs

export const getUserOrgs = async () => {
  const response = await routes.$get()
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch organizations')
  }

  const { data } = await response.json()
  return data
}
