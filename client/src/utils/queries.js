import gql from 'graphql-tag';

// TODO: Add more graphQL executions on the client UI side. 
// Try the query/mutations at http://localhost:3001/graphql before adding them here.

export const TRENDING_REPRINTS = gql`
query {
  trending {
    _id
    asset
  }
}`;

export const GET_ME = gql`
query {
  me {
    _id
    username
    email
    reprints {
      _id
    title
    asset
    author
    caption
    marketListing
    createdAt
    likes {
      _id
    }
    likeCount
    comments{
      _id
    commentBody
    author
    createdAt
    }
    commentCount
    }
    reprintCount
    favorites {
        _id
    title
    asset
    author
    commentCount
    likeCount
    }
    favoriteCount
    followers{
      _id
      username
    }
    followerCount
    followed{
      _id
      username
    }
    followedCount
  }
}`;

export const GET_USER = gql`
query author($username: String!) {
  author(username: $username) {
    _id
    username
    email
    reprints {
      _id
    title
    asset
    author
    caption
    marketListing
    createdAt
    likes {
      _id
    }
    likeCount
    comments{
      _id
    commentBody
    author
    createdAt
    }
    commentCount
    }
    reprintCount
    favorites {
      _id
    }
    favoriteCount
    followers{
      _id
      username
    }
    followerCount
    followed{
      _id
      username
    }
    followedCount
  }

  }`

  export const GET_USER_BY_FILTER = gql`
query getUserByFilter($username: String!) {
  getUserByFilter(username: $username) {
    _id
    username
    email
    reprints {
      _id
    title
    asset
    author
    caption
    marketListing
    createdAt
    likes {
      _id
    }
    likeCount
    comments{
      _id
    commentBody
    author
    createdAt
    }
    commentCount
    }
    reprintCount

    followers{
      _id
      username
    }
    followerCount
    followed{
      _id
      username
    }
    followedCount
  }

  }`

export const GET_STREAM = gql`
query {
  stream {
    _id
    title
    asset
    author
    likeCount
    commentCount 
  }
}`;

export const GET_SINGLE_CARD = gql`
query reprint($id: ID!){
  reprint(_id: $id){
    _id
    title
    asset
    author
    caption
    marketListing
    likeCount
    likes{
      _id
    }
    commentCount
    comments{
      _id
    commentBody
    author
    createdAt
    }
  }
}`;

export const GET_FAVORITES = gql`
query findFavorites($id: ID!) {
  favorites(_id: $_id) {
    _id
    title
    asset
    author
    likeCount
    commentCount
  }
}` */
