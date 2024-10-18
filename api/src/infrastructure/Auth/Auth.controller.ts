import { authService } from "./Auth.service.ts";
import type { AuthProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import type {
  AuthInfo,
  AuthProvider,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import { parseAuthHeaders } from "#infrastructure/Auth/utils/parseAuthHeaders.ts";
import type { Context } from "@oak/oak";

export class AuthController {
  static async getAuthInfo(ctx: Context) {
    const authProviders = authService.getProviders();

    const authInfoEntries = await Promise.all(
      Object.entries(authProviders)
        .map(
          async (
            [provider, authProvider],
          ) => [provider, await authProvider.getAuthInfo()],
        ),
    );

    const authInfoMap = Object.fromEntries(authInfoEntries) as Record<
      AuthProviderSource,
      AuthInfo
    >;

    ctx.response.status = 200;
    ctx.response.body = authInfoMap;
  }

  static async signIn(ctx: Context) {
    const authHeadersResult = parseAuthHeaders(ctx);
    if ("error" in authHeadersResult) {
      ctx.response.status = 401;
      ctx.response.body = { message: authHeadersResult.error };
      return;
    }

    const { provider, token } = authHeadersResult;

    const user = await authService.signIn(provider, token);
    if (user) {
      ctx.response.status = 200;
      ctx.response.body = user;
    } else {
      ctx.response.status = 401;
      ctx.response.body = { message: "Authentication failed" };
    }
  }
}
