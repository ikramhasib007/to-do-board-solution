import { PrismaClient } from '@prisma/client';
import { YogaInitialContext } from 'graphql-yoga';

export default interface Context extends YogaInitialContext {
  prisma: PrismaClient;
}
