import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Layout from "@/components/layout"
import SigninForm from "@/components/signin/SigninForm"
import Image from "next/image"
import { getLoginSession } from '@/lib/auth'
import { User } from '@/types'
import Link from 'next/link'

export default function LoginPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={40}
            height={40}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SigninForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? Please{' '}
            <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              sign up
            </Link>
          </p>
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

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      token: '',
      user: null
    },
  }

}) satisfies GetServerSideProps<PageProps>