import React from "react";
import UpdatePostContainer from "./_components/UpdatePostContainer";
import { fetchPostById } from "@/lib/actions/postAction";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));

  return (
    <div className="p-6 rounded-md shadow-md bg-slate-200 max-w-2xl md:w-full">
      <h2 className="dark:text-slate-700 text-primary font-bold text-4xl text-center">
        Update post
      </h2>

      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;
