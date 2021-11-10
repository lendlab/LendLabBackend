"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_1 = require("graphql");
const resolvers_1 = require("./resolvers");
const typeorm_1 = require("typeorm");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.POSTGRE_URL,
        synchronize: true,
        logging: true,
        entities: [__dirname + "./src/entity/*.*"],
    });
    const app = (0, express_1.default)();
    const http = (0, http_1.createServer)(app);
    const schema = await resolvers_1.schemaIndex;
    const server = new apollo_server_express_1.ApolloServer({ schema, introspection: true });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
    subscriptions_transport_ws_1.SubscriptionServer.create({ schema, subscribe: graphql_1.subscribe, execute: graphql_1.execute }, { server: http, path: server.graphqlPath });
    http.listen({ port: process.env.PORT || 4000 }, () => {
        console.log(`server running on http://localhost:4000${server.graphqlPath}🚀`);
        console.log(`websocket server running on ws://localhost:4000${server.graphqlPath}🚀 `);
    });
};
main();
//# sourceMappingURL=index.js.map