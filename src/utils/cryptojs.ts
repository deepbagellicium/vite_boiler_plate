import CryptoJS from "crypto-js";
import { config } from "config";

// Function to encrypt data with generic type
export function encrypt<T>(data: T): string {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.CRYPTO_SECRET
  ).toString();
}

// Function to decrypt data with generic type
export function decrypt<T>(encrypted: string): T {
  return JSON.parse(
    CryptoJS.AES.decrypt(encrypted, config.CRYPTO_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  ) as T;
}
