export interface HealthCheckResponse {
  env: string;
  currentTime: string;
  uptime: number;
}

export interface AuthenticatedHealthCheckResponse extends HealthCheckResponse {
  userName: string;
  userEmail: string;
}
