// eslint-disable-next-line @typescript-eslint/no-var-requires
const casual = require("casual");
import prisma from "../../src/prisma";
import getClient from "../utils/getClient";
import seedDatabase, { labelOne, ticketOne, userOne } from "../utils/seedDatabase";
import { CREATE_LABEL, DELETE_LABEL, UPDATE_LABEL } from "../operations/label";

const client = getClient();

beforeEach(seedDatabase);

describe("MUTATE /label", () => {
  test("Should create a new label", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: casual.title,
        ticketId: ticketOne.data?.id
      },
    };

    const { data } = await client.mutate({
      mutation: CREATE_LABEL,
      variables,
    });

    const labels = await prisma.label.findMany({ where: { ticketId: ticketOne.data?.id } });
    expect(labels.length).toBe(3);
    expect(labels).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: data.createLabel.id }),
      ])
    );
  });

  test("Should not create a label from unauthorized user", async () => {
    const variables = {
      data: {
        title: casual.title,
        ticketId: ticketOne.data?.id
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_LABEL, variables })
    ).rejects.toThrow("Authentication required");
  });

  test("Should not create a label with bad inputs", async () => {
    const variables = {
      data: {},
    };
    await expect(
      client.mutate({ mutation: CREATE_LABEL, variables })
    ).rejects.toThrow();
  });

  test("Should not create a label with an empty title", async () => {
    const variables = {
      data: {
        title: '',
        ticketId: ticketOne.data?.id
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_LABEL, variables })
    ).rejects.toThrow();
  });

  test("Should update a label", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: `test${labelOne.data?.title}`
      },
      id: labelOne.data?.id
    }
    const { data } = await client.mutate({
      mutation: UPDATE_LABEL,
      variables,
    });
    expect(data.updateLabel.title).toBe(variables.data.title);
  })

  test("Should not update a label when provided id is unassociated", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: `test${labelOne.data?.title}`
      },
      id: casual.uuid
    }
    await expect(
      client.mutate({ mutation: UPDATE_LABEL, variables })
    ).rejects.toThrow();
  })

  test("Should not update a label from unauthorized user", async () => {
    const variables = {
      data: {
        title: `test${labelOne.data?.title}`
      },
      id: labelOne.data?.id
    }
    await expect(
      client.mutate({ mutation: UPDATE_LABEL, variables })
    ).rejects.toThrow("Authentication required");
  })

  test("Should delete a label", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.mutate({
      mutation: DELETE_LABEL,
      variables: { id: labelOne.data?.id }
    });
    const labels = await prisma.label.findMany({ where: { ticketId: ticketOne.data?.id } });
    expect(labels.length).toBe(1);
    const ticket = await prisma.ticket.findFirstOrThrow({ where: { id: ticketOne.data?.id }, include: { labels: true } })
    expect(ticket.labels.length).toBe(1);
    expect(ticket.labels).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: data.deleteLabel.id
        })
      ])
    )
  })

  test("Should not delete a label from unauthorized user", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_LABEL,
        variables: { id: labelOne.data?.id }
      })
    ).rejects.toThrow("Authentication required");
  })

  test("ID should be required when delete label operation is performed", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_LABEL,
      })
    ).rejects.toThrow();
  })

});
