import { GraphQLError } from 'graphql';
import Context from '../../context';
import { QueryResolvers, User } from '../../generated/graphql';
import getUserId from '../../utils/getUserId';
import { Prisma } from '@prisma/client';
import { PrismaSelect } from '@paljs/plugins';

const userQueryResolvers: QueryResolvers = {
  async users(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const opArgs: Prisma.UserFindManyArgs = {
        take: args.take ?? undefined,
        skip: args.skip ?? undefined,
        where: {
          isDeleted: false,
        },
        select: {
          ...select.select,
        },
      };
      if (typeof args.cursor === 'string') {
        opArgs.cursor = {
          id: args.cursor,
        };
      }
      if (args.query) {
        opArgs.where!.OR = [
          {
            firstName: { contains: args.query, mode: 'insensitive' },
          },
          {
            lastName: { contains: args.query, mode: 'insensitive' },
          },
          {
            email: { contains: args.query },
          },
        ];
      }
      return (await prisma.user.findMany(opArgs)) as unknown as User[];
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async user(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      return (await prisma.user.findUniqueOrThrow({
        where: {
          id: args.id ?? userId,
        },
        ...select,
      })) as unknown as User;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default userQueryResolvers;
