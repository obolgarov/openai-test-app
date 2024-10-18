import type { User } from "#infrastructure/Auth/entities/User.entity.ts";
import { UserRespository } from "./User.repository.interface.ts";

/**
 * Simple in-memory database way for users for now, storing user data isn't important in this app
 */
export class UserMemoryRespository implements UserRespository {
  private users: Record<string, User> = {};

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users[email] || null;

    return await Promise.resolve(user);
  }

  async saveUser(email: string, user: User): Promise<void> {
    this.users[email] = user;
    return await Promise.resolve();
  }
}
