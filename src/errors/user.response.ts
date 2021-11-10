import {User} from "../entity/user.entity";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
class UserErrors {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [UserErrors], {nullable: true})
  errors?: UserErrors[];

  @Field(() => User, {nullable: true})
  user?: User;
}
