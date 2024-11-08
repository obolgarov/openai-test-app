import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import {
  AuthService,
  AuthServiceProviders,
} from "#infrastructure/Auth/Auth.service.ts";
import { AuthType } from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import type {
  OAuth2Info,
  OAuth2Provider,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import type { UserRespository } from "#infrastructure/Auth/repositories/User.repository.interface.ts";
import { User } from "#infrastructure/Auth/entities/User.entity.ts";
import { AuthProviderSource } from "#infrastructure/Auth/Auth.types.ts";

const MOCK_PROVIDER_SOURCE = "testProvider" as AuthProviderSource;

const MOCK_OAUTH2_INFO: OAuth2Info = {
  type: AuthType.OAuth2,
  authorizeUri: "test",
  revokeUri: "test",
};

const MOCK_USER: User = {
  email: "test@email.com",
  name: "Testy McTesterson",
};

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    const testProvider: OAuth2Provider = {
      getAuthInfo: () => Promise.resolve(MOCK_OAUTH2_INFO),
      exchangeCodeForToken: (code) => Promise.resolve(code),
    };

    const testUserRepository: UserRespository = {
      findUserByEmail: (_email) => Promise.resolve(MOCK_USER),
      saveUser: (_email, _user) => Promise.resolve(),
    };

    authService = new AuthService({
      [`${MOCK_PROVIDER_SOURCE}`]: testProvider,
    } as AuthServiceProviders, testUserRepository);
  });

  describe("getAllAuthInfo", () => {
    it("should return auth info for all auth providers", async () => {
      const allAuthInfo = await authService.getAllAuthInfo();

      expect(Object.keys(allAuthInfo).length).toBe(1);
      expect(Object.keys(allAuthInfo)).toContain("testProvider");
      expect(allAuthInfo[MOCK_PROVIDER_SOURCE]).toEqual(
        MOCK_OAUTH2_INFO,
      );
    });
  });
});
