import {Query, Resolver} from "type-graphql";
import {User} from "../../entity/user.entity";

@Resolver()
export class UserQuery {
  @Query(() => [User])
  async getUsers() {
    return User.find();
  }
}
