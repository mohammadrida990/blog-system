"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};
const SharedForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state?.message) {
      toast(`${state?.success ? "Success" : "Error"}`, {
        description: state?.message,
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-8 [&>div>input]:transition [&>div>textarea]:transition"
    >
      {state?.data?.postId && (
        <input hidden name="postId" defaultValue={state?.data?.postId} />
      )}
      <div>
        <Label
          htmlFor="title"
          className="text-xs text-primary dark:text-gray-900"
        >
          Title
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a title"
          defaultValue={state?.data?.title}
          className="
            text-wrap text-primary dark:text-gray-900 border-primary focus-visible:ring-0 
            focus-visible:shadow-primary  shadow-sm focus-visible:border-primary
          "
        />
        {!!state?.errors?.title && (
          <p className="text-xs text-red-500 animate-shake">
            {state.errors.title}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="content"
          className="text-xs text-primary dark:text-gray-900"
        >
          Enter post content
        </Label>
        <Textarea
          id="content"
          name="content"
          rows={6}
          defaultValue={state?.data?.content}
          className="
            text-wrap text-primary dark:text-gray-900 border-primary focus-visible:ring-0 
            focus-visible:shadow-primary shadow-sm focus-visible:border-primary
          "
        />
        {!!state?.errors?.content && (
          <p className="text-xs text-red-500 animate-shake">
            {state.errors.content}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="thumbnail"
          className="text-xs text-primary dark:text-gray-900"
        />
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          className="
            text-wrap text-primary w-full md:w-fit dark:text-gray-900 border-primary focus-visible:ring-0 
            focus-visible:shadow-primary  shadow-sm focus-visible:border-primary
          "
          onChange={(e) => {
            if (e.target?.files?.[0]) {
              setImageUrl(URL.createObjectURL(e.target.files[0]));
            } else {
              setImageUrl(null);
            }
          }}
        />

        {!!state?.errors?.thumbnail && (
          <p className="text-xs text-red-500 animate-shake">
            {state.errors.thumbnail}
          </p>
        )}

        {(!!imageUrl || state?.data?.prevThumbnail) && (
          <Image
            src={imageUrl || state?.data?.prevThumbnail || ""}
            alt=""
            sizes=""
            width={200}
            height={150}
            className="mt-5"
          />
        )}
      </div>

      <div>
        <Label
          htmlFor="tags"
          className="text-xs text-primary dark:text-gray-900"
        >
          Tags (separated by comma)
        </Label>
        <Input
          id="tags"
          name="tags"
          placeholder="Enter tags (separated by comma)"
          defaultValue={state?.data?.tags}
          className="
            text-wrap text-primary dark:text-gray-900 border-primary focus-visible:ring-0 
            focus-visible:shadow-primary  shadow-sm focus-visible:border-primary
          "
        />
        {!!state?.errors?.tags && (
          <p className="text-xs text-red-500 animate-shake">
            {state.errors.tags}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={state?.data?.published ?? false}
        />
        <Label
          htmlFor="published"
          className="
            text-wrap text-primary dark:text-gray-900 border-primary focus-visible:ring-0 
            focus-visible:shadow-primary focus-visible:border-primary
          "
        >
          Published
        </Label>
        {!!state?.errors?.isPublished && (
          <p className="text-xs text-red-500 animate-shake">
            {state.errors.isPublished}
          </p>
        )}
      </div>

      <SubmitButton>
        <span>Save</span>
      </SubmitButton>
    </form>
  );
};

export default SharedForm;
