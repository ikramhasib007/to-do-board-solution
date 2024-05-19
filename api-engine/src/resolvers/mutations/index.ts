import { MutationResolvers } from "../../generated/graphql";
import userResolvers from "./user";

const Mutation: MutationResolvers = {
  ...userResolvers
}

export default Mutation;