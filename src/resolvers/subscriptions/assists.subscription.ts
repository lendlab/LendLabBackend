import {Assists} from "../../entity/assists.entity";
import {Resolver, Root, Subscription} from "type-graphql";

@Resolver()
export class AssistsSubscription {
  @Subscription({topics: "NEW_INVITATION"})
  newInvitationSubscription(@Root() payload: Assists): Assists {
    return payload;
  }
}
