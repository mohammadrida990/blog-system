"use server";
import { fetchAuthGraphQl, fetchGraphQl } from "../fetchGraphQl";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  FETCH_USER_POSTS,
  GET_POST_BY_ID,
  GET_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQuaries";
import { print } from "graphql";
import { Post } from "../types/modelTypes";
import { transformSkipAndTake } from "../helpers";
import { CreateUpdateFormSchema } from "../zodSchemas/CreateUpdateFormSchema";
import { PostFormState } from "../types/formState";
import { uploadFile } from "../upload";
import { redirect } from "next/navigation";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformSkipAndTake({ page, pageSize });
  const data = await fetchGraphQl(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQl(print(GET_POST_BY_ID), { id });
  return data.getPostById as Post;
};

export const fetchUserPosts = async () => {
  const data = await fetchAuthGraphQl(print(FETCH_USER_POSTS));

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.getPostsCount as number,
  };
};

export const createPost = async (
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> => {
  const validationFields = CreateUpdateFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFields.success)
    return {
      errors: validationFields.error.flatten().fieldErrors,
      data: Object.fromEntries(formData.entries()),
    };

  let thumbnail = "";
  if (validationFields.data.thumbnail?.name !== "undefined") {
    thumbnail = await uploadFile(validationFields.data.thumbnail!);
  }

  const data = await fetchAuthGraphQl(print(CREATE_POST_MUTATION), {
    input: { ...validationFields.data, thumbnail },
  });

  if (data)
    return {
      message: "Post created successfully",
      success: true,
    };

  return {
    message: "Post did't created",
    success: false,
    data: Object.fromEntries(formData.entries()),
  };
};

export const updatePost = async (
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> => {
  const validationFields = CreateUpdateFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validationFields.error.flatten().fieldErrors,
    };

  const { thumbnail, ...inputs } = validationFields.data;

  let thumbnailUrl = "";
  if (thumbnail?.name !== "undefined") {
    thumbnailUrl = await uploadFile(validationFields.data.thumbnail!);
  }

  const data = await fetchAuthGraphQl(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data)
    return {
      message: "post updated successfully",
      data: Object.fromEntries(formData.entries()),
      success: true,
    };

  return {
    data: Object.fromEntries(formData.entries()),
    message: "post didit updated",
    success: false,
  };
};

export const deletePost = async (postId: number) => {
  const data = await fetchAuthGraphQl(print(DELETE_POST_MUTATION), {
    postId,
  });

  redirect("/user/posts");

  return data.deletePost;
};
