"use server";

import { redirect } from "next/navigation";
import { fetchGraphQl } from "../fetchGraphQl";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQuaries";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signupFormSchems";
import { print } from "graphql";
import { SignInFormSchema } from "../zodSchemas/signInFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export async function signup(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: Object.fromEntries(formData.entries()),
    };
  }

  const data = await fetchGraphQl(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) return { message: "Something went wrong" };

  redirect("/auth/signin");
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignInFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: Object.fromEntries(formData.entries()),
    };
  }

  const data = await fetchGraphQl(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (!data)
    return {
      message: "Invalid credentials",
      data: Object.fromEntries(formData.entries()),
    };

  await createSession({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
      avatar: data.signIn.avatar,
    },
    accessToken: data.signIn.accessToken,
  });

  revalidatePath("/");
  redirect("/");
}
