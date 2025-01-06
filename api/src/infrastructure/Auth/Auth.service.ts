import { AuthProvider } from "./providers/Auth.provider.interface.ts";
import { GoogleAuthProvider } from "#infrastructure/Auth/providers/GoogleAuth.provider.ts";
import { UserRespository } from "./repositories/User.repository.interface.ts";
import { UserMemoryRespository } from "#infrastructure/Auth/repositories/UserMemory.repository.ts";
import {
  AuthProviderSource,
  OAuth2ProviderSource,
} from "#infrastructure/Auth/Auth.types.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";
import type { AuthInfo } from "#infrastructure/Auth/providers/Auth.provider.interface.ts";

export type AuthServiceProviders = Readonly<
  Partial<
    Record<AuthProviderSource, AuthProvider>
  >
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

  getProviders(): AuthServiceProviders {
    return this.providers;
  }

  // async signIn(provider: AuthProvider, token: string): Promise<User> {
  //   const user = await provider.signIn(token);
  //   if (!user) {
  //     throw new Error("Invalid token");
  //   }

  //   return user;
  // }

  // async validateToken(
  //   authProvider: AuthProvider,
  //   token: string,
  // ): Promise<User | null> {
  //   const user = await authProvider.validateToken(token);
  //   if (!user) {
  //     throw new Error("Invalid token");
  //   }

  //   return user;
  // }

  getProvider(
    authProviderSource: AuthProviderSource,
  ): AuthProvider | undefined {
    return this.providers[authProviderSource];
  }

  parseTokenData(token: string) {
    const tokenParts = token.split(".");
    const data = JSON.parse(atob(tokenParts[1]));
    return data;
  }

  saveUser(user: User) {
    const existingUser = this.userRepository.findUserByEmail(user.email);

    if (!existingUser) {
      this.userRepository.saveUser(user.email, user);
    }
  }

  // validateCallbackCode(provider: AuthProvider, code: string) {
  //   return provider.handleCallback(code);
  // }

  async getAllAuthInfo() {
    const authInfoMap: { [key in AuthProviderSource]?: AuthInfo } = {};

    await Promise.all(
      Object.keys(this.providers).map(
        async (key) => {
          const provider = this.providers[key as AuthProviderSource];
          if (provider) {
            authInfoMap[key as AuthProviderSource] = await provider
              .getAuthInfo();
          }
        },
      ),
    );

    return authInfoMap;
  }
}

export const authService = new AuthService({
  [OAuth2ProviderSource.Google]: new GoogleAuthProvider(),
  // github: new GithubAuthProvider(),
}, new UserMemoryRespository());
