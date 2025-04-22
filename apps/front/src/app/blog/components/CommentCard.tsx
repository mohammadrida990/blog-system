import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentModel } from "@/lib/types/modelTypes";
import { UserIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {
  comment: CommentModel;
};
const CommentCard = ({ comment }: Props) => {
  return (
    <div className="p-2 shadow-md rounded-lg outline-2 outline-primary bg-background text-primary">
      <div className="flex gap-3 items-center text-slate-500 mb-3">
        <Avatar className="border-2 ">
          <AvatarImage src={comment.author.avatar} />

          <AvatarFallback>
            <UserIcon className="w-6" />
          </AvatarFallback>
        </Avatar>
        <p className="text-primary text-lg">{comment.author.name}</p>|
        <p className="text-primary text-lg">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>

      <span className="mt-6 font-thin">{comment.content}</span>
    </div>
  );
};

export default CommentCard;
