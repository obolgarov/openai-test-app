import type { Handler } from "$fresh/server.ts";
import environment from "#config/environment.ts";

console.log(environment);

const API_SIGNIN_URL = `${environment.app.api_url}/auth/signin`;

export const handler: Handler = (req, ctx) => {
  const headers = new Headers();
  headers.set("Location", API_SIGNIN_URL);

  console.log(API_SIGNIN_URL);

  return new Response(null, {
    status: 302,
    headers,
  });
};
