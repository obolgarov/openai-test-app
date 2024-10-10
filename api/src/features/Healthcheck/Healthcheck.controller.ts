import type { Context } from "@oak/oak";
import { HealthcheckService } from "./Healthcheck.service.ts";

const healthcheckService = new HealthcheckService();

export class Healthcheck {
  static healthcheck(ctx: Context) {
    ctx.response.body = "OK";
    return ctx;
  }

  static authHealthcheck(ctx: Context) {
    ctx.response.body = "OK";
    return ctx;
  }
}
