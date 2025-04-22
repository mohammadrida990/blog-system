"use client";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  content: string;
  className?: string;
};

const SanitizeContent = (props: Props) => {
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.content),
      }}
    />
  );
};

export default SanitizeContent;
