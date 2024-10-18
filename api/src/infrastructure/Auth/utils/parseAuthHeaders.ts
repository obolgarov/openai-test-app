import type { Context } from "@oak/oak";
import { isAuthProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import { authService } from "#infrastructure/Auth/Auth.service.ts";
import type { AuthProvider } from "#infrastructure/Auth/providers/Auth.provider.interface.ts";

export function parseAuthHeaders(
  ctx: Context,
): {
  provider: AuthProvider;
  token: string;
} | {
  error: string;
} {
  const authorization = ctx.request.headers.get("Authorization");
  if (!authorization) {
    return { error: "No Authorization" };
  }

  const [authScheme, token] = authorization.split(" ");
  if (authScheme !== "Bearer") {
    return { error: "Invalid Authorization" };
  }

  const authProviderSource = ctx.request.headers.get("X-Auth-Provider");
  if (!authProviderSource || !isAuthProviderSource(authProviderSource)) {
    // TODO: message could be "must provide a valid auth provider"
    return { error: "No Provider Detected" };
  }

  const authProvider = authService.getProvider(authProviderSource);
  if (!authProvider) {
    // TODO: message could be "unable to find auth provider"
    return { error: "Unrecognized Provider" };
  }

  return { provider: authProvider, token };
}
