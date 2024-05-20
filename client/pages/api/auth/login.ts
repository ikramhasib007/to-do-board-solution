import type { NextApiRequest, NextApiResponse } from 'next'
import { setLoginSession } from '@/lib/auth';
import getClient from '../../../apollo';
import { LOGIN } from '@/operations/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }
  const client = getClient()
  let variables = {
    data: {
      email: req.body.email,
      password: req.body.password,
    }
  }
  const { data, errors } = await client.mutate({mutation: LOGIN, variables})
  if(errors && errors[0].message.includes('NotFoundError')) return res.status(404).send(null)
  if(errors && errors[0].message.includes('Unable to login')) return res.status(401).send("Unable to login")
  await setLoginSession(res, { token: data.login.token })
  res.status(200).send(null)
}
