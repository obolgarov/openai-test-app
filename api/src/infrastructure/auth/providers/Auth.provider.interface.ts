import type { User } from "../models/User.model.ts";

export interface AuthProvider {
  authenticate(token: string): Promise<User | null>;
}
