"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/actions/auth";
import React, { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signup, undefined);
  return (
    <form className="flex flex-col gap-6" action={action}>
      {!!state?.message && (
        <span className="text-red-500 text-xs animate-shake">
          {state.message}
        </span>
      )}

      <div>
        <Label htmlFor="name" className="text-xs text-primary">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="john cena"
          defaultValue={state?.data?.name}
          className="text-primary border-primary border-2"
        />
        {!!state?.errors?.name && (
          <span className="text-red-500 text-xs animate-shake">
            {state.errors.name}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-xs text-primary">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="example@example.com"
          defaultValue={state?.data?.email}
          className="text-primary border-primary border-2"
        />
        {!!state?.errors?.email && (
          <span className="text-red-500 text-xs animate-shake">
            {state.errors.email}
          </span>
        )}
      </div>

      <div>
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
          <div className="text-red-500 text-xs animate-shake">
            <p>Password must</p>
            <ul>
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <SubmitButton>
        <span>Signup</span>
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
