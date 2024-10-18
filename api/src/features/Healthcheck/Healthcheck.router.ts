import { Router } from "@oak/oak";
import { Healthcheck } from "./Healthcheck.controller.ts";
import { withAuth } from "#infrastructure/Auth/Auth.middleware.ts";

const router = new Router();

router.post("/healthcheck", Healthcheck.healthcheck);
router.post("/healthcheck/auth", withAuth(Healthcheck.authHealthcheck));

export default router;
