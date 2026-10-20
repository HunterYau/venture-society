import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is unavailable. Connect a Neon database in Vercel and add its DATABASE_URL environment variable."
    );
  }

  return drizzle(databaseUrl, { schema });
}
