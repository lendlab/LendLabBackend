import {Arg, Mutation, PubSub, PubSubEngine, Resolver} from "type-graphql";

import {AssistsResponse} from "../../errors/assists.response";
import {Assists} from "../../entity/assists.entity";
import {AssistsInput} from "../../inputs/assists.input";

@Resolver()
export class AssistsMutation {
  @Mutation(() => AssistsResponse, {nullable: true})
  async createInvitation(
    @Arg("options", () => AssistsInput) options: AssistsInput,
    @PubSub() pubsub: PubSubEngine
  ): Promise<AssistsResponse> {
    const assists = await Assists.create({...options}).save();
    pubsub.publish("NEW_INVITATION", assists);

    return {assists};
  }
}
