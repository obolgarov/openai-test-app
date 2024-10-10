import app from "./src/app.ts";
import environment from "#config/environment.ts";

const PORT = environment.server.port;

app.listen({
  port: PORT,
});

console.log(`server is running on port ${PORT}`);
