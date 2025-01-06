import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { authService } from "#infrastructure/Auth/Auth.service.ts";
import { OAuth2ProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import { assert } from "@std/assert";
import { isOAuthProvider } from "#infrastructure/Auth/providers/Auth.provider.interface.ts";

export const setupOpenAPIRouter = async (app: Hono) => {
  const googleAuthProvider = authService.getProvider(
    OAuth2ProviderSource.Google,
  );

  assert(googleAuthProvider);
  assert(isOAuthProvider(googleAuthProvider));

  const googleAuthInfo = await googleAuthProvider.getAuthInfo();

  app.get(
    "/openapi",
    openAPISpecs(app, {
      documentation: {
        info: {
          title: "openai-test-app API",
          version: "0.0.1",
          description: "API for openai-test-app",
        },
        servers: [
          {
            url: "http://localhost:8081",
            description: "Local server",
          },
        ],
        components: {
          securitySchemes: {
            googleOAuth2: {
              type: "oauth2",
              flows: {
                authorizationCode: {
                  authorizationUrl: googleAuthInfo.authorizeUri,
                  tokenUrl: googleAuthInfo.tokenUri,
                  scopes: stringArrayToObjectKeys(googleAuthInfo.scopes),
                },
              },
            },
          },
        },
      },
    }),
  );

  app.get(
    "/docs",
    swaggerUI({
      url: "/openapi",
    }),
  );
};

// because reduce is giving issues when typing Record<string, string> as the initial type
// TODO: move to utilities area
const stringArrayToObjectKeys = (stringArray: string[]) => {
  const obj = {} as Record<string, "">;
  stringArray.forEach((item) => {
    obj[item] = "";
  });
  return obj;
};
