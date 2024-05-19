/// <reference types="node" />

const casual = require("casual");
import getClient from "../utils/getClient";
import seedDatabase, {
  categoryOne,
  userOne,
} from "../utils/seedDatabase";
import { GET_CATEGORIES, GET_CATEGORY } from "../operations/category";

const client = getClient();

beforeEach(seedDatabase);

describe("QUERY /category", () => {
  test("Should expose all categories", async () => {
    const client = getClient(userOne.token)
    const { data } = await client.query({ query: GET_CATEGORIES })
    expect(data.categories.length).toBe(2);
  });

  test("Should not expose categories for unauthorized user", async () => {
    await expect(
      client.query({ query: GET_CATEGORIES })
    ).rejects.toThrow();
  });

  test("Should get category by associated id", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.query({
      query: GET_CATEGORY,
      variables: { id: categoryOne.data?.id }
    })
    expect(data.category.title).toBe(categoryOne.data?.title);
  });

  test("Should not get category by unassociated id", async () => {
    const client = getClient(userOne.token);
    await expect(
      client.query({
        query: GET_CATEGORY,
        variables: { id: casual.uuid }
      })
    ).rejects.toThrow();
  });

  test("Should not get category by unauthorized user", async () => {
    await expect(
      client.query({
        query: GET_CATEGORY,
        variables: { id: categoryOne.data?.id }
      })
    ).rejects.toThrow();
  });

});
