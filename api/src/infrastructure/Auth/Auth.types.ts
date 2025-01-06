import { User } from "#infrastructure/Auth/entities/User.entity.ts";
import { Context } from "hono";

export interface AuthenticatedContext<T extends Context = Context>
  extends Context {
  var: T["var"] & {
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

// focusing on oauth2 providers for now,but this is to test other strategies in the same system
export enum BaseAuthProviderSource {
  Stub = "stub",
}

export enum OAuth2ProviderSource {
  Github = "github",
  Google = "google",
  Facebook = "facebook",
}

export type AuthProviderSource = BaseAuthProviderSource | OAuth2ProviderSource;

export const isAutheticatedContext = (
  ctx: Context | AuthenticatedContext,
): ctx is AuthenticatedContext =>
  (ctx as AuthenticatedContext).var.user !== undefined;

export const isAuthProviderSource = (
  value: string,
): value is AuthProviderSource =>
  Object.values(BaseAuthProviderSource).includes(
    value as BaseAuthProviderSource,
  ) ||
  Object.values(OAuth2ProviderSource).includes(
    value as OAuth2ProviderSource,
  );
