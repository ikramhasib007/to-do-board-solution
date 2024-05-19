import { MutationResolvers } from "../../generated/graphql";
import categoryResolvers from "./category";
import labelResolvers from "./label";
import userResolvers from "./user";

const Mutation: MutationResolvers = {
  ...userResolvers,
  ...categoryResolvers,
  ...labelResolvers,
}

export default Mutation;