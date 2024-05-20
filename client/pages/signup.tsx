import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Layout from "@/components/layout"
import SignupForm from "@/components/signup/SignupForm"
import { getLoginSession } from "@/lib/auth"
import { User } from "@/types"
import Link from 'next/link'

export default function SignupPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-xl">
          <SignupForm />
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account? Please{' '}
            <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              log in
            </Link>
            {' '}here
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
