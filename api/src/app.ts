import { Hono } from "hono";
import { logger } from "hono/logger";

import authRouter from "#infrastructure/Auth/Auth.router.ts";
import healthcheckRouter from "./features/Healthcheck/Healthcheck.router.ts";

const app = new Hono()
  .use(logger())
  .route("/auth", authRouter)
  .route("/healthcheck", healthcheckRouter);

export default app;
