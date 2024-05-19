import { GraphQLError } from "graphql";
import Context from '../../context';
import { Label, QueryResolvers } from "../../generated/graphql";
import getUserId from "../../utils/getUserId";
import { Prisma } from "@prisma/client";
import { PrismaSelect } from "@paljs/plugins";

const labelQueryResolvers: QueryResolvers = {
  async labels(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request)
      const select = new PrismaSelect(info).value;
      const opArgs: Prisma.LabelFindManyArgs = {
        take: args.take ?? undefined,
        skip: args.skip ?? undefined,
        select: {
          ...select.select,
        },
      }
      if(typeof args.categoryId === 'string') {
        opArgs.where = {
          categoryId: args.categoryId
        }
      }
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
      return (await prisma.label.findMany(opArgs)) as unknown as Label[];
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async label(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      return (await prisma.label.findUniqueOrThrow({
        where: {
          id: args.id,
        },
        ...select
      })) as unknown as Label;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
}

export default labelQueryResolvers;