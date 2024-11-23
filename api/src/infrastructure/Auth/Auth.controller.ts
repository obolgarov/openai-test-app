import { authService } from "./Auth.service.ts";
import type { AuthProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import type {
  AuthInfo,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import { Context } from "hono";

export class AuthController {
  static getAuthProdivers(ctx: Context) {
    const authProviders = authService.getProviders();
    const providerKeys = Object.keys(authProviders);

    ctx.status(200);
    return ctx.json(providerKeys);
  }

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

    ctx.status(200);
    return ctx.json(authInfoMap);
  }

  // static async signIn(ctx: Context) {
  //   const authHeadersResult = parseAuthHeaders(ctx);
  //   if ("error" in authHeadersResult) {
  //     ctx.status(401);
  //     ctx.json({ message: authHeadersResult.error });
  //     return;
  //   }

  //   const { provider, token } = authHeadersResult;

  //   const user = await authService.signIn(provider, token);
  //   if (user) {
  //     ctx.status(200);
  //     ctx.json(user);
  //   } else {
  //     ctx.status(401);
  //     ctx.json({ message: "Authentication failed" });
  //   }
  // }
}
