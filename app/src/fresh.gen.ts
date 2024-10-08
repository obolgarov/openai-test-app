// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_auth_auth_callback_handler from "./routes/(auth)/auth/callback-handler.tsx";
import * as $_auth_auth_github_auth from "./routes/(auth)/auth/github-auth.tsx";
import * as $_auth_auth_google_auth from "./routes/(auth)/auth/google-auth.tsx";
import * as $_auth_auth_index from "./routes/(auth)/auth/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $Countdown from "./islands/Countdown.tsx";
import * as $Counter from "./islands/Counter.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/(auth)/auth/callback-handler.tsx": $_auth_auth_callback_handler,
    "./routes/(auth)/auth/github-auth.tsx": $_auth_auth_github_auth,
    "./routes/(auth)/auth/google-auth.tsx": $_auth_auth_google_auth,
    "./routes/(auth)/auth/index.tsx": $_auth_auth_index,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Countdown.tsx": $Countdown,
    "./islands/Counter.tsx": $Counter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
