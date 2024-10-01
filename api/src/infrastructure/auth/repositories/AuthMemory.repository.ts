import { User } from "../models/User.model.ts";
import { AuthRespository } from "./AuthRepository.interface.ts";

export class AuthMemoryRespository implements AuthRespository {
  private users: User[] = [];

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email,
    ) || null;

    return await Promise.resolve(user);
  }

  async saveUser(user: User): Promise<void> {
    this.users.push(user);
    return await Promise.resolve();
  }
}
