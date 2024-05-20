import { createPubSub } from 'graphql-yoga';
import {
  BillingSubscriptionPayload,
  CustomerSubscriptionPayload,
  EnrollSubscriptionPayload,
  OrderSubscriptionPayload,
  ShopSubscriptionPayload,
  UserSubscriptionPayload,
} from './generated/graphql';

// user: UserSubscriptionPayload
// customer: CustomerSubscriptionPayload
// enroll: EnrollSubscriptionPayload
// shop: ShopSubscriptionPayload
// billing(userId: ID!): BillingSubscriptionPayload
// order: OrderSubscriptionPayload

export type PubSubChannels = {
  user: [UserSubscriptionPayload];
  customer: [CustomerSubscriptionPayload];
  enroll: [EnrollSubscriptionPayload];
  shop: [ShopSubscriptionPayload];
  billing: [userId: string, payload: BillingSubscriptionPayload];
  order: [OrderSubscriptionPayload];
};

export const pubSub = createPubSub<PubSubChannels>();
