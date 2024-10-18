import type {
  AuthInfo,
  AuthProvider,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import type { User } from "#infrastructure/Auth/entities/User.entity.ts";

const GOOGLE_OPENID_CONFIG =
  "https://accounts.google.com/.well-known/openid-configuration";

export class GoogleAuthProvider implements AuthProvider {
  private oAuthConfig = {};

  private authInfo: AuthInfo = {};

  async signIn(token: string) {
    return await Promise.resolve(token);
  }

  async signOut() {
    return await Promise.resolve("poop");
  }

  handleCallback(code: string): string {
  }

  async validateToken(token: string): Promise<User | null> {
    fetch;
  }

  async getAuthInfo() {
    return await Promise.resolve(this.authInfo);
  }
}
