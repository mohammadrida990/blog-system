import React, { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  modal: ReactNode;
}>;
const PostsLayout = ({ modal, children }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default PostsLayout;
