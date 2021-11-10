import {Resolver, Root, Subscription} from "type-graphql";
import {Meeting} from "../../entity/meeting.entity";

@Resolver()
export class MeetingSubscription {
  @Subscription({topics: "CREATE_MEETING"})
  newMeetingSubscription(@Root() payload: Meeting): Meeting {
    return payload;
  }
}
