import { defineRoute } from "$fresh/server.ts";
import { getAuthInfo } from "#routes/auth/(_api)/getAuthInfo.ts";
import { parseCompatibleAuthProviders } from "#routes/auth/(_utils)/parseAuthCompatibiltiy.ts";
import { SignInButtons } from "#routes/auth/(_components)/SignInButtons.tsx";

export default defineRoute(async () => {
  const authInfo = await getAuthInfo();
  const compatibleAuthProviders = parseCompatibleAuthProviders(authInfo);

  return (
    <div class="h-full w-full flex items-center justify-center">
      <div class="h-auto w-auto flex gap-2 items-start justify-start flex-col">
        <p>Auth Page</p>

        <SignInButtons authProviders={compatibleAuthProviders} />
      </div>
    </div>
  );
});
