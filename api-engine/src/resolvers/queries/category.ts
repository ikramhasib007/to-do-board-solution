import { GraphQLError } from 'graphql';
import Context from '../../context';
import { Category, QueryResolvers } from '../../generated/graphql';
import getUserId from '../../utils/getUserId';
import { Prisma } from '@prisma/client';
import { PrismaSelect } from '@paljs/plugins';

const categoryQueryResolvers: QueryResolvers = {
  async categories(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const opArgs: Prisma.CategoryFindManyArgs = {
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
            title: { contains: args.query, mode: 'insensitive' },
          },
        ];
      }
      return (await prisma.category.findMany(opArgs)) as unknown as Category[];
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async category(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      return (await prisma.category.findUniqueOrThrow({
        where: {
          id: args.id,
        },
        ...select,
      })) as unknown as Category;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default categoryQueryResolvers;
