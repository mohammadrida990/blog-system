import React from "react";
import SharedFormContainer from "./_components/SharedFormContainer";

const CreatePostpage = () => {
  return (
    <div className="p-6 rounded-md shadow-lg bg-slate-200 max-w-2xl md:w-full">
      <h2 className="dark:text-slate-700 text-primary font-bold text-4xl text-center">
        Create new post
      </h2>

      <SharedFormContainer />
    </div>
  );
};

export default CreatePostpage;
