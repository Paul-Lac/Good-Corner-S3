import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id?: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  price?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picture?: string;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field((type) => Category)
  category?: Category;

  constructor(
    title: string = "",
    description: string | undefined = undefined,
    price?: number,
    picture?: string
  ) {
    super();

    this.title = title;
    this.description = description;
    this.price = price;
    this.picture = picture;
  }
}
