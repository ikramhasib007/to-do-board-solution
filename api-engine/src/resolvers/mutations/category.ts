import { Category, MutationResolvers } from '../../generated/graphql';
import Context from '../../context';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import getUserId from '../../utils/getUserId';
import { PrismaSelect } from '@paljs/plugins';

const categoryResolvers: MutationResolvers = {
  async createCategory(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title } = args.data;
      const data: Prisma.CategoryCreateInput = {
        title,
      };

      const category = await prisma.category.create({
        data,
        ...select,
      });

      return category as unknown as Category;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async updateCategory(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title } = args.data;
      const data: Prisma.CategoryUpdateInput = {
        title,
      };
      const category = await prisma.category.update({
        where: {
          id: args.id,
        },
        data,
        ...select,
      });

      return category as unknown as Category;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async deleteCategory(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const category = await prisma.category.findFirstOrThrow({
        where: { id: args.id },
        include: { tickets: true },
      });

      let ticketsDisconnection: any[] = [];
      if (category.tickets?.length) {
        ticketsDisconnection = category.tickets.map((ticket) =>
          prisma.ticket.update({
            where: { id: ticket.id },
            data: { category: { disconnect: true } },
          })
        );
      }

      const deleteCategoryOps = prisma.category.update({
        where: { id: args.id },
        data: { isDeleted: true },
        ...select,
      });

      const [categoryData] = await prisma.$transaction([
        deleteCategoryOps,
        ...ticketsDisconnection,
      ]);
      return categoryData as Category;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default categoryResolvers;
