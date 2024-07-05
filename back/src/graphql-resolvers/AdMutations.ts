import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { EntityManager, In } from "typeorm";
import { dataSource } from "../datasource";
import { Category } from "../entities/Category";

@InputType({
  description: "Provide either category id or name in order to create",
})
export class CategoryInput {
  @Field((_) => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  category!: CategoryInput;
}

@Resolver(Ad)
export class AdMutations {
  // indique que cette méthode est une mutation GraphQL retournant un objet Ad.
  @Mutation((_) => Ad)
  // indique que cette méthode prend un argument nommé adData de type AdInput.
  async publishAd(@Arg("adData") adData: AdInput): Promise<Ad> {
    return dataSource.transaction(async (entityManager: EntityManager) => {
      let category: Category | null = null;

      if (adData.category.id) {
        category = await entityManager.findOneBy(Category, {
          id: adData.category.id,
        });
      }

      if (category == null && adData.category.name) {
        category = new Category(adData.category.name);
        await entityManager.save(category);
      }

      if (category == null) {
        throw new Error(
          "missing category - params were " + JSON.stringify(adData.category)
        );
      }

      try {
        const ad = new Ad(
          adData.title,
          adData.description,
          adData.price,
          adData.picture
        );

        console.log("will save ", ad);

        if (category) {
          ad.category = category;
        }

        await entityManager.save(ad);

        console.log("saved ", ad);
        return ad;
      } catch (e) {
        console.error("create ad failed", e);
        throw new Error("cannot create ad - " + e);
      }
    });
  }
}
