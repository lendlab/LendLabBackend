import {Field, InputType} from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  ci: number;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
export class CiPasswordInput {
  @Field()
  ci: number;

  @Field()
  password: string;
}
