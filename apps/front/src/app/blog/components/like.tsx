"use client";

import {
  likePostActions,
  unLikePostActions,
  userLikePostActions,
} from "@/lib/actions/likeActions";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HeartIcon as FilledHeart } from "@heroicons/react/16/solid";
import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";

type Props = {
  postId: number;
  userId?: string;
};
const Like = ({ postId }: Props) => {
  const { data, refetch } = useQuery({
    queryKey: ["USER_LIKE_POST", postId],
    queryFn: async () => await userLikePostActions({ postId }),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePostActions({ postId }),
    onSuccess: () => refetch(),
  });

  const unLikeMutation = useMutation({
    mutationFn: () => unLikePostActions({ postId }),
    onSuccess: () => refetch(),
  });

  return (
    <div className="flex justify-start items-center gap-3">
      {data?.userLikePost ? (
        <FilledHeart
          onClick={() => unLikeMutation.mutate()}
          className="w-6 text-red-500"
        />
      ) : (
        <EmptyHeart onClick={() => likeMutation.mutate()} className="w-6" />
      )}

      <span className="text-primary font-bold">{data?.likeCount}</span>
    </div>
  );
};

export default Like;
