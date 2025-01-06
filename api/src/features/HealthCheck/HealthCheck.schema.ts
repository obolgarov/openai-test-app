import { z } from "zod";
import {
  AuthenticatedHealthCheckResponse,
  HealthCheckResponse,
} from "./HealthCheck.types.ts";

export const HealthCheckResponseSchema = z.object({
  env: z.string(),
  currentTime: z.string().datetime(),
  uptime: z.number(),
}) satisfies z.ZodType<HealthCheckResponse>;

export const AuthenticatedHealthCheckResponseSchema = HealthCheckResponseSchema
  .extend({
    userName: z.string(),
    userEmail: z.string().email(),
  }) satisfies z.ZodType<AuthenticatedHealthCheckResponse>;
