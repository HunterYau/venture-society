import { registrations } from "../../../db/schema";
import { getDb } from "../../../db";

type JoinPayload = {
  fullName?: unknown;
  schoolId?: unknown;
  schoolEmail?: unknown;
  website?: unknown;
};

function value(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as JoinPayload;
    if (value(payload.website)) return Response.json({ ok: true }, { status: 201 });

    const fullName = value(payload.fullName).replace(/\s+/g, " ");
    const schoolId = value(payload.schoolId);
    const schoolEmail = value(payload.schoolEmail).toLowerCase();

    if (fullName.length < 3 || fullName.length > 80) {
      return Response.json({ error: "Enter your full first and last name." }, { status: 400 });
    }
    if (!/^\d{4,12}$/.test(schoolId)) {
      return Response.json({ error: "Enter a valid school ID using numbers only." }, { status: 400 });
    }
    if (!/^[^\s@]+@pvpusd\.net$/i.test(schoolEmail) || schoolEmail.length > 120) {
      return Response.json({ error: "Use your @pvpusd.net school email." }, { status: 400 });
    }

    const db = getDb();
    await db.insert(registrations).values({ fullName, schoolId, schoolEmail });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("duplicate key") || message.includes("unique")) {
      return Response.json({ error: "That school ID or email is already registered." }, { status: 409 });
    }
    return Response.json({ error: "Registration is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
