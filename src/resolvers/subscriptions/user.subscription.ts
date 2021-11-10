import {Resolver, Root, Subscription} from "type-graphql";
import {User} from "../../entity/user.entity";

@Resolver()
export class UserSubscription {
  @Subscription({topics: "CREATE_USER"})
  newUserSubscription(@Root() payload: User): User {
    return payload;
  }
}
