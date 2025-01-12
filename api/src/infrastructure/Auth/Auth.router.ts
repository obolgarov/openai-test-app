import { Hono } from "hono";
import { AuthController } from "./Auth.controller.ts";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { AuthInfoResponseSchema } from "./Auth.schema.ts";

const authRouter = new Hono()
  .get(
    "/info",
    describeRoute({
      description: "Simple data to show the system as working properly",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "json": { schema: resolver(AuthInfoResponseSchema) },
          },
        },
      },
    }),
    AuthController.getAuthInfo,
  );
// router.post("/auth/signin", AuthController.signIn);

export default authRouter;
