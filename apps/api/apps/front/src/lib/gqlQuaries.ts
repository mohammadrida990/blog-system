import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      slug
      createdAt
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      published
      author {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query postComments($postId: Int!, $take: Int, $skip: Int) {
    postComments(postId: $postId, take: $take, skip: $skip) {
      id
      createdAt
      content
      author {
        name
        avatar
      }
    }
    postCommentsCount(postId: $postId)
  }
`;

export const CREATE_COMMENT = gql`
  mutation createPostComment($createPostComment: CreateCommentInput!) {
    createPostComment(createPostComment: $createPostComment) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UN_LIKE_POST = gql`
  mutation unLikePost($postId: Int!) {
    unLikePost(postId: $postId)
  }
`;

export const USER_LIKE_POST = gql`
  query userLikePost($postId: Int!) {
    userLikePost(postId: $postId)
    postLikeCount(postId: $postId)
  }
`;

export const FETCH_USER_POSTS = gql`
  query getUserPosts {
    getUserPosts {
      id
      content
      createdAt
      published
      slug
      title
      thumbnail
      _count {
        comments
        likes
      }
    }
    getPostsCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
