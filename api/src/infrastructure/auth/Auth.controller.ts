import { GoogleAuthProvider } from "../providers/GoogleAuth.provider.ts";
import { AuthMemoryRespository } from "../repositories/AuthMemory.repository.ts";
import { AuthService } from "../services/Auth.service.ts";
import { Context } from "@oak/oak";

const authService = new AuthService({
  google: new GoogleAuthProvider(),
}, new AuthMemoryRespository());

export class AuthController {
  static async authenticate(ctx: Context) {
    const data = await ctx.request.body.json();
    const { provider, token } = data as { provider: string; token: string };

    try {
      const user = await authService.authenticate(provider, token);
      if (user) {
        ctx.response.status = 200;
        ctx.response.body = user;
      } else {
        ctx.response.status = 401;
        ctx.response.body = { message: "Authentication failed" };
      }
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: error.message };
    }
  }
}
