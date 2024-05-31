import { Ticket, MutationResolvers } from '../../generated/graphql';
import Context from '../../context';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import getUserId from '../../utils/getUserId';
import { PrismaSelect } from '@paljs/plugins';

const ticketResolvers: MutationResolvers = {
  async createTicket(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title, description, expiryDate, categoryId } = args.data;
      const data: Prisma.TicketCreateInput = {
        title,
        description,
        expiryDate,
        category: { connect: { id: categoryId } },
        user: { connect: { id: args.data.userId } },
      };

      const ticket = await prisma.ticket.create({
        data,
        ...select,
      });

      return ticket as unknown as Ticket;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async updateTicket(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      const { title, description, expiryDate, categoryId } = args.data;
      const data: Prisma.TicketUpdateInput = {
        title: title!,
        description: description!,
        expiryDate: expiryDate,
      };
      if (categoryId) {
        data.category = { connect: { id: categoryId } };
      }
      if (args.data.userId) {
        data.user = { connect: { id: args.data.userId } };
      }
      const ticket = await prisma.ticket.update({
        where: {
          id: args.id,
        },
        data,
        ...select,
      });

      return ticket as unknown as Ticket;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async deleteTicket(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value;
      await prisma.ticket.findFirstOrThrow({ where: { id: args.id } });

      const ticket = await prisma.ticket.update({
        where: { id: args.id },
        data: {
          category: { disconnect: true },
          user: { disconnect: true },
          isDeleted: true,
        },
        ...select,
      });

      return ticket as unknown as Ticket;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default ticketResolvers;
