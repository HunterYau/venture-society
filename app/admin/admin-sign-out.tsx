"use client";

import { useState } from "react";

export function AdminSignOut() {
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.assign("/");
  }

  return <button type="button" className="round-button" style={{ marginTop: 40 }} onClick={signOut} disabled={signingOut}>{signingOut ? "Signing out…" : "Sign out"}</button>;
}
