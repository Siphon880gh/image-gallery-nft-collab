const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reprints: [Reprint]
    reprintCount: Int
    favorites: [Reprint]
    favoriteCount: Int
    followers: [User]
    followerCount: Int
    followed: [User]
    followedCount: Int
  }

  type Reprint {
    _id: ID
    title: String
    asset: String
    author: String
    caption: String
    marketListing: String
    createdAt: String
    likes: [User]
    likeCount: Int
    comments: [Comment]
    commentCount: Int
  }

  type Comment {
    _id: ID
    commentBody: String
    author: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    author(username: String!): User
    usersByFilter(username: String!): [User]
    userById(_id: ID!): User
    stream: [Reprint]
    reprint(title: String!): Reprint
    findFavorite(_id: ID!): Reprint
    myFavorites: User
    reprintById(_id: ID!): Reprint
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addReprint(title: String!, asset: String!, caption: String, marketListing: String!): Reprint
    deleteReprint(reprintId: ID!): Reprint
    addComment(reprintId: ID!, commentBody: String!): Reprint
    deleteComment(reprintId: ID!, commentId: ID!): Reprint
    follow(followedId: ID!): User
    unfollow(followedId: ID!): User
    like(reprintId: ID!): Reprint
    unlike(reprintId: ID!): Reprint
    favorite(reprintId: ID!): User
    unfavorite(reprintId: ID!): User
    deleteUser(username: String!): User
    deleteUserV2: User
  }
`;

module.exports = typeDefs;
