import gql from 'graphql-tag';
//confirmed working 
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
//confirmed working
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
//confirmed working 
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

//export const DELETE_COMMENT = gql``;
export const DELETE_COMMENT = gql`
  mutation deleteComment($reprintId: ID! $commentId: ID!) {
    deleteComment(reprintId: $reprintId, commentId: $commentId) {
      comments {
        _id
        commentBody
        author
        createdAt
      }
    }
  }
`;

//export const ADD_REPRINT = gql``;
export const ADD_REPRINT = gql`
  mutation addReprint($title: String!, $asset: String!, $caption: String, $marketListing: String!) {
    addReprint(title: $title, asset: $asset, caption: $caption, marketListing: $marketListing ) {
      _id
      title
      asset
      author
      caption
      marketListing
      createdAt
      likes{
        _id
      }
      likeCount
      comments {
        _id
        commentBody
        author
        createdAt
      }
      commentCount
    }
  }
`;

//export const DELETE_REPRINT = gql``;
export const DELETE_REPRINT = gql`
  mutation deleteReprint($reprintId: ID!) {
    deleteReprint(reprintId: $reprintId) {
      title
    }
  }
`;

//export const FOLLOW = gql``;
export const FOLLOW = gql`
  mutation follow($followedId: ID!) {
    follow(followedId: $followedId) {
      username
      followed {
        _id
      }
    followerCount
  }
}
`;

//export const UNFOLLOW = gql``;
export const UNFOLLOW = gql`
  mutation unfollow($followedId: ID!) {
    unfollow(followedId: $followedId) {
      username
      followed {
        _id
      }
    followerCount
  }
}
`;

//export const LIKE = gql``;
export const LIKE = gql`
  mutation like($reprintId: ID!) {
    like(reprintId: $reprintId) {
      likeCount
      likes {
        _id
      }
    }
  }
`;

//export const UNLIKE = gql``;
export const UNLIKE = gql`
  mutation unlike($reprintId: ID!) {
    unlike(reprintId: $reprintId) {
      likeCount
      likes {
        _id
      }
    }
  }
`;

export const FAVORITE = gql`
mutation favorite($reprintId: ID!) {
  favorite(reprintId: $reprintId) {
    username
    favoriteCount
    favorites{
        _id
    }
  }
}
`;

export const UNFAVORITE = gql`
mutation unfavorite($reprintId: ID!) {
  unfavorite(reprintId: $reprintId) {
    username
    favoriteCount
    favorites{
        _id
    }
  }
}
`;
