import type { AuthenticatedContext } from "#infrastructure/Auth/Auth.types.ts";
import { Context } from "hono";
import { healthCheckService } from "./HealthCheck.service.ts";

/**
 * @deprecated Hono recommends avoiding Ruby on Rails style controllers
 * and recommends defining routes with the route instead
 *
 * https://hono.dev/docs/guides/best-practices#don-t-make-controllers-when-possible
 *
 * Controller-like logic (obtaining and validating request data, performing response) will
 * defined with the route, and all other logic can still take place in the service methods.
 * On the plus side, this should allow validation to be done through middleware and guards.
 */
export class HealthCheckController {
  static healthCheck(ctx: Context) {
    const healthCheckResponse = healthCheckService
      .generateHealthCheckResponse();

    ctx.status(200);
    return ctx.json(healthCheckResponse);
  }

  static authHealthCheck(ctx: AuthenticatedContext) {
    const { user } = ctx.var;

    const healthCheckResponse = healthCheckService
      .generateAuthenticatedHealthCheckResponse(user);

    ctx.status(200);
    return ctx.json(healthCheckResponse);
  }
}
