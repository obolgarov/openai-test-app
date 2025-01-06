import { load } from "@std/dotenv";

const conf = await load({
  export: true,
});

export default {
  server: {
    env: conf.APP_ENV || "development",
    port: Number.parseInt(conf.PORT) || 8081,
  },
  authClients: {
    google: {
      clientId: conf.GOOGLE_OICD_CLIENT_ID || "",
      clientSecret: conf.GOOGLE_OICD_CLIENT_SECRET || "",
    },
    facebook: {
      clientId: conf.FACEBOOK_OICD_CLIENT_ID || "",
      clientSecret: conf.FACEBOOK_OICD_CLIENT_SECRET || "",
    },
    github: {
      clientId: conf.GITHUB_OICD_CLIENT_ID || "",
      clientSecret: conf.GITHUB_OICD_CLIENT_SECRET || "",
    },
  },
  openai: {
    clientId: conf.OPENAI_CLIENT_ID || "",
    clientSecret: conf.OPENAI_CLIENT_SECRET || "",
  },
};
