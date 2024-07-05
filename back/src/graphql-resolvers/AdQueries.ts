import { Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";

@Resolver(Ad)
export class AdQueries {
  @Query((type) => [Ad])
  async getAllAds(): Promise<Ad[]> {
    console.log("getAllAds Query called from graphql");
    const ads: Ad[] = await Ad.find({});
    return ads;
  }
}
