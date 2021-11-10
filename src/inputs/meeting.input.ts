import {Field, InputType} from "type-graphql";

@InputType()
export class MeetingInput {
  @Field()
  meeting_title: string;

  @Field()
  meeting_description: string;

  @Field(() => String)
  meeting_duration: Date;

  @Field(() => String)
  create_at: Date;
}
