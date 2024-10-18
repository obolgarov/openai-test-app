import { createGitHubOAuthConfig, createHelpers } from "@deno/kv-oauth";
import { AuthProvider } from "./Auth.provider.interface.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

const oAuthConfig = createGitHubOAuthConfig();
const {
  signIn,
  handleCallback,
  getSessionId,
  signOut,
} = createHelpers(oAuthConfig);

// async function handler

export class GithubAuthProvider implements AuthProvider {
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
