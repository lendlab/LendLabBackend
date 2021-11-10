import {Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {Assists} from "../../entity/assists.entity";

@Resolver()
export class AssistsQuery {
  @Query(() => [Assists], {nullable: true})
  async getInvitations() {
    const invitations = getRepository(Assists)
      .createQueryBuilder("assists")
      .innerJoinAndSelect("assists.user", "user")
      .innerJoinAndSelect("assists.meeting", "meeting")
      .getMany();

    return invitations;
  }
}
