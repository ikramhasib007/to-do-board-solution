/// <reference types="node" />

const casual = require("casual");
import prisma from "../../src/prisma";
import getClient from "../utils/getClient";
import seedDatabase, { categoryOne, ticketOne, userOne } from "../utils/seedDatabase";
import { CREATE_TICKET, DELETE_TICKET, UPDATE_TICKET } from "../operations/ticket";

const client = getClient();

beforeEach(seedDatabase);

describe("MUTATE /ticket", () => {
  test("Should create a new ticket", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: casual.title,
        description: casual.description,
        expiryDate: new Date().addDays(3),
        categoryId: categoryOne.data?.id,
        userId: userOne.user?.id
      },
    };

    const { data } = await client.mutate({
      mutation: CREATE_TICKET,
      variables,
    });

    const tickets = await prisma.ticket.findMany({ where: { isDeleted: false } });
    expect(tickets.length).toBe(3);
    expect(tickets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: data.createTicket.id }),
      ])
    );
  });

  test("Should not create a ticket from unauthorized user", async () => {
    const variables = {
      data: {
        title: casual.title,
        description: casual.description,
        expiryDate: new Date().addDays(3),
        categoryId: categoryOne.data?.id,
        userId: userOne.user?.id
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_TICKET, variables })
    ).rejects.toThrow("Authentication required");
  });

  test("Should not create a ticket with bad inputs", async () => {
    const variables = {
      data: {},
    };
    await expect(
      client.mutate({ mutation: CREATE_TICKET, variables })
    ).rejects.toThrow();
  });

  test("Should not create a ticket with an empty title", async () => {
    const variables = {
      data: {
        title: ''
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_TICKET, variables })
    ).rejects.toThrow();
  });

  test("Should update a ticket", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: `test${ticketOne.data?.title}`
      },
      id: ticketOne.data?.id
    }
    const { data } = await client.mutate({
      mutation: UPDATE_TICKET,
      variables,
    });
    expect(data.updateTicket.title).toBe(variables.data.title);
    expect(data.updateTicket.description).toBe(ticketOne.data?.description);
    expect(data.updateTicket.expiryDate).toBe(`${ticketOne.data?.expiryDate.toISOString()}`);
  })

  test("Should not update a ticket when provided id is unassociated", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: `test${ticketOne.data?.title}`
      },
      id: casual.uuid
    }
    await expect(
      client.mutate({ mutation: UPDATE_TICKET, variables })
    ).rejects.toThrow();
  })

  test("Should not update a ticket from unauthorized user", async () => {
    const variables = {
      data: {
        title: `test${ticketOne.data?.title}`
      },
      id: ticketOne.data?.id
    }
    await expect(
      client.mutate({ mutation: UPDATE_TICKET, variables })
    ).rejects.toThrow("Authentication required");
  })

  test("Should delete a ticket", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.mutate({
      mutation: DELETE_TICKET,
      variables: { id: ticketOne.data?.id }
    });
    expect(data.deleteTicket.isDeleted).toBe(true);
    const tickets = await prisma.ticket.findMany({ where: { isDeleted: false } });
    expect(tickets.length).toBe(1);
  })

  test("Should not delete a ticket from unauthorized user", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_TICKET,
        variables: { id: ticketOne.data?.id }
      })
    ).rejects.toThrow("Authentication required");
  })

  test("ID should be required when delete ticket operation is performed", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_TICKET,
      })
    ).rejects.toThrow();
  })

});
