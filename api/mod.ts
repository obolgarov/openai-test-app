import app from "./src/app.ts";
import environment from "#config/environment.ts";

const PORT = environment.server.port;

Deno.serve({ port: PORT }, app.fetch);
