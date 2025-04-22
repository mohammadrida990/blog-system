import { Post } from "@/lib/types/modelTypes";
import React from "react";
import PostCard from "./PostCard";
import Pagination from "./pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};

const Posts = (props: Props) => {
  return (
    <section className="container m-8 max-w-5xl mx-auto">
      <div className="mb-4">
        <h2 className="text-5xl font-bold text-center text-primary leading-tight">
          Latest posts
        </h2>

        <div className="h-1 bg-gradient-to-r from-background to-primary w-96 mb-9 rounded-t-md mt-5 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {props.posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>

      <Pagination
        className="mt-10"
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </section>
  );
};

export default Posts;
