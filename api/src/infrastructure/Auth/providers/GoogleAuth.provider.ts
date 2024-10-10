import { createGoogleOAuthConfig, createHelpers } from "@deno/kv-oauth";
// import { AuthProvider } from "./Auth.provider.interface.ts";
// import { User } from "../models/User.model.ts";
import env from "#config/environment.ts";

const oAuthConfig = createGoogleOAuthConfig({
  redirectUri: env.authClients.google.redirectUri,
  scope: env.authClients.google.scope,
});

console.log();

const {
  signIn,
  handleCallback,
  getSessionId,
  signOut,
} = createHelpers(oAuthConfig);

export class GoogleAuthProvider {
  constructor() {
    console.log(signIn, handleCallback, getSessionId, signOut);
  }

  async signIn() {
    return await Promise.resolve("poop");
  }

  async signout() {
    return await Promise.resolve("poop");
  }
}
