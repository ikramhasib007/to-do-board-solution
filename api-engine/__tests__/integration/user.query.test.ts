import getClient from "../utils/getClient";
import seedDatabase, {
  userOne,
  userTwo,
} from "../utils/seedDatabase";
import { GET_USER, GET_USERS } from "../operations/user";

const client = getClient();

beforeEach(seedDatabase);

describe("QUERY /user", () => {
  test("Should expose all users", async () => {
    const client = getClient(userOne.token)
    const { data } = await client.query({ query: GET_USERS })
    expect(data.users.length).toBe(2);
  });

  test("Should get user", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.query({ query: GET_USER })
    expect(data.user.firstName).toBe(userOne.user?.firstName);
  });

  test("Should get user by user id", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.query({
      query: GET_USER,
      variables: { id: userTwo.user?.id }
    })
    expect(data.user.firstName).toBe(userTwo.user?.firstName);
  });
});
