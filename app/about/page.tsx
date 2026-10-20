import type { Metadata } from "next";
import { PageFooter, SiteNav } from "../site-shell";

export const metadata: Metadata = {
  title: "About Venture Society",
  description: "Learn how Venture Society moves from entrepreneurship workshops to team pitches and a possible student startup.",
};

const stages = [
  { number: "01", title: "Meet & understand", copy: "Our first meeting is Thursday, October 1 at lunch in H40. We’ll introduce the club, explain the year ahead, answer questions, and help everyone find a useful place to begin." },
  { number: "02", title: "Learn from builders", copy: "Across two or three meetings, we’ll hear from guest entrepreneurs—live when possible and through carefully selected recordings when scheduling requires it. Members can ask what actually happens between an idea and a functioning company." },
  { number: "03", title: "Practice the skills", copy: "Short games, learning sessions, and workshops will make entrepreneurship practical. We’ll work on identifying problems, interviewing potential users, developing solutions, understanding basic finances, and presenting ideas clearly." },
  { number: "04", title: "Form venture teams", copy: "Members will organize into teams of three to six people. Each team will choose a problem, develop a solution, test its assumptions, assign responsibilities, and produce a polished final pitch." },
  { number: "05", title: "Pitch & decide", copy: "Around meetings 10–11, if every team is ready by the midpoint of the club year, we may hold a pitch competition. Judges will evaluate the problem, evidence, solution, feasibility, and presentation. A prize may be awarded to the strongest team." },
  { number: "06", title: "Build the startup", copy: "If a pitch demonstrates real potential, the club can move beyond the competition and build it. We’ll appoint a CEO and other leadership roles, create an initial product or service, test demand, and work together to operate and improve the venture." },
];

export default function AboutPage() {
  return (
    <div className="interior-page">
      <SiteNav />
      <header className="interior-hero motion-reveal">
        <div className="kicker">About the club / The full plan</div>
        <h1 className="interior-title">Learn it.<br />Pitch it.<br /><span>Build it.</span></h1>
        <p className="interior-lead">Venture Society meets every other Thursday at lunch in H40. It is a student-led place to understand entrepreneurship by doing it—from the first workshop to a possible student-run business.</p>
        <div className="about-index"><div><small>Start</small><b>October 1</b></div><div><small>Meetings</small><b>Every other Thursday</b></div><div><small>Teams</small><b>3–6 students</b></div><div><small>End goal</small><b>A real venture</b></div></div>
      </header>
      <main className="page-content">
        <div className="kicker" style={{ marginBottom: 35 }}>The club-year journey</div>
        <div className="timeline">{stages.map((stage, index)=><article className="timeline-row motion-reveal" key={stage.number}><span data-drift={index % 2 ? "1" : "-1"}>{stage.number}</span><h2>{stage.title}</h2><p>{stage.copy}</p></article>)}</div>
      </main>
      <section className="about-callout motion-reveal">
        <div className="kicker">If a pitch becomes a business</div>
        <h2>A team needs<br />real owners.</h2>
        <p>The strongest idea may become one club venture. Roles will be assigned according to the needs of that business and the strengths of the students building it—not simply handed out as titles.</p>
        <div className="roles-grid"><div><small>Direction</small><b>CEO</b></div><div><small>Product</small><b>Product lead</b></div><div><small>Operations</small><b>COO</b></div><div><small>Growth</small><b>Marketing lead</b></div></div>
        <a className="round-button" href="/join" style={{ marginTop: 44 }}>Join the club <span>↗</span></a>
      </section>
      <PageFooter />
    </div>
  );
}
