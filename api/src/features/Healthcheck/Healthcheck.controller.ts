import type { Context } from "@oak/oak";
import { healthcheckService } from "./Healthcheck.service.ts";
import type { AuthenticatedContext } from "#infrastructure/Auth/Auth.types.ts";

export class Healthcheck {
  static healthcheck(ctx: Context) {
    const healthcheckResponse = healthcheckService
      .generateHealthcheckResponse();

    ctx.response.status = 200;
    ctx.response.body = healthcheckResponse;
    return ctx;
  }

  static authHealthcheck(ctx: AuthenticatedContext) {
    const { user } = ctx.state;

    const healthcheckResponse = healthcheckService
      .generateAuthenticatedHealthCheckResponse(user);

    ctx.response.status = 200;
    ctx.response.body = healthcheckResponse;
    return ctx;
  }
}
