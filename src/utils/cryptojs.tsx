import CryptoJS from "crypto-js";
import { config } from "config";

// function to encrypt data
export const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.CRYPTO_SECRET
  ).toString();
};

// function to decrypt data
export const decrypt = (encrypted: string): any => {
  return JSON.parse(
    CryptoJS.AES.decrypt(encrypted, config.CRYPTO_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  );
};
