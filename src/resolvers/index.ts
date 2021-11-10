import {buildSchema, NonEmptyArray} from "type-graphql";
//querys
import {HelloResolver} from "./querys/hello";
import {AssistsQuery} from "./querys/assissts.query";
import {UserQuery} from "./querys/user.query";
import {MeetingQuery} from "./querys/meeting.query";
//mutations
import {UserMutations} from "./mutations/user.mutation";
import {MeetingMutation} from "./mutations/meeting.mutation";
import {AssistsMutation} from "./mutations/assists.mutation";
//subscriptions
import {AssistsSubscription} from "./subscriptions/assists.subscription";
import {UserSubscription} from "./subscriptions/user.subscription";
import {MeetingSubscription} from "./subscriptions/meeting.subscription";

const resolverArray = [
  HelloResolver,
  //User
  UserMutations,
  UserQuery,
  //Meeting
  MeetingMutation,
  MeetingQuery,
  //Assists
  AssistsMutation,
  AssistsQuery,
  //Subscriptions
  AssistsSubscription,
  UserSubscription,
  MeetingSubscription,
] as const;

export const schemaIndex = buildSchema({
  resolvers: resolverArray as NonEmptyArray<Function>,
});
