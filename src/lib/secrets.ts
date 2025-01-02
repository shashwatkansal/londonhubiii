import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // Use an environment variable for the encryption key

export const encryptValue = (value: string): string => {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

export const decryptValue = (encryptedValue: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
