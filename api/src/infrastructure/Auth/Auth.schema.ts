import { z } from "zod";
import { OAuth2ProviderSource } from "#infrastructure/Auth/Auth.types.ts";
import { type OAuth2Info } from "#infrastructure/Auth/providers/Auth.provider.interface.ts";

const OAuth2InfoSchema = z.object({
  authorizeUri: z.string(),
  revokeUri: z.string(),
  tokenUri: z.string(),
  scopes: z.array(z.string()),
}) satisfies z.ZodType<OAuth2Info>;

export const AuthInfoResponseSchema = z.record(
  z.nativeEnum(OAuth2ProviderSource),
  OAuth2InfoSchema,
) satisfies z.ZodType<Record<OAuth2ProviderSource, OAuth2Info>>;
