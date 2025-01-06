import { AuthProviderSource, getAuthInfoData } from "#types/apiTypes.ts";

const POSSIBLE_AUTH_PROVIDERS: AuthProviderSource[] = [
  AuthProviderSource.Google,
];

export const parseCompatibleAuthProviders = (authInfo: getAuthInfoData) => {
  const compatibleAuthProviders = POSSIBLE_AUTH_PROVIDERS.filter((provider) =>
    authInfo[provider] !== undefined
  );

  return compatibleAuthProviders;
};
