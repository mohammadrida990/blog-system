"use server";

import { print } from "graphql";

import { fetchAuthGraphQl } from "../fetchGraphQl";
import { LIKE_POST, UN_LIKE_POST, USER_LIKE_POST } from "../gqlQuaries";

type Payload = {
  postId: number;
  userId?: number;
};

export const userLikePostActions = async ({ postId }: Payload) => {
  const data = await fetchAuthGraphQl(print(USER_LIKE_POST), {
    postId,
  });

  return {
    likeCount: data.postLikeCount as number,
    userLikePost: data.userLikePost as boolean,
  };
};

export const likePostActions = async ({ postId }: Payload) => {
  const data = await fetchAuthGraphQl(print(LIKE_POST), {
    postId,
  });

  return {
    likeCount: data.postLikeCount as number,
    userLikePost: data.userLikePost as boolean,
  };
};

export const unLikePostActions = async ({ postId }: Payload) => {
  const data = await fetchAuthGraphQl(print(UN_LIKE_POST), {
    postId,
  });

  return {
    likeCount: data.postLikeCount as number,
    userLikePost: data.userLikePost as boolean,
  };
};
