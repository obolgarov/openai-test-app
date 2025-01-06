import { withAuth } from "#infrastructure/Auth/Auth.middleware.ts";
import { Hono } from "hono";
import { healthCheckService } from "./HealthCheck.service.ts";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import {
  AuthenticatedHealthCheckResponseSchema,
  HealthCheckResponseSchema,
} from "./HealthCheck.schema.ts";

const healthCheckRouter = new Hono()
  .get(
    "/",
    describeRoute({
      description: "Simple data to show the system as working properly",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "json": { schema: resolver(HealthCheckResponseSchema) },
          },
        },
      },
    }),
    (ctx) => {
      const healthCheckResponse = healthCheckService
        .generateHealthCheckResponse();

      ctx.status(200);
      return ctx.json(healthCheckResponse);
    },
  )
  .get(
    "/auth",
    describeRoute({
      description:
        "Simple data to show the system as working properly with authentication",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "json": {
              schema: resolver(AuthenticatedHealthCheckResponseSchema),
            },
          },
        },
      },
    }),
    withAuth((ctx) => {
      const { user } = ctx.var;

      const healthCheckResponse = healthCheckService
        .generateAuthenticatedHealthCheckResponse(user);

      ctx.status(200);
      return ctx.json(healthCheckResponse);
    }),
  );

export default healthCheckRouter;
