import { AuthProvider } from "./providers/Auth.provider.interface.ts";
import { GoogleAuthProvider } from "#infrastructure/Auth/providers/GoogleAuth.provider.ts";
import { UserRespository } from "./repositories/User.repository.interface.ts";
import { UserMemoryRespository } from "#infrastructure/Auth/repositories/UserMemory.repository.ts";
import { AuthProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

export type AuthServiceProviders = Readonly<
  Record<AuthProviderSource, AuthProvider>
>;

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

  async signIn(provider: AuthProvider, token: string): Promise<User> {
    const user = await provider.signIn(token);
    if (!user) {
      throw new Error("Invalid token");
    }

    return user;
  }

  async validateToken(
    authProvider: AuthProvider,
    token: string,
  ): Promise<User | null> {
    const user = await authProvider.validateToken(token);
    if (!user) {
      throw new Error("Invalid token");
    }

    return user;
  }

  getProvider(
    authProviderSource: AuthProviderSource,
  ): AuthProvider | undefined {
    return this.providers[authProviderSource];
  }

  getProviders(): AuthServiceProviders {
    return this.providers;
  }

  parseTokenData(token: string) {
    const tokenParts = token.split(".");
    const data = JSON.parse(atob(tokenParts[1]));
    return data;
  }

  saveUser(user: User) {
    const existingUser = this.userRepository.findUserByEmail(user.email);

    this.userRepository.saveUser(user, email);
  }

  validateCallbackcode(provider: AuthProvider, code: string) {
    return provider.handleCallback(code);
  }
}

export const authService = new AuthService({
  [AuthProviderSource.Google]: new GoogleAuthProvider(),
  // github: new GithubAuthProvider(),
}, new UserMemoryRespository());
