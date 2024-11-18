// Modules
const express = require('express');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express'); // Apollo has server and client libraries
const path = require('path');

// Server dependencies
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware, permanentlyRevoke } = require('./utils/auth');
const db = require('./config/connection');

// Server
require('dotenv').config({ path: '../.env' });
const PORT = process.env.PORT_GRAPHQL || 3001;
const app = express();

// - Apollo server library
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

// Set a custom GraphQL path for this server
// server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql-image-gallery-nft-collab' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log("MODE:" + process.env.NODE_ENV);

// Serve client/build as static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Revoke user
app.get("/revoke", (req, res)=> {
    permanentlyRevoke();
});

// Other URIs serve the frontend homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT_GRAPHQL, () => {
        console.log(`API server running on port ${PORT_GRAPHQL}!`);
        console.log(`Use GraphQL at http://localhost:${PORT_GRAPHQL}${server.graphqlPath}`);
    });
});