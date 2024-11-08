import { Context } from "@oak/oak";
import { User } from "#infrastructure/Auth/entities/User.entity.ts";

export interface AuthenticatedContext<T extends Context = Context>
  extends Context {
  state: T["state"] & {
    user: User;
  };
}

export interface OpenIdConfig {
  issuer: string;
  authorization_endpoint: string;
  revocation_endpoint?: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
  jwks_uri: string;
  registration_endpoint?: string;
  scopes_supported?: string[];
  response_types_supported?: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  claims_supported?: string[];
}

export const isAutheticatedContext = (
  ctx: Context | AuthenticatedContext,
): ctx is AuthenticatedContext =>
  (ctx as AuthenticatedContext).state.user !== undefined;

export enum AuthProviderSource {
  Github = "Github",
  Google = "Google",
  Facebook = "Facebook",
}

export const isAuthProviderSource = (
  value: string,
): value is AuthProviderSource =>
  Object.values(AuthProviderSource).includes(value as AuthProviderSource);
