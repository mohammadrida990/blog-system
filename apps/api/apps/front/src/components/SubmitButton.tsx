"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  variant,
  ...props
}: {
  children: React.JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variant?: any;
  props?: React.ComponentProps<"button">;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} variant={variant} {...props}>
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
};

export default SubmitButton;
