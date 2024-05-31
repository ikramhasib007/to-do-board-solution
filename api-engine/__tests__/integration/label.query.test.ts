// eslint-disable-next-line @typescript-eslint/no-var-requires
const casual = require("casual");
import getClient from "../utils/getClient";
import seedDatabase, {
  labelOne,
  userOne,
} from "../utils/seedDatabase";
import { GET_LABEL, GET_LABELS } from "../operations/label";

const client = getClient();

beforeEach(seedDatabase);

describe("QUERY /label", () => {
  test("Should expose all labels", async () => {
    const client = getClient(userOne.token)
    const { data } = await client.query({ query: GET_LABELS })
    expect(data.labels.length).toBe(2);
  });

  test("Should not expose labels for unauthorized user", async () => {
    await expect(
      client.query({ query: GET_LABELS })
    ).rejects.toThrow();
  });

  test("Should get label by associated id", async () => {
    const client = getClient(userOne.token);
    const { data } = await client.query({
      query: GET_LABEL,
      variables: { id: labelOne.data?.id }
    })
    expect(data.label.title).toBe(labelOne.data?.title);
  });

  test("Should not get label by unassociated id", async () => {
    const client = getClient(userOne.token);
    await expect(
      client.query({
        query: GET_LABEL,
        variables: { id: casual.uuid }
      })
    ).rejects.toThrow();
  });

  test("Should not get label by unauthorized user", async () => {
    await expect(
      client.query({
        query: GET_LABEL,
        variables: { id: labelOne.data?.id }
      })
    ).rejects.toThrow();
  });

});
