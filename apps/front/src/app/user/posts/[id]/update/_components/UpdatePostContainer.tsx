"use client";

import { useActionState } from "react";
import { updatePost } from "@/lib/actions/postAction";
import SharedForm from "@/app/user/create-post/_components/SharedForm";
import { Post } from "@/lib/types/modelTypes";

type Props = {
  post: Post;
};
const UpdatePostContainer = ({ post }: Props) => {
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ?? false,
      tags: post.tags?.map((tag) => tag.name).join(", ") || "",
      prevThumbnail: post.thumbnail || undefined,
    },
  });

  return <SharedForm state={state} formAction={action} />;
};

export default UpdatePostContainer;
