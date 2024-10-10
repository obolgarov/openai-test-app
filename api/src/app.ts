import { Application } from "@oak/oak";

import authRoutes from "./infrastructure/Auth/Auth.router.ts";

const app = new Application();

app.use(authRoutes.routes());

export default app;
