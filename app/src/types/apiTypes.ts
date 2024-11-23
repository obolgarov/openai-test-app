export const enum AuthType {
  OAuth2 = "oauth2",
}

export interface OAuth2Info {
  type: AuthType.OAuth2;
  authorizeUri: string;
  revokeUri: string;
}

export enum AuthProviderSource {
  Github = "github",
  Google = "google",
  Facebook = "facebook",
}

export type getAuthInfoData = Record<
  AuthProviderSource,
  OAuth2Info
>;
