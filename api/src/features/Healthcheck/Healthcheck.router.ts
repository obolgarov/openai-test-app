import { Router } from "@oak/oak";
import { Healthcheck } from "./Healthcheck.controller.ts";

const router = new Router();

router.post("/healthcheck", Healthcheck.healthcheck);
router.post("/healthcheck/auth", Healthcheck.authHealthcheck);

export default router;
