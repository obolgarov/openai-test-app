import { Application } from "@oak/oak";

import authRoutes from "#infrastructure/Auth/Auth.router.ts";
import healthcheckRoutes from "./features/Healthcheck/Healthcheck.router.ts";

const app = new Application();

app.use(authRoutes.routes());
app.use(healthcheckRoutes.routes());

export default app;
