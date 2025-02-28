import Client, { Environment, Local } from "bt-weapons-client-ts";
import { env } from "~/env";

const getRequestClient = async () => {
  const targetEnv = process.env.NODE_ENV === "development" ? Local : Environment("staging");

  return new Client(targetEnv, {
    auth: {
      authorization: `Bearer ${env.BT_WEAPONS_CLIENT_API_KEY}`,
    },
    // requestInit: { headers: { Authorization: `Bearer ${env.BT_WEAPONS_CLIENT_API_KEY}` } },
  });
};

export default getRequestClient;
