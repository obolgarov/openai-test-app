import { AuthProviderSource } from "#types/apiTypes.ts";
import { GoogleSignInButton } from "#routes/auth/(_components)/GoogleSignInButton.tsx";

export interface SignInButtonsProps {
  authProviders: AuthProviderSource[];
}

export const SignInButtons = ({ authProviders }: SignInButtonsProps) => {
  const buttons = authProviders.map((provider) => {
    switch (provider) {
      case AuthProviderSource.Google:
        return (
          <li>
            <form action="/auth/google-auth">
              <GoogleSignInButton key={provider} type="submit" />
            </form>
          </li>
        );
      default:
        return null;
    }
  });

  return <ul>{buttons}</ul>;
};
