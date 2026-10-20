import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "venture_society_admin";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

type AdminConfig = { password: string; sessionSecret: string };

function config(): AdminConfig | null {
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  return password && sessionSecret ? { password, sessionSecret } : null;
}

function secureEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(expiresAt: number, sessionSecret: string): string {
  return createHmac("sha256", sessionSecret).update(String(expiresAt)).digest("base64url");
}

export function isAdminConfigured(): boolean {
  return config() !== null;
}

export function isAdminPassword(password: string): boolean {
  const currentConfig = config();
  return currentConfig ? secureEqual(password, currentConfig.password) : false;
}

export async function isAdminSession(): Promise<boolean> {
  const currentConfig = config();
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!currentConfig || !value) return false;

  const [expiresAtText, signature] = value.split(".");
  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() || !signature) return false;

  return secureEqual(signature, sign(expiresAt, currentConfig.sessionSecret));
}

export async function startAdminSession(): Promise<void> {
  const currentConfig = config();
  if (!currentConfig) throw new Error("Admin sign-in is not configured.");

  const expiresAt = Date.now() + SESSION_DURATION_MS;
  (await cookies()).set(COOKIE_NAME, `${expiresAt}.${sign(expiresAt, currentConfig.sessionSecret)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
