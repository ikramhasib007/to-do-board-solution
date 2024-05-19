import { QueryResolvers } from "../../generated/graphql";
import userQueryResolvers from "./user";

const Query: QueryResolvers = {
  ...userQueryResolvers
}

export default Query;