import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Assists} from "./assists.entity";
import {Meeting} from "./meeting.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  ci: number;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;

  @Field()
  @Column({unique: true})
  email: string;

  @OneToMany(() => Assists, (assists) => assists.user)
  assists: Promise<Assists>;

  @OneToMany(() => Meeting, (meeting) => meeting.user)
  meeting: Promise<Meeting>;
}
