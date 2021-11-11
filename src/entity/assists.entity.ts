import {Field, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "./user.entity";
import {Meeting} from "./meeting.entity";

@ObjectType()
@Entity()
export class Assists extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  assits_id: number;

  @Field(() => Meeting, {nullable: true})
  @ManyToOne(() => Meeting, (metting) => metting.assists, {
    onDelete: "CASCADE",
  })
  meeting: Meeting;

  @Field(() => User, {nullable: true})
  @ManyToOne(() => User, (user) => user.assists, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => Boolean)
  @Column({default: 0})
  accepted?: boolean;
}
