import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postAction";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const DeletePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(+params.id);

  const formAction = async () => {
    "use server";
    await deletePost(+params.id);
    redirect("/user/posts");
  };

  return (
    <Card className="w-1/2 m-12 px-2 py-6 bg-stone-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-thin">
          <p className="text-red-500 text-3xl">Delete post</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </CardTitle>
      </CardHeader>

      <CardDescription className="px-6">
        <p className="text-lg font-thin text-primary dark:text-slate-900">
          This will permanently deleted
        </p>

        <hr className="m-3" />

        <p className="text-md font-medium text-primary dark:text-slate-700">
          Title of the post:
        </p>
        <p className="text-primary dark:text-slate-900 font-bold text-2xl text-wrap">
          {post.title}
        </p>
      </CardDescription>

      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant="default" asChild>
            <Link href="/user/post">Cancel</Link>
          </Button>

          <SubmitButton variant="destructive">
            <span>Delete</span>
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeletePostPage;
