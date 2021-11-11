import {Ctx, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

import {Assists} from "../../entity/assists.entity";
import {MyContext} from "../../types/MyContext";

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

  @Query(() => [Assists], {nullable: true})
  async getAceptedInvitations() {
    const invitations = getRepository(Assists)
      .createQueryBuilder("assists")
      .innerJoinAndSelect("assists.user", "user")
      .innerJoinAndSelect("assists.meeting", "meeting")
      .where("assists.accepted = true")
      .getMany();

    return invitations;
  }

  @Query(() => [Assists], {nullable: true})
  async getPendingInvitations() {
    const invitations = getRepository(Assists)
      .createQueryBuilder("assists")
      .innerJoinAndSelect("assists.user", "user")
      .innerJoinAndSelect("assists.meeting", "meeting")
      .where("assists.accepted = false")
      .getMany();

    return invitations;
  }

  @Query(() => [Assists], {nullable: true})
  async getMyInvitations(@Ctx() {req}: MyContext) {
    const invitations = getRepository(Assists)
      .createQueryBuilder("assists")
      .innerJoinAndSelect("assists.user", "user")
      .innerJoinAndSelect("assists.meeting", "meeting")
      .where(`user.ci = ${req.session.ci}`)
      .getMany();

    if (!invitations) {
      return null;
    }

    return invitations;
  }
}
