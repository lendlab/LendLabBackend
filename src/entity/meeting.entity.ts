import {Field, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Assists} from "./assists.entity";

@ObjectType()
@Entity()
export class Meeting extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  meeting_id: number;

  @Field()
  @Column()
  meeting_title: string;

  @Field()
  @Column()
  meeting_description: string;

  @Field(() => String)
  @Column({type: "time"})
  meeting_duration: Date;

  @Field(() => Date)
  @CreateDateColumn()
  create_at: Date;

  @OneToMany(() => Assists, (assists) => assists.meeting)
  assists: Promise<Assists>;
}
