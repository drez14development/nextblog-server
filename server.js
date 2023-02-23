require("dotenv").config();

//Server dependencies imports
const express = require("express");
const connectToDB = require("./config/db");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const {graphqlUploadExpress} = require('graphql-upload')

//GraphQL schema
const schema = require("./graphQL/schema");


//Create express instance
const app = express();
connectToDB();

//Apollo + Express
async function startServer() {

  const apolloServer = new ApolloServer(schema);

  await apolloServer.start();

  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });

  app.use(cors());
  app.use('/uploads', express.static('uploads'));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
startServer();