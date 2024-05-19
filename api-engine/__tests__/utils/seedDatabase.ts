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

export const categoryOne: InputPayload<Prisma.CategoryCreateInput, Prisma.CategoryGetPayload<{ include: { labels: true, tickets: true } }>> = {
  input: {
    title: casual.title
  }
}

export const categoryTwo: InputPayload<Prisma.CategoryCreateInput, Prisma.CategoryGetPayload<{ include: { labels: true, tickets: true } }>> = {
  input: {
    title: casual.title
  }
}

export const labelOne: InputPayload<Prisma.LabelCreateInput, Prisma.LabelGetPayload<{ include: { category: true } }>> = {
  input: {
    title: casual.title,
    category: {}
  }
}

export const labelTwo: InputPayload<Prisma.LabelCreateInput, Prisma.LabelGetPayload<{ include: { category: true } }>> = {
  input: {
    title: casual.title,
    category: {}
  }
}


const seedDatabase = async () => {
  // Delete all data

  try {
    const deleteLabels = prisma.label.deleteMany();
    const deleteCategories = prisma.category.deleteMany();
    const deleteUsers = prisma.user.deleteMany();
    
    await prisma.$transaction([
      deleteLabels,
      deleteCategories,
      deleteUsers
    ]);

    // Create userOne & generate auth token
    userOne.user = await prisma.user.create({ data: userOne.input });
    userOne.token = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET!)
    // Create userTwo & generate auth token
    userTwo.user = await prisma.user.create({ data: userTwo.input });
    userTwo.token = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET!)

    // Create category
    categoryOne.data = await prisma.category.create({ data: categoryOne.input, include: { labels: true, tickets: true } })
    labelOne.input.category = { connect: { id: categoryOne.data?.id } }
    labelTwo.input.category = { connect: { id: categoryOne.data?.id } }
    categoryTwo.data = await prisma.category.create({ data: categoryTwo.input, include: { labels: true, tickets: true } })

    // Create Label
    labelOne.data = await prisma.label.create({ data: labelOne.input, include: { category: true } })
    labelTwo.data = await prisma.label.create({ data: labelTwo.input, include: { category: true } })

  } catch (error) {
    throw new Error("Required to run the database migration. Please run the scripts `pnpm migrate && pnpm migrate:test`")
  } finally {
    prisma.$disconnect()
  }
}

export default seedDatabase