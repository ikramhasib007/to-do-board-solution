import { MutationResolvers } from "../../generated/graphql";
import categoryResolvers from "./category";
import userResolvers from "./user";

const Mutation: MutationResolvers = {
  ...userResolvers,
  ...categoryResolvers,
}

export default Mutation;