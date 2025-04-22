"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import React, { useActionState } from "react";

const SignInForms = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form className="flex flex-col gap-6" action={action}>
      {!!state?.message && (
        <p className="text-red-500 text-xs animate-shake">{state.message}</p>
      )}
      <div>
        <Label htmlFor="email" className="text-xs text-primary">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="test@example.com"
          type="email"
          defaultValue={state?.data?.email}
          className="text-primary border-primary border-2"
        />
        {!!state?.errors?.email && (
          <p className="text-red-500 text-xs  mt-0 pt-0 animate-shake">
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="">
        <Label htmlFor="password" className="text-xs text-primary">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="text-primary border-primary border-2"
        />
        {!!state?.errors?.password && (
          <p className="text-red-500 text-xs animate-shake">
            {state.errors.password}
          </p>
        )}
      </div>

      <SubmitButton>
        <span>Signin</span>
      </SubmitButton>
    </form>
  );
};

export default SignInForms;
