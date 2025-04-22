import Link from "next/link";
import React from "react";

const SignInPanel = () => {
  return (
    <>
      <Link href="/auth/signin">signIn</Link>
      <Link href="/auth/signup">Signup</Link>
    </>
  );
};

export default SignInPanel;
