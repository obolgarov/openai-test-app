export const enum AuthType {
  OAuth2 = "oauth2",
}

export interface AuthInfo {
  type: AuthType;
}

export interface OAuth2Info {
  type: AuthType.OAuth2;
  authorizeUri: string;
  revokeUri: string;
}

export interface AuthProvider {
  getAuthInfo(): Promise<AuthInfo>;
}

export interface OAuth2Provider {
  getAuthInfo(): Promise<OAuth2Info>;

  exchangeCodeForToken(code: string): Promise<string>;
}
