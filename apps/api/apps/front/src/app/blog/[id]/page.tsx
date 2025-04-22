import { fetchPostById } from "@/lib/actions/postAction";
import React from "react";
import Image from "next/image";
import SanitizeContent from "../components/SanitizeContent";
import Comments from "../components/Comments";
import { getSession } from "@/lib/session";
import Like from "../components/like";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
const PostPage = async ({ params }: Params) => {
  const postId = (await params).id;

  let post = null;

  try {
    post = await fetchPostById(+postId);
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }

  // const post = await fetchPostById(+postId);
  if (!post) return notFound();
  const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <div>
        <h1 className=" capitalize text-5xl font-bold mb-8 text-primary text-center md:text-left">
          {post.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 justify-items-center md:justify-items-start">
          <div className="relative md:min-w-20 h-60 col-span-3 w-full overflow-hidden">
            <Image
              src={post.thumbnail ?? "/assets/no-image.png"}
              fill
              sizes="50vw"
              priority
              alt={post.title}
              className="rounded-md object-cover"
            />
          </div>

          <div className="md:col-span-9 col-span-3 md:text-left min-h-30">
            <div className="text-primary text-md flex justify-between items-center mb-2">
              <span className="">
                By{" "}
                <span className="text-bold capitalize underline text-lg">
                  {post.author.name}
                </span>{" "}
                | {new Date(post.createdAt).toLocaleDateString()}
              </span>

              <span>{session?.user.id && <Like postId={+postId} />}</span>
            </div>

            <SanitizeContent
              content={post.content}
              className="text-primary font-thin"
            />
          </div>
        </div>
      </div>

      <hr className="md:my-4" />

      <Comments postId={post.id} user={session?.user} />
    </main>
  );
};

export default PostPage;
