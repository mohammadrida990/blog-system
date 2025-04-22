import Link from "next/link";
import React from "react";
import SignInForms from "./_components/SignInForms";

const SignInPage = () => {
  return (
    <div
      className="
        bg-stone-200 p-8 border-4 border-foreground rounded-xl shadow-lg w-[70%] md:w-1/3
        flex flex-col gap-5
      "
    >
      <h1 className="font-bold mb-4 text-center text-4xl text-primary">
        Signin
      </h1>

      <SignInForms />

      <Link href="/auth/forgot" className="text-primary font-thin text-right">
        Forget your password
      </Link>
    </div>
  );
};

export default SignInPage;
