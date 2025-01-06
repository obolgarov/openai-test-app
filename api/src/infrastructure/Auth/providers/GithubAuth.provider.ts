import { createGitHubOAuthConfig, createHelpers } from "@deno/kv-oauth";
import {
  AuthInfo,
  AuthType,
  BaseAuthProvider,
  OAuth2Info,
  OAuth2Provider,
} from "./Auth.provider.interface.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

const oAuthConfig = createGitHubOAuthConfig();
const {
  signIn,
  handleCallback,
  getSessionId,
  signOut,
} = createHelpers(oAuthConfig);

// async function handler

export class GithubAuthProvider implements OAuth2Provider {
  type = AuthType.OAuth2;

  scopes = [];

  constructor() {
    console.log(signIn, handleCallback, getSessionId, signOut);
  }

  exchangeCodeForToken(code: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getAuthInfo(): Promise<OAuth2Info> {
    throw new Error("Method not implemented.");
  }

  async authenticate(token: string): Promise<User | null> {
    console.log(token);
    return await Promise.resolve(null);
  }

  async signIn() {
    return await Promise.resolve("poop");
  }
}
