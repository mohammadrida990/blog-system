"use client";

import React, { useState } from "react";
import { postCommentActions } from "@/lib/actions/commentActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";
import CommentCard from "./CommentCard";
import CommentPagination from "./commentPagination";
import { SkeletonLoaders } from "./SkelatonLoaders";
import AddComment from "./AddComment";
import { SessionUser } from "@/lib/session";

type Props = {
  postId: number;
  user?: SessionUser;
};
const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await postCommentActions({
        postId,
        take: DEFAULT_PAGE_SIZE,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);

  return (
    <>
      <div className="px-4 mt-4 rounded-md shadow-md shadow-white bg-foreground py-5">
        <h6 className="text-xl text-primary font-bold mb-4">Comments</h6>

        {!!user && (
          <AddComment
            postId={postId}
            user={user!}
            className="my-3"
            refetch={refetch}
          />
        )}

        <div className="flex flex-col gap-5 mt-5">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <SkeletonLoaders key={index} />
              ))
            : data?.comments.map((cmt) => (
                <CommentCard key={cmt.id} comment={cmt} />
              ))}
        </div>
      </div>

      {data?.comments && data?.comments.length > 0 && (
        <CommentPagination
          currentPage={page}
          setCurrentPage={(p) => setPage(p)}
          totalPages={totalPages}
          className="flex text-center justify-center items-center mt-4 gap-1"
        />
      )}
    </>
  );
};

export default Comments;
