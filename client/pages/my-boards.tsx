import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { User } from "@/types";
import { getLoginSession } from "@/lib/auth";
import getClient from "../apollo";
import { GET_USER } from "@/operations/user";
import { removeTokenCookie } from "@/lib/auth/cookies";
import Layout from "@/components/layout";

export default function MyBoardsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Layout>
      <h1>Hello there!</h1>
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
    },
  }
}) satisfies GetServerSideProps<PageProps>