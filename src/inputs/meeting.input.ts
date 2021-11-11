import {Field, InputType} from "type-graphql";

@InputType()
class MeetingCreator {
  @Field()
  ci?: number;
}

@InputType()
export class MeetingInput {
  @Field()
  meeting_title: string;

  @Field(() => MeetingCreator)
  user: MeetingCreator;

  @Field()
  meeting_description: string;

  @Field(() => String)
  meeting_duration: Date;

  @Field(() => String)
  create_at: Date;
}
