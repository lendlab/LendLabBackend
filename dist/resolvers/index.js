"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaIndex = void 0;
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./querys/hello");
const resolverArray = [hello_1.HelloResolver];
exports.schemaIndex = (0, type_graphql_1.buildSchema)({
    resolvers: resolverArray,
});
//# sourceMappingURL=index.js.map