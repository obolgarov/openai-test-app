import { Hono } from "hono";
import { logger } from "hono/logger";

import authRouter from "#infrastructure/Auth/Auth.router.ts";
import healthCheckRouter from "./features/HealthCheck/HealthCheck.router.ts";
import { setupOpenAPIRouter } from "#infrastructure/OpenAPI/OpenAPI.setup.ts";

const app = new Hono()
  .use(logger())
  .route("/auth", authRouter)
  .route("/healthcheck", healthCheckRouter);

setupOpenAPIRouter(app);

export default app;
