import { User } from "./models/User.model.ts";
import { AuthProvider } from "./providers/Auth.provider.interface.ts";
import { UserRespository } from "./repositories/User.repository.interface.ts";

export type AuthServiceProviders = {
  [key: string]: AuthProvider;
};

export class AuthService {
  private userRepository: UserRespository;
  private providers: AuthServiceProviders;

  constructor(
    providers: AuthServiceProviders,
    userRepository: UserRespository,
  ) {
    this.providers = providers;
    this.userRepository = userRepository;
  }

  async signIn(provider: string, token: string): Promise<User | null> {
    const user = await this.providers[provider].signIn(token);
    if (user && !userAlreadySaved(user))) {
      await this.saveUser(user);
    }
    return user;
  }

  async validateUser(authProvider, ): Promise<User | null> {

  }
}
