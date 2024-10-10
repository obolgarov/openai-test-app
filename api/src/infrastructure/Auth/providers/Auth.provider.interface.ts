import type { User } from "../models/User.model.ts";

export interface AuthProvider {
  signIn(token: string): Promise<User | null>;

  signOut(token: string): Promise<User | null>;

  handleCallback(params: URLSearchParams): Promise<string>;
}
