import {buildSchema, NonEmptyArray} from "type-graphql";
//querys
import {HelloResolver} from "./querys/hello";
//mutations
import {UserMutations} from "./mutations/user.mutation";
import {MeetingMutation} from "./mutations/meeting.mutation";
import {MeetingQuery} from "./querys/meeting.query";
import {AssistsMutation} from "./mutations/assists.mutation";
import {AssistsQuery} from "./querys/assissts.query";
import {UserQuery} from "./querys/user.query";
//subscriptions

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
] as const;

export const schemaIndex = buildSchema({
  resolvers: resolverArray as NonEmptyArray<Function>,
});
