import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { registrations } from "../../../../db/schema";
import { isAdminSession } from "../../../admin/admin-auth";

export async function DELETE(request: Request) {
  if (!(await isAdminSession())) {
    return Response.json({ error: "Admin sign-in is required." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = typeof body === "object" && body !== null && "id" in body ? Number(body.id) : NaN;
  if (!Number.isSafeInteger(id) || id <= 0) {
    return Response.json({ error: "Invalid registration." }, { status: 400 });
  }

  await getDb().delete(registrations).where(eq(registrations.id, id));
  return Response.json({ ok: true });
}
