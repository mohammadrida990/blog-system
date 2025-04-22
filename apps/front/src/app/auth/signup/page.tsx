import Link from "next/link";
import React from "react";
import SignUpForm from "./_components/signUpForm";

const Page = () => {
  return (
    <div
      className="
        bg-stone-200 p-8 border-4 border-foreground rounded-xl shadow-lg w-[70%] md:w-1/3
        flex flex-col gap-5
      "
    >
      <h2 className="font-bold mb-4 text-center text-4xl text-primary">
        Signup
      </h2>

      <SignUpForm />

      <div>
        <p className="text-primary font-thin text-right">
          Already have account:{" "}
          <Link
            href="/auth/signin"
            className="underline font-bold text-primary"
          >
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
