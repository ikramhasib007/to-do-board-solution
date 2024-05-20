import { serialize, parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const TOKEN_NAME = 'ikram-todo-app'

// export const MAX_AGE = 60 * 60 * 24 * 1 // 1 days
export const MAX_AGE: number = +process.env.SESSION_EXPIRESIN! || 60 * 60 // 1 hour

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res: any) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req: NextApiRequest) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}