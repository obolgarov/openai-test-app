import { Hono } from "hono";
import { AuthController } from "./Auth.controller.ts";

const authRouter = new Hono()
  .get("/info", AuthController.getAuthInfo);
// router.post("/auth/signin", AuthController.signIn);

export default authRouter;
