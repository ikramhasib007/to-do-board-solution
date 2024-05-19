import { QueryResolvers } from "../../generated/graphql";
import categoryQueryResolvers from "./category";
import userQueryResolvers from "./user";

const Query: QueryResolvers = {
  ...userQueryResolvers,
  ...categoryQueryResolvers
}

export default Query;