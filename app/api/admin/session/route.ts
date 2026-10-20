import { endAdminSession, isAdminConfigured, isAdminPassword, startAdminSession } from "../../../admin/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return Response.json({ error: "Admin sign-in is not configured yet." }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json() as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  if (!isAdminPassword(password)) {
    return Response.json({ error: "Incorrect administrator password." }, { status: 401 });
  }

  await startAdminSession();
  return Response.json({ ok: true });
}

export async function DELETE() {
  await endAdminSession();
  return Response.json({ ok: true });
}
