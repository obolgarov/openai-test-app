import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import environment from "#config/environment.ts";

export default defineConfig({
  plugins: [tailwind()],
  port: environment.app.port,
});
