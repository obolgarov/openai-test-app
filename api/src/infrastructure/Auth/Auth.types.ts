import { Application, Context } from "@oak/oak";
import type { User } from "#infrastructure/Auth/models/User.model.ts";

export interface AuthenticatedContext<T extends Context = Context>
  extends Context {
  state: T["state"] & {
    user: User;
  };
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
