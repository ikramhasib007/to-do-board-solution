import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import type { User } from '@/types'
import Link from 'next/link'
import getClient from '../apollo'
import Layout from '@/components/layout'
import { GET_USER } from '@/operations/user'
import { getLoginSession } from '@/lib/auth'
import { removeTokenCookie } from '@/lib/auth/cookies'
 
export default function IndexPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  return (
    <Layout>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              TO-DO Board Solution
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel rem, placeat deserunt hic earum veritatis ullam vitae obcaecati non consequuntur!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/my-boards"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

type PageProps = {
  token: string;
  user: User | null;
}

export const getServerSideProps = (async (ctx) => {
  const session = await getLoginSession(ctx.req)
  let user = null

  if(session) {
    try {
      const client = getClient(session.token)
      user = (session && (await client.query({ query: GET_USER })).data.user) ?? null 
    } catch (error) {
      console.log('error: ', error);
    }
  }

  if(!user) {
    removeTokenCookie(ctx.res)
  }

  return {
    props: {
      token: session ? session.token : '',
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>