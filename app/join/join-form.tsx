"use client";

import { FormEvent, useState } from "react";

type FormState = { type: "success" | "error"; text: string } | null;

export default function JoinForm() {
  const [state, setState] = useState<FormState>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitting(true);
    setState(null);
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Registration could not be completed.");
      setState({ type: "success", text: "Your registration was successful." });
      formElement.reset();
    } catch (error) {
      setState({ type: "error", text: error instanceof Error ? error.message : "Registration could not be completed." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-panel" onSubmit={submit}>
      <h2>Reserve your place.</h2>
      <p>Use your school information so we can keep an accurate club roster and contact you about upcoming meetings.</p>
      {state && <div className={`form-message${state.type === "error" ? " error" : ""}`} role="status">{state.text}</div>}
      <div className="field"><label htmlFor="fullName">Full name</label><input id="fullName" name="fullName" autoComplete="name" placeholder="Your first and last name" maxLength={80} required /></div>
      <div className="field"><label htmlFor="schoolId">School ID</label><input id="schoolId" name="schoolId" inputMode="numeric" autoComplete="off" placeholder="Your student ID number" pattern="[0-9]{4,12}" title="Enter 4 to 12 numbers" required /></div>
      <div className="field"><label htmlFor="schoolEmail">School email</label><input id="schoolEmail" name="schoolEmail" type="email" autoComplete="email" placeholder="student@pvpusd.net" maxLength={120} required /></div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-10000px" }} />
      <p className="privacy-note">Your information is used only for Venture Society membership and is visible only in the president’s protected roster.</p>
      <button className="round-button primary" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Join Venture Society"}<span>↗</span></button>
    </form>
  );
}
