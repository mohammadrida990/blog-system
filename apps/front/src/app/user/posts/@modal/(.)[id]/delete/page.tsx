"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postAction";
import { redirect } from "next/navigation";
import React, { use, useState } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const InterceptorDeletePost = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const params = use(props.params);
  const postId = parseInt(params.id);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-stone-200 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-700 font-bold text-2xl ">
            Delete this post
          </AlertDialogTitle>

          <AlertDialogDescription>
            <span className="text-lg font-thin text-primary dark:text-slate-900">
              This will permanently deleted
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            asChild
            className="
              bg-primary text-white hover:bg-primary/80 hover:text-white
              dark:bg-primary hover:dark:bg-primary/80 hover:dark:text-white
            "
          >
            <a href="/user/posts">Cancel</a>
          </AlertDialogCancel>

          <AlertDialogAction
            asChild
            className="bg-red-500 dark:bg-red-500 text-white hover:bg-red-500/80"
          >
            <Button
              onClick={() => {
                deletePost(postId);
                setIsOpen(false);
                redirect("/user/posts");
              }}
              variant={"destructive"}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePost;
