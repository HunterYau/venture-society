import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { registrations } from "../../db/schema";
import { SiteNav } from "../site-shell";
import { isAdminSession } from "./admin-auth";
import { AdminSignIn } from "./admin-sign-in";
import { AdminSignOut } from "./admin-sign-out";
import { Roster } from "./roster";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    return (
      <div className="admin-page">
        <SiteNav dark />
        <main className="admin-wrap">
          <div className="kicker" style={{ color: "var(--ice)" }}>Protected roster</div>
          <div className="admin-head"><div><h1>President<br />access.</h1><p className="admin-note">Use the private administrator password to view student registrations.</p></div></div>
          <AdminSignIn />
        </main>
      </div>
    );
  }
  const rows = await getDb().select().from(registrations).orderBy(desc(registrations.createdAt), desc(registrations.id));
  return (
    <div className="admin-page">
      <SiteNav dark />
      <main className="admin-wrap">
        <div className="admin-head"><div><div className="kicker" style={{ color: "var(--ice)" }}>Private / President only</div><h1>Join<br />roster.</h1><p className="admin-note">Only the website owner can open this page. New registrations appear here automatically.</p></div><div className="admin-count">{rows.length}<small>Registered students</small></div></div>
        <Roster rows={rows} />
        <AdminSignOut />
      </main>
    </div>
  );
}
