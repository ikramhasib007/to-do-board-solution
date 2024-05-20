import type { NextConfig } from 'next'
import getConfig from 'next/config'

const { publicRuntimeConfig }: NextConfig = getConfig()

type GetLogin = (email: string, password: string) => Promise<number | null>

export const useLogin = () => {

  const getLogin: GetLogin = async (email, password) => {
    try {
      const res = await fetch(`${publicRuntimeConfig!.BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      return res.status
    } catch (error) {
      console.log('LOGIN error: ', error);
      return null
    }
  }

  return { getLogin }
}
