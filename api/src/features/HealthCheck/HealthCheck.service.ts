import environment from "#config/environment.ts";
import { User } from "#infrastructure/Auth/entities/User.entity.ts";
import {
  AuthenticatedHealthCheckResponse,
  HealthCheckResponse,
} from "./HealthCheck.types.ts";

export class HealthCheckService {
  generateHealthCheckResponse(): HealthCheckResponse {
    return {
      env: environment.server.env,
      currentTime: new Date().toISOString(),
      uptime: Deno.osUptime(),
    };
  }

  generateAuthenticatedHealthCheckResponse(
    user: User,
  ): AuthenticatedHealthCheckResponse {
    const healthCheckResponse = this.generateHealthCheckResponse();

    return {
      ...healthCheckResponse,
      userName: user.name,
      userEmail: user.email,
    };
  }
}

export const healthCheckService = new HealthCheckService();
