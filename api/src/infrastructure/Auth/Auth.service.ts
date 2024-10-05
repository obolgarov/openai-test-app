import { User } from "./models/User.model.ts";
import { AuthProvider } from "./providers/Auth.provider.interface.ts";
import { AuthRespository } from "./repositories/Auth.repository.interface.ts";

export type AuthServiceProviders = {
  [key: string]: AuthProvider;
};

export class AuthService {
  private authRepository: AuthRespository;
  private providers: AuthServiceProviders;

  constructor(
    providers: AuthServiceProviders,
    authRepository: AuthRespository,
  ) {
    this.providers = providers;
    this.authRepository = authRepository;
  }

  async authenticate(
    providerName: string,
    token: string,
  ): Promise<User | null> {
    const provider = this.providers[providerName];
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }

    const user = await provider.authenticate(token);
    if (!user) {
      return null;
    }

    await this.authRepository.saveUser(user);
    return user;
  }
}
