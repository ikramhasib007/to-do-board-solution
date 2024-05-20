import { removeTokenCookie } from '@/lib/auth/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/login' })
  res.end()
}