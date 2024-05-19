import { MutationResolvers } from "../../generated/graphql";
import categoryResolvers from "./category";
import labelResolvers from "./label";
import ticketResolvers from "./ticket";
import userResolvers from "./user";

const Mutation: MutationResolvers = {
  ...userResolvers,
  ...categoryResolvers,
  ...labelResolvers,
  ...ticketResolvers,
}

export default Mutation;