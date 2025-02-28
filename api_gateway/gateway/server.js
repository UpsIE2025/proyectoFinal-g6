const { ApolloServer } = require("apollo-server");
const { readFileSync } = require("fs");
const { join } = require("path");
const { gql } = require("graphql-tag");
const resolvers = require("./resolvers");

// Cargar el esquema desde el archivo schema.graphql
const typeDefs = gql(readFileSync(join(__dirname, "schema.graphql"), "utf-8"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL listo en ${url}`);
});
