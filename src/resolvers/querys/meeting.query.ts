import {Query, Resolver} from "type-graphql";
import {Meeting} from "../../entity/meeting.entity";

@Resolver()
export class MeetingQuery {
  @Query(() => [Meeting], {nullable: true})
  async getMeetings() {
    return Meeting.find();
  }
}
