interface ConfigInterface {
  API_URL: string;
  CRYPTO_SECRET: string;
}

export const config: ConfigInterface = {
  API_URL: import.meta.env.VITE_API_URL,
  CRYPTO_SECRET: import.meta.env.VITE_CRYPTO_SECRET,
};
