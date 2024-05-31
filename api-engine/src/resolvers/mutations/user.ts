import { AuthPayload, MutationResolvers, User } from '../../generated/graphql';
import Context from '../../context';
import { Prisma } from '@prisma/client';
import hashPassword from '../../utils/hashPassword';
import generateToken from '../../utils/generateToken';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import getUserId from '../../utils/getUserId';

const userResolvers: MutationResolvers = {
  async createUser(parent, args, { prisma }: Context, info) {
    try {
      const { firstName, lastName, email, password } = args.data;
      const data: Omit<Prisma.UserCreateInput, 'password'> & {
        password?: string;
      } = {
        firstName,
        lastName,
        email,
      };
      if (password) {
        data.password = await hashPassword(password);
      }

      const user = await prisma.user.create({
        data: data as Prisma.UserCreateInput,
      });

      return {
        user,
        token: generateToken(user.id),
      } as unknown as AuthPayload;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async login(parent, args, { prisma }: Context, info) {
    const { email, password } = args.data;
    try {
      const query: Prisma.UserFindUniqueOrThrowArgs = {
        where: {
          email,
        },
      };
      const user = await prisma.user.findFirstOrThrow(query);

      if (password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new GraphQLError('Unable to login');
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
        },
      });

      return {
        user,
        token: generateToken(user.id),
      } as AuthPayload;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async updateUser(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      if (typeof args.data.password === 'string') {
        args.data.password = await hashPassword(args.data.password);
      }
      const { firstName, lastName, email, password } = args.data;
      const data: Prisma.UserUpdateInput = {
        firstName: firstName!,
        lastName: lastName!,
        email: email!,
        password: password!,
      };
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });

      return user as unknown as User;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },

  async deleteUser(parent, args, { prisma, request }: Context, info) {
    try {
      const userId = getUserId(request);
      const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
        include: { tickets: true },
      });
      let disconnection: any[] = [];
      if (user.tickets?.length) {
        disconnection = user.tickets.map((ticket) =>
          prisma.ticket.update({
            where: { id: ticket.id },
            data: { user: { disconnect: true } },
          })
        );
      }

      const deleteUserOps = prisma.user.update({
        where: { id: userId },
        data: { isDeleted: true },
      });

      const [userData] = await prisma.$transaction([
        deleteUserOps,
        ...disconnection,
      ]);
      return userData as User;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  },
};

export default userResolvers;
