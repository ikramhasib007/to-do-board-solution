import express from 'express';
import { createFetch } from '@whatwg-node/fetch';
import { createYoga, createSchema, useExtendContext } from 'graphql-yoga';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { resolvers } from '../resolvers';
import prisma from '../prisma';

const typeDefs = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

export const schema = createSchema({ typeDefs, resolvers });

// Create a Yoga instance with a GraphQL schema.
export const yoga = createYoga({
  cors: {
    origin: process.env.CORS?.split(','),
    credentials: true,
    allowedHeaders: ['X-Custom-Header', 'Authorization', 'Content-Type'],
    methods: ['POST'],
  },
  schema,
  logging: true,
  plugins: [useExtendContext(() => ({ prisma }))],
  graphiql: process.env.NODE_ENV !== 'production',
  fetchAPI: createFetch({
    formDataLimits: {
      // Maximum allowed file size (in bytes)
      fileSize: 1048576, // unit bytes // size 1M
      // Maximum allowed number of files
      files: 4,
      // Maximum allowed size of content (operations, variables etc...)
      fieldSize: 4194304, // unit bytes // 1M x 4 (maxFiles)
      // Maximum allowed header size for form data
      headerSize: 4194304, // unit bytes // 1M x 4 (maxFiles)
    },
  }),
});

export function buildApp(app: ReturnType<typeof express>) {
  app.use('/graphql', yoga);

  return app;
}
