const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { MongoDB } = require('../config.js')
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
global.CronJob = require('./cron.js');

const express = require("express");

const path = require("path");
const { existsSync, mkdirSync } = require("fs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //playground: false,
  context: ({ req }) => ({ req })
});

existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"));

const app = express();
app.use("/images", express.static(path.join(__dirname, "../images")));



//The 404 Route (ALWAYS Keep this as the last route)
app.get('/images/*', function(req, res){
  res.status(404).sendFile(path.join(__dirname, "../images/forest-art.jpg"));
});

server.applyMiddleware({ app, path: '/' });

  mongoose
    .connect(MongoDB, {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 })
    .then(() => {
      console.log('MongoDB Connected');
      return app.listen({ port: 4000 });
    })
    .then((res) => {
      console.log(`Server running at ${res.url}`);
    }).catch((err) => {
      console.log(err);
    });
