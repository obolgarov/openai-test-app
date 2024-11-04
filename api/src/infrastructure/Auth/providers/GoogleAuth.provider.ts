import type {
  AuthInfo,
  AuthProvider,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

const GOOGLE_OPENID_CONFIG =
  "https://accounts.google.com/.well-known/openid-configuration";

export class GoogleAuthProvider implements AuthProvider {
  private oAuthConfig = {};

  private authInfo?: AuthInfo;

  signIn(token: string) {
    return Promise.resolve(null);
  }

  async signOut() {
    return await Promise.resolve("poop");
  }

  handleCallback(code: string) {
    return Promise.resolve("test");
  }

  async validateToken(token: string): Promise<User | null> {
    return await Promise.resolve(null);
  }

  async getAuthInfo() {
    if (!this.authInfo) {
      this.authInfo = {
        loginUrl: "test",
        logoutUrl: "test",
        callbackUrl: "test",
      };
    }

    return await Promise.resolve(this.authInfo);
  }
}
