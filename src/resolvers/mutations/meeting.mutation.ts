import {Arg, Int, Mutation, Resolver} from "type-graphql";

import {Meeting} from "../../entity/meeting.entity";
import {MeetingResponse} from "../../errors/meeting.response";
import {MeetingInput} from "../../inputs/meeting.input";

@Resolver()
export class MeetingMutation {
  @Mutation(() => MeetingResponse, {nullable: true})
  async createMeeting(
    @Arg("options", () => MeetingInput) options: MeetingInput
  ): Promise<MeetingResponse> {
    const meeting = await Meeting.create({...options}).save();

    return {meeting};
  }

  @Mutation(() => Boolean)
  async deleteMeeting(@Arg("meeting_id", () => Int) meeting_id: number) {
    await Meeting.delete({meeting_id});

    return true;
  }
}
