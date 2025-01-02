import { secretsHelpers } from "@/app/database/models";
import { decryptValue } from "@/lib/secrets";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const secretId = url.searchParams.get("secretId");

    if (!secretId) {
      return NextResponse.json(
        { error: "Missing secretId parameter" },
        { status: 400 }
      );
    }

    const secret = await secretsHelpers.getById(secretId);
    if (!secret) {
      return NextResponse.json({ error: "Secret not found" }, { status: 404 });
    }

    console.log("Encrypted Value:", secret.value);

    const decryptedValue = decryptValue(secret.value);
    return NextResponse.json({ decryptedValue });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error decrypting password:", error.message);
      console.error("Stack Trace:", error.stack);
    } else {
      console.error("Error decrypting password:", error);
    }
    return NextResponse.json(
      { error: "Failed to decrypt password." },
      { status: 500 }
    );
  }
}
