import { User } from "../models/User.model.ts";

export class GoogleAuthProvider {
  async authenticate(token: string): Promise<User | null> {
    // TODO: Implement Google OAuth
    console.log(token);
    return await Promise.resolve(null);
  }
}
