import {Field, ObjectType} from "type-graphql";
import {Meeting} from "../entity/meeting.entity";

@ObjectType()
class MeetingErrors {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class MeetingResponse {
  @Field(() => [MeetingErrors], {nullable: true})
  errors?: MeetingErrors[];

  @Field(() => Meeting, {nullable: true})
  meeting: Meeting;
}
