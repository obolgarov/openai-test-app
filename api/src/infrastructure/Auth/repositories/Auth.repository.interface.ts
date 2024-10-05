import { User } from "../models/User.model.ts";

export interface AuthRespository {
  findUserByEmail(email: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
