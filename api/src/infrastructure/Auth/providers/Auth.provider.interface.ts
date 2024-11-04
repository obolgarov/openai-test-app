import type { User } from "../entities/User.entity.ts";

export interface AuthInfo {
  loginUrl: string;
  logoutUrl: string;
  callbackUrl: string;
}

export interface AuthProvider {
  getAuthInfo(): Promise<AuthInfo>;

  signIn(token: string): Promise<User | null>;

  signOut(token: string): void;

  handleCallback(code: string): Promise<string>;

  validateToken(token: string): Promise<User | null>;
}
