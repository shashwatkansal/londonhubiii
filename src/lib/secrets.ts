import crypto from "crypto";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "16ByteSecretKey!16ByteSecretKey!"; // Must be 32 characters for AES-256
const IV_LENGTH = 16; // AES uses a 16-byte IV

/**
 * Encrypts a value using AES-256-CBC encryption.
 * @param {string} value - The plaintext value to encrypt.
 * @returns {string} The encrypted value in the format IV:encryptedText.
 */
export const encryptValue = (value: string): string => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random Initialization Vector (IV)
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "utf-8") as crypto.CipherKey,
      iv
    );

    let encrypted = cipher.update(value, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Combine IV and encrypted value for storage
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("Error encrypting value:", error);
    throw new Error("Failed to encrypt value.");
  }
};

/**
 * Decrypts a value encrypted with AES-256-CBC encryption.
 * @param {string} encryptedValue - The encrypted value in the format IV:encryptedText.
 * @returns {string} The decrypted plaintext value.
 */
export const decryptValue = (encryptedValue: string): string => {
  try {
    const [ivHex, encryptedText] = encryptedValue.split(":");

    if (!ivHex || !encryptedText) {
      throw new Error("Invalid encrypted value format.");
    }

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "utf-8") as crypto.CipherKey,
      iv
    );

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Error decrypting value:", error);
    throw new Error("Failed to decrypt value.");
  }
};
