import type { NextConfig } from 'next'
import getConfig from 'next/config'
import { ApolloClient, from } from '@apollo/client/core'
import { YogaLink } from '@graphql-yoga/apollo-link'
import { onError } from '@apollo/client/link/error'
import { cache } from '@/stores/cache'

const { publicRuntimeConfig }: NextConfig = getConfig()

const httpLink = (token?: string) =>
  new YogaLink({
    endpoint: publicRuntimeConfig!.API_URL,
    fetch: (uri, options) => {
      // @ts-expect-error
      options.headers.Authorization = token ? `Bearer ${token}` : ''
      return fetch(uri, options)
    },
  })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && process.env.NODE_ENV !== 'production')
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
          undefined,
          2
        )}, Path: ${JSON.stringify(path, undefined, 2)}`
      )
    )

  if (networkError)
    console.log(
      `[Network error]: ${JSON.stringify(networkError, undefined, 2)}`
    )
})

const getClient = (token?: string) =>
  new ApolloClient({
    link: from([errorLink, httpLink(token)]),
    cache,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    name: 'todo',
    version: '0.1.0',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    }
  })

export default getClient
