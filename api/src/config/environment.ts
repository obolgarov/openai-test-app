import { load } from "@std/dotenv";

const conf = await load({
  export: true,
});


export default {


  authClients: {
    google: {
      clientId: conf.GOOGLE_CLIENT_ID || "",
      clientSecret: conf.GOOGLE_CLIENT_SECRET || ""
    },
    facebook: {
      clientId: conf.FACEBOOK_CLIENT_ID || "",
      clientSecret: conf.FACEBOOK_CLIENT_SECRET || "",
    },
    github: {
      clientId: conf.GITHUB_CLIENT_ID || "",
      clientSecret: conf.GITHUB_CLIENT_SECRET || "",
    },
  },
  openai: {
    clientId: conf.OPENAI_CLIENT_ID || "",
    clientSecret: conf.OPENAI_CLIENT_SECRET || "",
  },
};