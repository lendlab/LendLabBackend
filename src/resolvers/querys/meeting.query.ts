import {Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {Meeting} from "../../entity/meeting.entity";

@Resolver()
export class MeetingQuery {
  @Query(() => [Meeting], {nullable: true})
  async getMeetings() {
    const meetings = await getRepository(Meeting)
      .createQueryBuilder("meeting")
      .innerJoinAndSelect("meeting.user", "user")
      .getMany();

    return meetings;
  }
}
