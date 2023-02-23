//TypeDefs & Resolvers
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");

//Apollo GraphQL Schema
const schema = {
  typeDefs,
  resolvers,
  context: (ctx) => {
    return ctx
  },
};

module.exports = schema;