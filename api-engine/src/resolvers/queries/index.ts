import { QueryResolvers } from "../../generated/graphql";
import categoryQueryResolvers from "./category";
import labelQueryResolvers from "./label";
import ticketQueryResolvers from "./ticket";
import userQueryResolvers from "./user";

const Query: QueryResolvers = {
  ...userQueryResolvers,
  ...categoryQueryResolvers,
  ...labelQueryResolvers,
  ...ticketQueryResolvers,
}

export default Query;