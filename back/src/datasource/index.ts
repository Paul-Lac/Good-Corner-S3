import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db/good_corner.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: "all",
});

export async function cleanDB() {
  await dataSource.manager.clear(Ad);
  await dataSource.manager.clear(Category);
}

async function createAndPersistAd(
  title: string,
  description: string | undefined,
  price: number,
  pictureUrl: string | undefined,
  category: Category
) {
  const ad = new Ad(title, description, price, pictureUrl);
  ad.category = category;
  await dataSource.manager.save(ad);
}

export async function initTestData() {
  const category1 = new Category("Meubles");
  await dataSource.manager.save(category1);

  const category2 = new Category("Bolides");
  await dataSource.manager.save(category2);

  const category3 = new Category("Autres");
  await dataSource.manager.save(category3);

  await createAndPersistAd(
    "Armoire normande",
    "Très beau meuble d'époque",
    300,
    undefined,
    category1
  );

  await createAndPersistAd(
    "Roller",
    "Ils sont beaux mes rollers",
    22,
    undefined,
    category2
  );

  await createAndPersistAd(
    "Table de jardin",
    "Belle table",
    110,
    undefined,
    category1
  );

  await createAndPersistAd(
    "Bougie",
    "Elle éclaire parfaitement",
    20,
    undefined,
    category3
  );

  await createAndPersistAd(
    "Dame-Jeanne",
    "DescriptionDame-Jeanne",
    70,
    undefined,
    category3
  );

  await createAndPersistAd(
    "Porte-magazine",
    "Il est beau mon porte-magazine",
    40,
    undefined,
    category3
  );
}
