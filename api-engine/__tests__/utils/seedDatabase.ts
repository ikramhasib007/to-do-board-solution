/// <reference types="node" />

const casual = require("casual");
import "../../src/utils/date.extensions"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
import {
  Prisma,
} from '@prisma/client';


type UserInput = {
  input: Prisma.UserCreateInput;
  user?: Prisma.UserGetPayload<{}>;
  token?: string;
}

type InputPayload<T, D> = {
  input: T;
  data?: D;
}

export const userOne: UserInput = {
  input: {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('Red089!#$', 10),
  },
  user: undefined,
  token: undefined
}

export const userTwo: UserInput = {
  input: {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: 'jane@example.com',
    password: bcrypt.hashSync('Blue089!#$', 10),
  },
  user: undefined,
  token: undefined
}


const seedDatabase = async () => {
  // Delete all data

  try {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([
      deleteUsers
    ]);

    // Create userOne & generate auth token
    userOne.user = await prisma.user.create({ data: userOne.input });
    userOne.token = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET!)
    // Create userTwo & generate auth token
    userTwo.user = await prisma.user.create({ data: userTwo.input });
    userTwo.token = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET!)

  } catch (error) {
    throw new Error("Required to run the database migration. Please run the scripts `pnpm migrate && pnpm migrate:test`")
  } finally {
    prisma.$disconnect()
  }
}

export default seedDatabase