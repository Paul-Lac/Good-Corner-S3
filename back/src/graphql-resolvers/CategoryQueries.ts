import { Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { dataSource } from "../datasource";

@Resolver(Category)
export class CategoryQueries {
  @Query((type) => [Category])
  async getAllCategories(): Promise<Category[]> {
    console.log("getAllCategrories Query called from graphql");
    const categories: Category[] = await dataSource.manager.find(Category);
    return categories;
  }
}
