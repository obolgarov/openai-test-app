import { load } from "@std/dotenv";

const conf = await load({
  export: true,
});

export default {
  app: {
    port: Number.parseInt(conf.PORT) || 8080,
    api_url: conf.API_PATH || "",
  },
};
