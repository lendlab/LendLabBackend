import {Field, InputType} from "type-graphql";

@InputType()
class User_CI {
  @Field()
  ci: number;
}

@InputType()
class Meeting_Id {
  @Field()
  meeting_id: number;
}

@InputType()
export class AssistsInput {
  @Field(() => Meeting_Id)
  meeting: Meeting_Id;

  @Field(() => User_CI)
  user: User_CI;
}


@InputType()
export class Accept {
  @Field(() => Meeting_Id,{nullable: true})
  meeting: Meeting_Id;

  @Field(() => User_CI,{nullable: true})
  user: User_CI;

  @Field(() =>Boolean)
  accepted: boolean
}