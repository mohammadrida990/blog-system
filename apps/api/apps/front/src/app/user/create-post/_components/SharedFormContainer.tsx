"use client";

import { useActionState } from "react";
import SharedForm from "./SharedForm";
import { createPost } from "@/lib/actions/postAction";

const SharedFormContainer = () => {
  const [state, action] = useActionState(createPost, undefined);

  return <SharedForm state={state} formAction={action} />;
};

export default SharedFormContainer;
