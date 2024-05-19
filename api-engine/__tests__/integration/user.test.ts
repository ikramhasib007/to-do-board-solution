/// <reference types="node" />

const casual = require("casual");
import prisma from "../../src/prisma";
import getClient from "../utils/getClient";
import seedDatabase, { userOne } from "../utils/seedDatabase";
import { CREATE_USER, DELETE_USER, LOGIN, UPDATE_USER } from "../operations/user";

const client = getClient();

beforeEach(seedDatabase);

describe("MUTATE /user", () => {
  test("Should create a new user", async () => {
    const variables = {
      data: {
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        password: "12345678",
      },
    };

    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables,
    });

    const users = await prisma.user.findMany({ where: { isDeleted: false } });
    expect(users.length).toBe(3);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: data.createUser.user.id }),
      ])
    );
  });

  test("Should not create a user with invalid password", async () => {
    const variables = {
      data: {
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        password: "1234",
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_USER, variables })
    ).rejects.toThrow("Password must be 8 characters or longer.");
  });

  test("Should login with valid credentials", async () => {
    const variables = {
      data: {
        email: userOne.input.email,
        password: "Red089!#$",
      },
    };

    const { data } = await client.mutate({
      mutation: LOGIN,
      variables,
    });

    expect(data.login.token).toBeTruthy();
    expect(data.login.user.firstName).toBe(userOne.input.firstName);
  });

  test("Should not login with bad credentials", async () => {
    const variables = {
      data: {
        email: userOne.input.email,
        password: "ewrewru098^",
      },
    };
    await expect(
      client.mutate({ mutation: LOGIN, variables })
    ).rejects.toThrow("Unable to login");
  });

  test("Should update a user", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        firstName: `test${userOne.user?.firstName}`
      }
    }
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables,
    });
    expect(data.updateUser.firstName).toBe(variables.data.firstName);
  })

  test("Should not update a user from unauthorized user", async () => {
    const variables = {
      data: {
        firstName: `test${userOne.user?.firstName}`
      }
    }
    await expect(
      client.mutate({ mutation: UPDATE_USER, variables })
    ).rejects.toThrow("Authentication required");
  })

  test("Should delete a user", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.mutate({
      mutation: DELETE_USER,
    });
    expect(data.deleteUser.isDeleted).toBe(true);
    const users = await prisma.user.findMany({ where: { isDeleted: false } });
    expect(users.length).toBe(1);
  })

  test("Should not delete a user from unauthorized user", async () => {
    await expect(
      client.mutate({ mutation: DELETE_USER })
    ).rejects.toThrow("Authentication required");
  })
});
