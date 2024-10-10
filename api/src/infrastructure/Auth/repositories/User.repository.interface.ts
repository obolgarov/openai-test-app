import { User } from "../models/User.model.ts";

export interface UserRespository {
  findUserByEmail(email: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
