import { Router } from "@oak/oak";
import { AuthController } from "./Auth.controller.ts";

const router = new Router();

router.get("/auth/info", AuthController.getAuthInfo);
router.post("/auth/signin", AuthController.signIn);

export default router;
