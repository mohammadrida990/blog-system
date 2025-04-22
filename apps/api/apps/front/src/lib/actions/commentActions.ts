"use server";

import { fetchAuthGraphQl, fetchGraphQl } from "../fetchGraphQl";
import { print } from "graphql";
import { CREATE_COMMENT, GET_POST_COMMENTS } from "../gqlQuaries";
import { CommentModel } from "../types/modelTypes";
import { CreateCommentState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export const postCommentActions = async ({
  postId,
  take,
  skip,
}: {
  postId: number;
  take?: number;
  skip?: number;
}) => {
  const data = await fetchGraphQl(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    count: data.postCommentsCount as number,
    comments: data.postComments as CommentModel[],
  };
};

export const createComments = async (
  state: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> => {
  const validationFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const data = await fetchAuthGraphQl(print(CREATE_COMMENT), {
    createPostComment: {
      ...validationFields.data,
    },
  });

  return { success: true, message: "Comment created.", errors: data };
};
