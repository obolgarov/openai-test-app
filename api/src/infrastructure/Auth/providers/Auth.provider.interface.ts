import type { User } from "../entities/User.entity.ts";

export interface AuthInfo {
  authorizeUri: string;
  revokeUri: string;
}

export interface AuthProvider {
  getAuthInfo(): Promise<AuthInfo>;

  exchangeCodeForToken(code: string): Promise<string>;
}
