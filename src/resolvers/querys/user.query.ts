import {MyContext} from "../../types/MyContext";
import {Ctx, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

import {User} from "../../entity/user.entity";

@Resolver()
export class UserQuery {
  @Query(() => [User])
  async getUsers() {
    return User.find();
  }

  @Query(() => User, {nullable: true})
  async me(@Ctx() {req}: MyContext) {
    if (!req.session.ci) {
      return null;
    }

    const ci = req.session.ci;

    const user = getRepository(User)
      .createQueryBuilder("user")
      .where(`user.ci = ${ci}`)
      .getOne();

    return user;
  }
}
