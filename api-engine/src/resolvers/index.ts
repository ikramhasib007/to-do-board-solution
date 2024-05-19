import Query from './queries';
import Mutation from './mutations';
import Context from "../context";
import { Resolvers } from "../generated/graphql";

export const resolvers: Resolvers<Context> = {
  Query,
  Mutation,
}