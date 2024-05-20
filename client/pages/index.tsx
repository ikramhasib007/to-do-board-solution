import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Layout from '@/components/layout'
import getClient from '../apollo'
import { GET_USER } from '@/operations/user'
import { User } from '@/types'
 
export const getServerSideProps = (async (ctx) => {
  const client = getClient()
  let user = null
  try {
    user = await (await client.query({ query: GET_USER })).data.user ?? null
  } catch (error) {
    console.log('error: ', error);
  }
  // customer = (session && (await client.query({query: ME})).data.customer) ?? null 
  console.log('user: ', user);
  return { props: { user } }
}) satisfies GetServerSideProps<{ user: User }>
 
export default function IndexPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Layout>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}