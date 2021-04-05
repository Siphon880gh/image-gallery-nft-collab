import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reprintId: ID!, $commentBody: String!) {
    addComment(reprintId: $reprintId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        author
      }
    }
  }
`;

/* export const ADD_REPRINT = gql``;
export const DELETE_REPRINT = gql``;
export const DELETE_COMMENT = gql``;
export const FOLLOW = gql``;
export const UNFOLLOW = gql``;
export const LIKE = gql``;
export const UNLIKE = gql``; */