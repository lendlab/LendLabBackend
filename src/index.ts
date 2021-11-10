import "reflect-metadata";
import "dotenv/config";
import {ApolloServer} from "apollo-server-express";
import express from "express";
import {createServer} from "http";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {subscribe, execute} from "graphql";
import cors from "cors";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import {schemaIndex} from "./resolvers";
import {connection} from "./connection";

const main = async () => {
  await connection();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:4000/graphql",
        "http://localhost:3000",
      ],
    })
  );

  app.set("trust proxy", true);

  const http = createServer(app);

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
      saveUninitialized: false,
      secret: "qiwroasdjlasddde",
      resave: false,
    })
  );

  redisClient.on("error", function (error) {
    console.error(error);
  });

  const schema = await schemaIndex;

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({req, res}) => ({
      req,
      res,
      redis,
    }),
  });

  await server.start();

  server.applyMiddleware({app, path: "/graphql", cors: false});

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
