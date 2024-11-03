import { Router } from "@oak/oak";
import { Healthcheck } from "./Healthcheck.controller.ts";
import { withAuth } from "#infrastructure/Auth/Auth.middleware.ts";

const router = new Router();

router.get("/healthcheck", Healthcheck.healthcheck);
router.get("/healthcheck/auth", withAuth(Healthcheck.authHealthcheck));

export default router;
