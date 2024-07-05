import "reflect-metadata";
import fs from "node:fs";
import { ApolloServer } from "@apollo/server";
import { dataSource, initTestData, cleanDB } from "./datasource";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdQueries } from "./graphql-resolvers/AdQueries";
import { CategoryQueries } from "./graphql-resolvers/CategoryQueries";
import { AdMutations } from "./graphql-resolvers/AdMutations";

const port = 4000;

async function startServerApollo() {
  //BuildSchema de type-graphql
  const schema = await buildSchema({
    resolvers: [AdQueries, AdMutations, CategoryQueries],
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();
  // Clean the database and initialize test data
  await cleanDB();
  await initTestData();

  const { url } = await startStandaloneServer(server, { listen: { port } });

  console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();
