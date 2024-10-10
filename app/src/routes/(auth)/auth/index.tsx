export default function AuthPage() {
  return (
    <div class="h-full w-full flex items-center justify-center">
      <div class="h-auto w-auto flex gap-2 items-start justify-start flex-col">
        <p>Auth Page</p>
        <form action="/auth/google-auth">
          <button
            type="submit"
            class="border-2 rounded-md border-solid border-black p-2 hover:bg-gray-300"
            value="google"
          >
            Google Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
