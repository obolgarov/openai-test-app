import { withAuth } from "#infrastructure/Auth/Auth.middleware.ts";
import { Hono } from "hono";
import { HealthcheckController } from "./Healthcheck.controller.ts";

const healthcheckRouter = new Hono()
  .get("/", HealthcheckController.healthcheck)
  .get(
    "/auth",
    withAuth(HealthcheckController.authHealthcheck),
  );

export default healthcheckRouter;
