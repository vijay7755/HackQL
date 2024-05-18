import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { schema } from "./schema";
import { context } from "./context";

console.log("schema")
// console.log(schema)
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()], 
});

const port = process.env.PORT || 3000;  

server.listen({ port }).then(({ url }) => {
  console.log(`server ready at ${url}`);
});
