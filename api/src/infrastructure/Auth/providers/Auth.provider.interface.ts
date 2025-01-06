export const enum AuthType {
  OAuth2 = "oauth2",
}

// empty for now in case I'd want to expand it
// deno-lint-ignore ban-types
export type AuthInfo = {};

export interface OAuth2Info extends AuthInfo {
  authorizeUri: string;
  revokeUri: string;
  tokenUri: string;
  scopes: string[];
}

export interface BaseAuthProvider {
  type: AuthType;

  getAuthInfo(): Promise<AuthInfo>;
}

export interface OAuth2Provider extends BaseAuthProvider {
  type: AuthType.OAuth2;

  scopes: string[];

  getAuthInfo(): Promise<OAuth2Info>;

  exchangeCodeForToken(code: string): Promise<string>;
}

export type AuthProvider = BaseAuthProvider | OAuth2Provider;

export const isOAuthProvider = (
  authProvider: AuthProvider,
): authProvider is OAuth2Provider => authProvider.type === AuthType.OAuth2;
