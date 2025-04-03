interface ConfigInterface {
  API_URL: string;
  CRYPTO_SECRET: string;
  CUSTOM_LOGS: boolean;
  AXIOS_LOGS: boolean;
}

export const config: ConfigInterface = {
  API_URL: import.meta.env.VITE_API_URL,
  CRYPTO_SECRET: import.meta.env.VITE_CRYPTO_SECRET,
  CUSTOM_LOGS: import.meta.env.VITE_CUSTOM_LOGS === "true" ? true : false,
  AXIOS_LOGS: import.meta.env.VITE_AXIOS_LOGS === "true" ? true : false,
};
