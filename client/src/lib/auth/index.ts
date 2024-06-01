import Iron from '@hapi/iron'
import type { NextApiResponse } from 'next'
import type { ToDoSession } from '@/types'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies'

const TOKEN_SECRET: string = process.env.SESSION_TOKEN_SECRET || 'my-session-secret'

export async function setLoginSession(res: NextApiResponse, session: { token: string }) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj: ToDoSession = { ...session, createdAt, maxAge: MAX_AGE }
  const token: string = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req: any): Promise<ToDoSession | undefined> {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}