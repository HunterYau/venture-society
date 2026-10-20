"use client";

import { useState } from "react";

export type Registration = {
  id: number;
  fullName: string;
  schoolId: string;
  schoolEmail: string;
  createdAt: string;
};

export function Roster({ rows }: { rows: Registration[] }) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function removeRegistration(row: Registration) {
    const confirmed = window.confirm(`Remove ${row.fullName} from the Venture Society roster? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(row.id);
    setError(null);
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "The registration could not be removed.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The registration could not be removed.");
      setDeletingId(null);
    }
  }

  if (rows.length === 0) return <div className="empty-admin">No students have registered yet. New submissions will appear here automatically.</div>;
  return (
    <>
      {error && <div className="admin-error" role="alert">{error}</div>}
      <table className="registration-table">
        <thead><tr><th>Name</th><th>School ID</th><th>School email</th><th>Submitted</th><th><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{rows.map((row)=><tr key={row.id}><td>{row.fullName}</td><td>{row.schoolId}</td><td>{row.schoolEmail}</td><td>{new Date(`${row.createdAt}Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td><td className="registration-actions"><button type="button" className="delete-registration" disabled={deletingId !== null} onClick={() => removeRegistration(row)}>{deletingId === row.id ? "Removing…" : "Delete"}</button></td></tr>)}</tbody>
      </table>
    </>
  );
}
