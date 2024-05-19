import { QueryResolvers } from "../../generated/graphql";
import categoryQueryResolvers from "./category";
import labelQueryResolvers from "./label";
import userQueryResolvers from "./user";

const Query: QueryResolvers = {
  ...userQueryResolvers,
  ...categoryQueryResolvers,
  ...labelQueryResolvers,
}

export default Query;