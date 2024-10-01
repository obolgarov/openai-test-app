import { Router } from "@oak/oak";
import { AuthController } from "./infrastructure/auth/Auth.controller.ts";

const router = new Router();

router.post("/auth", AuthController.authenticate);

export default router;
