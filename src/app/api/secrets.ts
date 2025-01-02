import { secretsHelpers } from "@/app/database/models";
import { decryptPassword } from "@/lib/secrets";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secretId: string } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const secret = await secretsHelpers.getById(secretId);
    if (!secret) {
      return res.status(404).json({ error: "Secret not found" });
    }

    const decryptedValue = decryptPassword(secret.value);
    return res.status(200).json({ decryptedValue });
  } catch (error) {
    console.error("Error decrypting password:", error);
    return res.status(500).json({ error: "Failed to decrypt password." });
  }
}
