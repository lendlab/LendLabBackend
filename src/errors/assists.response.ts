import {Field, ObjectType} from "type-graphql";
import {Assists} from "../entity/assists.entity";

@ObjectType()
class AssistsErrors {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class AssistsResponse {
  @Field(() => [AssistsErrors], {nullable: true})
  errors?: AssistsErrors[];

  @Field(() => Assists, {nullable: true})
  assists?: Assists;
}
