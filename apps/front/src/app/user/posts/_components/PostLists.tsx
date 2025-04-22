import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types/modelTypes";
import {
  CheckBadgeIcon,
  NoSymbolIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  posts: Post[];
};
const PostLists = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-6 w-full justify-center mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className="
            col-span-2 w-full rounded-xl border border-gray-200 dark:border-gray-700
            bg-slate-200
            shadow-md hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/30
            hover:scale-[1.02] transform transition duration-300 p-4
            ring-2 ring-primary ring-offset-2
          "
        >
          <div className="bg-primary mb-2 rounded-lg">
            <div
              className="
                relative w-full h-60 overflow-hidden object-contain justify-center 
                items-center justify-items-center justify-self-center
              "
            >
              <Image
                src={post.thumbnail || "/assets/no-image.png"}
                alt={post.title}
                fill
                sizes="50vh"
              />
            </div>
          </div>

          <div className="mx-8 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 text-primary/60 font-medium dark:text-gray-600">
              <p>Title:</p>
              <p>Created at:</p>
              <p>Published:</p>
              <p>Total likes:</p>
              <p>Total comments:</p>
            </div>

            <div className="font-black text-primary text-md flex flex-col gap-3 dark:text-gray-900">
              <p className="line-clamp-1 capitalize">{post.title}</p>
              <span className="">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <div>
                {post.published ? (
                  <CheckBadgeIcon className="w-6 text-green-700" />
                ) : (
                  <NoSymbolIcon className="w-6 text-red-500" />
                )}
              </div>
              <span>{post._count.likes || 0}</span>

              <span> {post._count.comments || 0}</span>
            </div>
          </div>
          <hr className="mx-6 my-4 bg-gray-300" />

          <p className="line-clamp-4 capitalize min-h-[60px] text-primary dark:text-gray-900 font-extrabold text-lg mx-6">
            {post.content}
          </p>

          <hr className="mx-6 my-4 bg-gray-300" />

          <div className="flex gap-2 justify-center items-center mb-3">
            <Button
              asChild
              className="
                bg-transparent text-yellow-500 border border-yellow-500
              hover:bg-yellow-100 transition-colors duration-300
              "
            >
              <Link href={`/user/posts/${post.id}/update`}>
                <PencilIcon className="w-6" />
              </Link>
            </Button>

            <Button
              asChild
              className="
            text-red-500 bg-transparent border border-red-500
              hover:bg-red-100 transition-colors duration-300
              "
            >
              <Link href={`/user/posts/${post.id}/delete`} scroll={false}>
                <TrashIcon className="w-6" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
