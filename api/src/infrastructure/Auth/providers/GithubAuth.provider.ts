import { createGitHubOAuthConfig, createHelpers } from "@deno/kv-oauth";
import { AuthProvider } from "./Auth.provider.interface.ts";
import { User } from "../models/User.model.ts";

const oAuthConfig = createGitHubOAuthConfig();
const {
  signIn,
  handleCallback,
  getSessionId,
  signOut,
} = createHelpers(oAuthConfig);

// async function handler

export class GithubAuth implements AuthProvider {
  constructor() {
    console.log(signIn, handleCallback, getSessionId, signOut);
  }

  async authenticate(token: string): Promise<User | null> {
    console.log(token);
    return await Promise.resolve(null);
  }

  async signIn() {
    return await Promise.resolve("poop");
  }
}
