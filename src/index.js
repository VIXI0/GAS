const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MongoDB } = require('../config.js')
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
global.CronJob = require('./cron.js');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  //playground: false,
  context: ({ req }) => ({ req })
});


  mongoose
    .connect(MongoDB, {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 })
    .then(() => {
      console.log('MongoDB Connected');
      return server.listen({ port: 4000 });
    })
    .then((res) => {
      console.log(`Server running at ${res.url}`);
    }).catch((err) => {
      console.log(err);
    });
