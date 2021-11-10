import {Arg, Mutation, Resolver} from "type-graphql";

import {User} from "../../entity/user.entity";
import {UserInput} from "../../inputs/user.input";
import {UserResponse} from "../../errors/user.response";

@Resolver()
export class UserMutations {
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("options", () => UserInput) options: UserInput
  ): Promise<UserResponse> {
    const user = await User.create({...options}).save();

    return {user};
  }
}
