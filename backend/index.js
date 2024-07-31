import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergeResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

dotenv.config();

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergeResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // More info on https://www.apollographql.com/docs/apollo-server/api/express-middleware/
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    "/",
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
    })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000`);
