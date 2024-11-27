import {
  type AuthenticatedContext,
  isAutheticatedContext,
} from "./Auth.types.ts";
import { authService } from "./Auth.service.ts";
import { parseAuthHeaders } from "./utils/parseAuthHeaders.ts";
import { Context, Next } from "hono";

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeadersResult = parseAuthHeaders(ctx);
  if ("error" in authHeadersResult) {
    return next();
  }
  const { provider, token } = authHeadersResult;
  
  try {
    // const user = await authService.validateToken(provider, token);
    const user = null;
    if (!user) {
      return next();
    }

    ctx.set("user", user);
    authService.saveUser(user);
    await next();
  } catch (error) {
    console.error(error);
    await next();
  }
}

export function withAuth(
  handler: (ctx: AuthenticatedContext, next?: Next) => Response,
) {
  return async (
    ctx: Context,
    next: Next,
  ) => {
    if (!isAutheticatedContext(ctx)) {
      ctx.status(401);
      return ctx.json({ message: "Unauthorized" });
    }

    return await handler(ctx, next);
  };
}
