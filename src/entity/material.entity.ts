import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Material extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  material_id: number;

  @Field()
  @Column()
  material_name: string;

  @Field()
  @Column()
  material_description: string;

  @Field()
  @Column()
  stock: string;
}
