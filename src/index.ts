import "reflect-metadata";
import "dotenv/config";
import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {subscribe, execute} from "graphql";
import {schemaIndex} from "./resolvers";

import {connection} from "./connection";

const main = async () => {
  await connection();

  const app = express();

  const http = createServer(app);

  const schema = await schemaIndex;

  const server = new ApolloServer({schema, introspection: true});

  await server.start();

  server.applyMiddleware({app, path: "/graphql"});

  SubscriptionServer.create(
    {schema, subscribe, execute},
    {server: http, path: server.graphqlPath}
  );

  http.listen({port: process.env.PORT || 4000}, () => {
    console.log(
      `server running on http://localhost:4000${server.graphqlPath}🚀`
    );
    console.log(
      `websocket server running on ws://localhost:4000${server.graphqlPath}🚀 `
    );
  });
};

main();
