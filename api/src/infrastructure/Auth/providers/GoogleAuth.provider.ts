import {
  AuthType,
  type OAuth2Info,
  type OAuth2Provider,
} from "#infrastructure/Auth/providers/Auth.provider.interface.ts";
import { OpenIdConfig } from "#infrastructure/Auth/Auth.types.ts";
import environment from "#config/environment.ts";
import { assert, assertThrows } from "@std/assert";

const GOOGLE_OPENID_CONFIG =
  "https://accounts.google.com/.well-known/openid-configuration";

export class GoogleAuthProvider implements OAuth2Provider {
  private openIdConfig?: OpenIdConfig;
  private authInfo?: OAuth2Info;

  type = AuthType.OAuth2;

  scopes = ["openid", "email", "profile"];

  async getAuthInfo() {
    if (!this.authInfo) {
      const [authorizeUri, revokeUri, tokenUri] = await Promise.all([
        this.getAuthorizeUri(),
        this.getRevokeUri(),
        this.getTokenUri(),
      ]);

      this.authInfo = {
        authorizeUri,
        revokeUri,
        tokenUri,
        scopes: this.scopes,
      };
    }

    assert(this.authInfo.authorizeUri);
    assert(this.authInfo.revokeUri);
    assert(this.authInfo.tokenUri);
    assert(this.authInfo.scopes);

    return this.authInfo;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    return await Promise.resolve(code);
  }

  private async getOpenIdConfig(): Promise<OpenIdConfig> {
    if (!this.openIdConfig) {
      this.openIdConfig = await this.fetchOpenIdConfig();
    }
    return this.openIdConfig;
  }

  private async fetchOpenIdConfig(): Promise<OpenIdConfig> {
    const result = await fetch(GOOGLE_OPENID_CONFIG);

    const body = await result.json();

    this.openIdConfig = body;
    return body;
  }

  private async getAuthorizeUri() {
    assert(environment.authClients.google.clientId);

    const config = await this.getOpenIdConfig();
    assert(
      config.authorization_endpoint,
      "Google authorization endpoint not found",
    );

    const params = new URLSearchParams();
    params.set("client_id", environment.authClients.google.clientId);
    params.set("response_type", "code");
    params.set("scope", "openid email profile");

    const url = `${config.authorization_endpoint}?${params.toString()}`;

    return url;
  }

  private async getRevokeUri() {
    const config = await this.getOpenIdConfig();
    assert(config.revocation_endpoint, "Google revocation endpoint not found");

    return config.revocation_endpoint;
  }

  private async getTokenUri() {
    const config = await this.getOpenIdConfig();
    assert(config.token_endpoint, "Google revocation endpoint not found");

    return config.token_endpoint;
  }
}
