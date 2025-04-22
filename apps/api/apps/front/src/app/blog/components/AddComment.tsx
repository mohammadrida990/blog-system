import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createComments } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { CommentModel } from "@/lib/types/modelTypes";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        count: number;
        comments: CommentModel[];
      },
      Error
    >
  >;
};
const AddComment = (props: Props) => {
  const [state, action] = useActionState(createComments, undefined);
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (state?.success && !hasShownToast.current) {
      toast("success", {
        description: state?.message,
      });
      hasShownToast.current = true;

      props.refetch();
    }
  }, [state, props]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Leave your comment</Button>
      </DialogTrigger>

      <DialogContent className="bg-stone-200">
        <DialogTitle className="border border-t-0 border-b-1 border-x-0 pb-2 text-2xl font-bold text-slate-700">
          Write your comment
        </DialogTitle>

        <form className={props.className} action={action}>
          <Input type="hidden" name="postId" defaultValue={props.postId} />
          <Label
            htmlFor="comment"
            className="text-xs text-primary dark:text-gray-900"
          >
            {" "}
            Your comment
          </Label>
          <div className="">
            <Textarea
              name="content"
              id="name"
              className="
                text-wrap text-primary dark:text-gray-900 border-primary focus-visible:ring-0 
                focus-visible:shadow-primary  shadow-sm focus-visible:border-primary
              "
            />
            {!!state?.errors?.content && (
              <span className="text-xs text-red-500">
                {state.errors.content}
              </span>
            )}
          </div>

          <p className="p-2 border rounded-b-md">
            <span className="text-md text-primary dark:text-gray-700">
              Write as
            </span>
            <span className="mx-2 text-primary font-black text-2xl capitalize dark:text-gray-900">
              {props.user.name}
            </span>
          </p>

          <div className="text-right">
            <SubmitButton>
              <span>Submit</span>
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
