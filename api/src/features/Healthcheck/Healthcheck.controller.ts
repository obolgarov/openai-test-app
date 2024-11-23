import { healthcheckService } from "./Healthcheck.service.ts";
import type { AuthenticatedContext } from "#infrastructure/Auth/Auth.types.ts";
import { Context } from "hono";

export class HealthcheckController {
  static healthcheck(ctx: Context) {
    const healthcheckResponse = healthcheckService
      .generateHealthcheckResponse();

    ctx.status(200);
    return ctx.json(healthcheckResponse);
  }

  static authHealthcheck(ctx: AuthenticatedContext) {
    const { user } = ctx.var;

    const healthcheckResponse = healthcheckService
      .generateAuthenticatedHealthCheckResponse(user);

    ctx.status(200);
    return ctx.json(healthcheckResponse);
  }
}
