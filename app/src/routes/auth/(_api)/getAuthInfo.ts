import environment from "#config/environment.ts";
import { paths } from "#types/api-types.d.ts";

const x: paths["/auth/info"]["get"];

export const getAuthInfo = async () => {
  const apiRoot = environment.app.api_url;

  const authInfoUrl = `${apiRoot}/auth/info`;
  const response = await fetch(authInfoUrl, {
    method: "GET",
  });

  const data = await response.json();

  return data as getAuthInfoData;
};
