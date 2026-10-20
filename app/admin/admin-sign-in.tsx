"use client";

import { FormEvent, useState } from "react";

export function AdminSignIn() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Sign-in could not be completed.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in could not be completed.");
      setSubmitting(false);
    }
  }

  return (
    <form className="form-panel" onSubmit={submit} style={{ maxWidth: 520 }}>
      <label htmlFor="admin-password">Administrator password</label>
      <input id="admin-password" name="password" type="password" autoComplete="current-password" required />
      {error && <div className="form-message error" role="alert">{error}</div>}
      <button className="round-button primary" type="submit" disabled={submitting}>{submitting ? "Signing in…" : "Open roster"}<span>↗</span></button>
    </form>
  );
}
