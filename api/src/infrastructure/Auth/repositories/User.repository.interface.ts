import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

export interface UserRespository {
  findUserByEmail(email: string): Promise<User | null>;
  saveUser(email: string, userData: User): Promise<void>;
}
