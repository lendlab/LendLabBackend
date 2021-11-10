import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Entity, ManyToOne} from "typeorm";
import {User} from "./user.entity";
import {Meeting} from "./meeting.entity";

@ObjectType()
@Entity()
export class Assists extends BaseEntity {
  @Field(() => Meeting, {nullable: true})
  @ManyToOne(() => Meeting, (metting) => metting.assists, {
    primary: true,
    onDelete: "CASCADE",
  })
  meeting: Meeting;

  @Field(() => User, {nullable: true})
  @ManyToOne(() => User, (user) => user.assists, {
    primary: true,
    onDelete: "CASCADE",
  })
  user: User;
}
