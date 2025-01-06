import environment from "#config/environment.ts";
import { getAuthInfoData } from "#types/apiTypes.ts";

export const getAuthInfo = async () => {
  const apiRoot = environment.app.api_url;

  const authInfoUrl = `${apiRoot}/auth/info`;
  const response = await fetch(authInfoUrl, {
    method: "GET",
  });

  const data = await response.json();

  return data as getAuthInfoData;
};
