import {
  type AuthenticatedContext,
  isAutheticatedContext,
} from "./Auth.types.ts";
import { authService } from "./Auth.service.ts";
import { parseAuthHeaders } from "./utils/parseAuthHeaders.ts";
import { Next } from "hono";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(
  async (ctx, next) => {
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
  },
);

/**
 * Makes sure given handler has authentication
 */
export const withAuth = (
  handler: (ctx: AuthenticatedContext, next?: Next) => Response,
) =>
  createMiddleware(async (ctx, next) => {
    if (!isAutheticatedContext(ctx)) {
      ctx.status(401);
      return ctx.json({ message: "Unauthorized" });
    }

    return await handler(ctx, next);
  });
