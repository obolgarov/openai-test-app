import type { Context, Next } from "@oak/oak";
import {
  type AuthenticatedContext,
  isAutheticatedContext,
} from "./Auth.types.ts";
import { authService } from "./Auth.service.ts";
import { parseAuthHeaders } from "./utils/parseAuthHeaders.ts";
import type { Middleware } from "@oak/oak/middleware";

export async function authMiddleware(ctx: Context, next: () => Promise<void>) {
  const authHeadersResult = parseAuthHeaders(ctx);
  if ("error" in authHeadersResult) {
    return next();
  }

  const { provider, token } = authHeadersResult;

  try {
    const user = await authService.validateToken(provider, token);
    if (!user) {
      return next();
    }

    ctx.state.user = user;
    authService.saveUser(user);
    await next();
  } catch (error) {
    console.error(error);
    next();
  }
}

export function withAuth(
  handler: Middleware<Record<string, unknown>, AuthenticatedContext>,
) {
  return async (
    ctx: Context,
    next: Next,
  ) => {
    if (!isAutheticatedContext(ctx)) {
      ctx.response.status = 401;
      ctx.response.body = { message: "Unauthorized" };
      return;
    }

    await handler(ctx, next);
  };
}
