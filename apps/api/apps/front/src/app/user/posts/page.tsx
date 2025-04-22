import { fetchUserPosts } from "@/lib/actions/postAction";
import React from "react";
import PostLists from "./_components/PostLists";

const UserPostsPage = async () => {
  const { posts } = await fetchUserPosts();
  return (
    <div className="w-full mx-auto p-12">
      {!posts || posts.length === 0 ? (
        <h1 className="text-white text-5xl font-bold text-center">No posts</h1>
      ) : (
        <PostLists posts={posts} />
      )}
    </div>
  );
};

export default UserPostsPage;
