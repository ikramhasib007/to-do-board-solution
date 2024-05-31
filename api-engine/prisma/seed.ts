import '../src/utils/date.extensions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const casual = require('casual');
import bcrypt from 'bcryptjs';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum TicketStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}

async function main() {
  const usersData: Prisma.UserCreateManyInput[] = [
    {
      firstName: casual.first_name,
      lastName: casual.last_name,
      email: 'user.one@example.com',
      password: bcrypt.hashSync('12345678', 10),
    },
    {
      firstName: casual.first_name,
      lastName: casual.last_name,
      email: 'user.two@example.com',
      password: bcrypt.hashSync('12345678', 10),
    },
  ];

  const createManyUsers = await prisma.user.createMany({
    data: usersData,
  });

  console.log({
    createManyUsers,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
