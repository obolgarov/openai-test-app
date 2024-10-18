import environment from "#config/environment.ts";
import type { User } from "#infrastructure/Auth/models/User.model.ts";

export class HealthcheckService {
  generateHealthcheckResponse() {
    return {
      env: environment.server.env,
      currentTime: new Date().toISOString(),
      uptime: Deno.osUptime(),
    };
  }

  generateAuthenticatedHealthCheckResponse(user: User) {
    const healthCheckResponse = this.generateHealthcheckResponse();

    return {
      ...healthCheckResponse,
      userName: user.name,
      userEmail: user.email,
    };
  }
}

export const healthcheckService = new HealthcheckService();
