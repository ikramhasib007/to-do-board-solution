import { ApolloClient, from, InMemoryCache } from '@apollo/client/core'
import { YogaLink } from '@graphql-yoga/apollo-link'
import { onError } from '@apollo/client/link/error'

const httpLink = (token?: string) =>
  new YogaLink({
    endpoint: `http://localhost:${process.env.HTTP_PORT}/graphql`,
    fetch: (uri, options) => {
      // @ts-expect-error -> header type check skipping
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
    cache: new InMemoryCache(),
  })

export default getClient
