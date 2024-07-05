import { config } from "config";

export const log = (log: any) => {
  if (config.CUSTOM_LOGS) console.log(log);
};
