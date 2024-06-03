import { Label, MutationResolvers } from '../../generated/graphql';
import Context from '../../context';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import getUserId from '../../utils/getUserId';
import { PrismaSelect } from '@paljs/plugins';

const labelResolvers: MutationResolvers = {
  async createLabel(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title, ticketId } = args.data;
      const data: Prisma.LabelCreateInput = {
        title,
        ticket: { connect: { id: ticketId } },
      };

      const label = await prisma.label.create({
        data,
        ...select,
      });

      return label as unknown as Label;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async updateLabel(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title } = args.data;
      const data: Prisma.LabelUpdateInput = {
        title,
      };
      const label = await prisma.label.update({
        where: {
          id: args.id,
        },
        data,
        ...select,
      });

      return label as unknown as Label;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async deleteLabel(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      await prisma.label.findFirstOrThrow({ where: { id: args.id } });

      const label = await prisma.label.delete({
        where: { id: args.id },
        ...select,
      });

      return label as unknown as Label;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default labelResolvers;
