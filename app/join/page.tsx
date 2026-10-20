import type { Metadata } from "next";
import { PageFooter, SiteNav } from "../site-shell";
import JoinForm from "./join-form";

export const metadata: Metadata = {
  title: "Join Venture Society",
  description: "Register for Venture Society at Peninsula High School.",
};

export default function JoinPage() {
  return (
    <div className="interior-page join-page">
      <SiteNav />
      <header className="interior-hero motion-reveal">
        <div className="kicker">Join Venture Society / Fall 2026</div>
        <h1 className="interior-title">Take the first<br /><span>step.</span></h1>
        <p className="interior-lead">Register now, then meet us every other Thursday at lunch in room H40. You do not need a business idea or any prior experience.</p>
      </header>
      <main className="page-content join-layout">
        <aside className="join-info motion-reveal">
          <div className="kicker">Meeting schedule</div>
          <div className="join-date schedule">EVERY<br />OTHER<br />THURSDAY<small>Lunch · H40</small></div>
          <div className="join-points"><div><b>Who</b><span>Peninsula students</span></div><div><b>Bring</b><span>Curiosity</span></div><div><b>Cost</b><span>Free</span></div><div><b>Experience</b><span>Not required</span></div></div>
        </aside>
        <div className="motion-reveal"><JoinForm /></div>
      </main>
      <PageFooter />
    </div>
  );
}
