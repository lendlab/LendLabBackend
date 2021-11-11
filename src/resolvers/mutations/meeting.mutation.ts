import {Arg, Ctx, Int, Mutation, Resolver} from "type-graphql";

import {Meeting} from "../../entity/meeting.entity";
import {MeetingResponse} from "../../errors/meeting.response";
import {MeetingInput} from "../../inputs/meeting.input";
import {MyContext} from "../../types/MyContext";

@Resolver()
export class MeetingMutation {
  @Mutation(() => MeetingResponse, {nullable: true})
  async createMeeting(
    @Arg("options", () => MeetingInput) options: MeetingInput,
    @Ctx() {req}: MyContext
  ): Promise<MeetingResponse> {
    const user_ci = req.session.ci;

    console.log(user_ci);

    const meeting = await Meeting.create({
      meeting_title: options.meeting_title,
      meeting_description: options.meeting_description,
      meeting_duration: options.meeting_duration,
      create_at: options.create_at,
      user: options.user,
    }).save();

    return {meeting};
  }

  @Mutation(() => Boolean)
  async deleteMeeting(@Arg("meeting_id", () => Int) meeting_id: number) {
    await Meeting.delete({meeting_id});

    return true;
  }
}
