// eslint-disable-next-line @typescript-eslint/no-var-requires
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

export const categoryOne: InputPayload<Prisma.CategoryCreateInput, Prisma.CategoryGetPayload<{ include: { tickets: true } }>> = {
  input: {
    title: casual.title
  }
}

export const categoryTwo: InputPayload<Prisma.CategoryCreateInput, Prisma.CategoryGetPayload<{ include: { tickets: true } }>> = {
  input: {
    title: casual.title
  }
}

export const ticketOne: InputPayload<Prisma.TicketCreateInput, Prisma.TicketGetPayload<{ include: { category: true, labels: true } }>> = {
  input: {
    title: casual.title,
    description: casual.description,
    expiryDate: new Date().addDays(4),
    category: {},
    user: {}
  }
}

export const ticketTwo: InputPayload<Prisma.TicketCreateInput, Prisma.TicketGetPayload<{ include: { category: true, labels: true } }>> = {
  input: {
    title: casual.title,
    description: casual.description,
    expiryDate: new Date().addDays(5),
    category: {},
    user: {}
  }
}

export const labelOne: InputPayload<Prisma.LabelCreateInput, Prisma.LabelGetPayload<{ include: { ticket: true } }>> = {
  input: {
    title: casual.title,
    ticket: {}
  }
}

export const labelTwo: InputPayload<Prisma.LabelCreateInput, Prisma.LabelGetPayload<{ include: { ticket: true } }>> = {
  input: {
    title: casual.title,
    ticket: {}
  }
}


const seedDatabase = async () => {
  // Delete all data

  try {
    const deleteLabels = prisma.label.deleteMany();
    const deleteTickets = prisma.ticket.deleteMany();
    const deleteCategories = prisma.category.deleteMany();
    const deleteUsers = prisma.user.deleteMany();
    
    await prisma.$transaction([
      deleteLabels,
      deleteTickets,
      deleteCategories,
      deleteUsers
    ]);

    // Create userOne & generate auth token
    userOne.user = await prisma.user.create({ data: userOne.input });
    userOne.token = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET!)
    ticketOne.input.user = { connect: { id: userOne.user.id } }
    ticketTwo.input.user = { connect: { id: userOne.user.id } }
    // Create userTwo & generate auth token
    userTwo.user = await prisma.user.create({ data: userTwo.input });
    userTwo.token = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET!)

    // Create category
    categoryOne.data = await prisma.category.create({ data: categoryOne.input, include: { tickets: true } })
    ticketOne.input.category = { connect: { id: categoryOne.data?.id } }
    ticketTwo.input.category = { connect: { id: categoryOne.data?.id } }
    
    categoryTwo.data = await prisma.category.create({ data: categoryTwo.input, include: { tickets: true } })
    
    // Create Ticket
    ticketOne.data = await prisma.ticket.create({ data: ticketOne.input, include: { category: true, labels: true } })
    labelOne.input.ticket = { connect: { id: ticketOne.data?.id } }
    labelTwo.input.ticket = { connect: { id: ticketOne.data?.id } }
    
    ticketTwo.data = await prisma.ticket.create({ data: ticketTwo.input, include: { category: true, labels: true } })
    
    // Create Label
    labelOne.data = await prisma.label.create({ data: labelOne.input, include: { ticket: true } })
    labelTwo.data = await prisma.label.create({ data: labelTwo.input, include: { ticket: true } })

  } catch (error) {
    throw new Error("Required to run the database migration. Please run the scripts `pnpm migrate && pnpm migrate:test`")
  } finally {
    prisma.$disconnect()
  }
}

export default seedDatabase