// eslint-disable-next-line @typescript-eslint/no-var-requires
const casual = require("casual");
import getClient from "../utils/getClient";
import seedDatabase, {
  categoryOne,
  ticketOne,
  userOne,
} from "../utils/seedDatabase";
import { GET_CATEGORIES, GET_CATEGORY } from "../operations/category";
import { GET_TICKET, GET_TICKETS } from "../operations/ticket";

const client = getClient();

beforeEach(seedDatabase);

describe("QUERY /ticket", () => {
  test("Should expose all tickets", async () => {
    const client = getClient(userOne.token)
    const { data } = await client.query({ query: GET_TICKETS })
    expect(data.tickets.length).toBe(2);
  });

  test("Should not expose tickets for unauthorized user", async () => {
    await expect(
      client.query({ query: GET_TICKETS })
    ).rejects.toThrow();
  });

  test("Should get ticket by associated id", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.query({
      query: GET_TICKET,
      variables: { id: ticketOne.data?.id }
    })
    expect(data.ticket.title).toBe(ticketOne.data?.title);
  });

  test("Should not get ticket by unassociated id", async () => {
    const client = getClient(userOne.token);
    await expect(
      client.query({
        query: GET_TICKET,
        variables: { id: casual.uuid }
      })
    ).rejects.toThrow();
  });

  test("Should not get ticket by unauthorized user", async () => {
    await expect(
      client.query({
        query: GET_TICKET,
        variables: { id: ticketOne.data?.id }
      })
    ).rejects.toThrow();
  });

});
