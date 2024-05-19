/// <reference types="node" />

const casual = require("casual");
import prisma from "../../src/prisma";
import getClient from "../utils/getClient";
import seedDatabase, { categoryOne, userOne } from "../utils/seedDatabase";
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../operations/category";

const client = getClient();

beforeEach(seedDatabase);

describe("MUTATE /category", () => {
  test("Should create a new category", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: casual.title
      },
    };

    const { data } = await client.mutate({
      mutation: CREATE_CATEGORY,
      variables,
    });

    const categories = await prisma.category.findMany({ where: { isDeleted: false } });
    expect(categories.length).toBe(3);
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: data.createCategory.id }),
      ])
    );
  });

  test("Should not create a category from unauthorized user", async () => {
    const variables = {
      data: {
        title: casual.title
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_CATEGORY, variables })
    ).rejects.toThrow("Authentication required");
  });

  test("Should not create a category with bad inputs", async () => {
    const variables = {
      data: {},
    };
    await expect(
      client.mutate({ mutation: CREATE_CATEGORY, variables })
    ).rejects.toThrow();
  });

  test("Should not create a category with an empty title", async () => {
    const variables = {
      data: {
        title: ''
      },
    };
    await expect(
      client.mutate({ mutation: CREATE_CATEGORY, variables })
    ).rejects.toThrow();
  });

  test("Should update a category", async () => {
    const client = getClient(userOne.token);
    const variables = {
      data: {
        title: `test${categoryOne.data?.title}`
      },
      id: categoryOne.data?.id
    }
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY,
      variables,
    });
    expect(data.updateCategory.title).toBe(variables.data.title);
  })

  test("Should not update a category from unauthorized user", async () => {
    const variables = {
      data: {
        title: `test${categoryOne.data?.title}`
      },
      id: categoryOne.data?.id
    }
    await expect(
      client.mutate({ mutation: UPDATE_CATEGORY, variables })
    ).rejects.toThrow("Authentication required");
  })

  test("Should delete a category", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id: categoryOne.data?.id }
    });
    expect(data.deleteCategory.isDeleted).toBe(true);
    const categories = await prisma.category.findMany({ where: { isDeleted: false } });
    expect(categories.length).toBe(1);
  })

  test("Should not delete a category from unauthorized user", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_CATEGORY,
        variables: { id: categoryOne.data?.id }
      })
    ).rejects.toThrow("Authentication required");
  })

  test("ID should be required when delete category operation is performed", async () => {
    await expect(
      client.mutate({
        mutation: DELETE_CATEGORY,
      })
    ).rejects.toThrow();
  })

});
