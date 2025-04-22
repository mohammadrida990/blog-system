import { BACKEND_URL } from "./const";
import { getSession } from "./session";

export const fetchGraphQl = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GrapghQl errors:", result.errors);

    throw new Error("fails to fetch data from Graghql");
  }

  return result.data;
};

export const fetchAuthGraphQl = async (query: string, variables = {}) => {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GrapghQl errors:", result.errors);

    throw new Error("fails to fetch data from Graghql");
  }

  return result.data;
};
