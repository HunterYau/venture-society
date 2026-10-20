"use client";

import { useEffect, useMemo, useState } from "react";

const people = [
  { name: "Hunter Yau", role: "President", photos: ["/team/hunter-2.webp", "/team/hunter-3.webp", "/team/hunter-4.webp"] },
  { name: "Collin Snodgrass", role: "Vice President", photos: ["/team/collin-1.webp", "/team/collin-2.webp", "/team/collin-3.webp", "/team/collin-4.webp"] },
  { name: "Noah Vaidyan", role: "Co-President", photos: ["/team/noah-1.webp", "/team/noah-2.webp", "/team/noah-3.webp", "/team/noah-4.webp"] },
  { name: "Noam Kail", role: "Secretary", photos: ["/team/noam-1.webp", "/team/noam-2.webp"] },
  { name: "Deain Kim", role: "Treasurer", photos: ["/team/deain-1.webp", "/team/deain-2.webp", "/team/deain-3.webp", "/team/deain-4.webp"] },
  { name: "Carter Jen", role: "Chief Marketing Manager", photos: ["/team/carter-1.webp", "/team/carter-2.webp"] },
  { name: "Ethan Lawrence", role: "Assistant Marketing Manager", photos: ["/team/ethan-1.webp"] },
];

const groups = ["students", "busy families", "new club members", "local creators", "school teams", "first-time founders"];
const problems = ["lost time", "confusing choices", "wasted materials", "missed opportunities", "poor communication", "a frustrating routine"];
const forms = ["a simpler routine", "a tiny digital tool", "a better shared system", "a one-day experiment", "a clearer service", "a low-cost prototype"];

function pick<T>(items: T[]) { return items[Math.floor(Math.random() * items.length)]; }
function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function PersonCard({ person }: { person: (typeof people)[number] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(Math.floor(Math.random() * person.photos.length)), [person.photos.length]);
  return (
    <article className="person-card">
      <button className="portrait" type="button" onClick={() => setIndex((value) => (value + 1) % person.photos.length)} aria-label={`Show another photo of ${person.name}`}>
        <img src={person.photos[index]} alt={`${person.name}, ${person.role}`} />
        <span>{index + 1} / {person.photos.length}</span>
      </button>
      <h3>{person.name}</h3>
      <div className="person-meta"><span>{person.role}</span><span>Grade 10</span></div>
      <p className="tap-note">Tap photo to cycle ↗</p>
    </article>
  );
}

export default function HomeExperience() {
  const [prompt, setPrompt] = useState<[string, string, string]>(["students", "lost time", "a simpler routine"]);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const time = useMemo(() => formatTime(seconds), [seconds]);

  useEffect(() => {
    if (!running) return;
    if (seconds === 0) { setRunning(false); return; }
    const id = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(id);
  }, [running, seconds]);

  return (
    <div className="home-page">
      <nav className="home-nav">
        <a className="site-brand" href="#top"><img src="/brand/venture-society-logo.webp" alt="Venture Society logo" /><span>Venture Society</span></a>
        <div className="home-nav-links"><a href="#system">System</a><a href="/about">About</a><a className="nav-pill" href="/join">Join / Oct 1</a></div>
      </nav>

      <header className="home-hero" id="top">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Peninsula High School · Student venture studio</div>
            <h1 className="hero-title">Venture<br /><span>Society.</span></h1>
            <p className="hero-copy">Ideas deserve a real test. We find worthwhile problems, build practical experiments, and learn by putting our thinking into motion.</p>
            <div className="hero-actions"><a className="round-button primary" href="/join">Join the club <span>↗</span></a><a className="round-button" href="/about">About the club <span>→</span></a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true"><div className="axis x" /><div className="axis y" /><div className="orbital-dot" /><img src="/venture-sculpture.webp" alt="" /></div>
        </div>
        <div className="hero-stats"><div><b>Oct 1</b><span>First meeting</span></div><div><b>Lunch</b><span>Meeting time</span></div><div><b>H40</b><span>Meeting room</span></div><div><b>Open</b><span>To Peninsula students</span></div></div>
      </header>

      <div className="kinetic-strip" aria-hidden="true"><div className="kinetic-track">{[0,1,2,3].map((i)=><span key={i}>Find<i />Test<i />Build<i />Pitch<i />Start<i /></span>)}</div></div>

      <main>
        <section className="home-section" id="system">
          <div className="section-head motion-reveal"><div className="kicker">01 / The venture system</div><div><h2>From observation<br />to evidence.</h2><p className="section-lead">A simple cycle for turning a loose thought into something people can see, use, and respond to.</p></div></div>
          <div className="process motion-reveal">{[["01","Find","Notice a frustration, inefficiency, or unmet need. Strong ventures begin with a real person and a real problem."],["02","Test","Challenge your assumptions with questions and quick research. Learn what matters before spending time on the wrong solution."],["03","Build","Create the smallest experiment that can teach you something: a sketch, mockup, landing page, survey, or working prototype."],["04","Pitch","Explain the problem, your solution, and the next test. Feedback becomes fuel for the next iteration."],["05","Start","When an idea earns real interest, turn it into a student startup: form the team, launch the first version, test demand, and improve the business through real use."]].map(([number,title,copy], index)=><article className="process-row" key={number}><div data-drift={index % 2 ? "1" : "-1"}>{number}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="home-section engine">
          <div className="engine-head motion-reveal"><div><div className="kicker">02 / Ideas in motion</div><h2>The venture<br />engine.</h2></div><p>We treat entrepreneurship as a repeatable practice, not a single flash of inspiration. Each pass through the system replaces guesswork with evidence.</p></div>
          <div className="engine-map motion-reveal">{[["Input","01","Problem","A specific friction worth removing."],["Signal","02","Person","The person who actually feels it."],["Action","03","Test","The fastest way to learn what is true."],["Output","04","Evidence","A clearer reason to continue or change."]].map(([label,num,title,copy], index)=><article className="engine-node" key={num}><small>{label}</small><b data-drift={index % 2 ? "1" : "-1"}>{num}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </section>

        <section className="home-section lab" id="lab">
          <div className="section-head motion-reveal"><div className="kicker">03 / Idea lab</div><div><h2>Make a thought<br />testable.</h2><p className="section-lead">Use the tools below to create a challenge, then explain it in sixty seconds.</p></div></div>
          <div className="lab-layout motion-reveal"><article className="lab-card blue"><div className="lab-label">Random venture prompt</div><div className="prompt">Help <span>{prompt[0]}</span> solve <span>{prompt[1]}</span> with <span>{prompt[2]}</span>.</div><button className="round-button" type="button" onClick={() => setPrompt([pick(groups), pick(problems), pick(forms)])}>New challenge <span>↻</span></button></article><article className="lab-card"><div className="lab-label">60-second pitch timer</div><div className="timer">{time}</div><p className="timer-note">Problem → Person → Solution → Next test</p><div className="lab-controls"><button className="round-button" type="button" onClick={()=>{if(running){setRunning(false)}else{if(seconds===0)setSeconds(60);setRunning(true)}}}>{running ? "Pause timer" : seconds === 0 ? "Start again" : "Start timer"}</button><button className="round-button" type="button" onClick={()=>{setRunning(false);setSeconds(60)}}>Reset</button></div></article></div>
        </section>

        <section className="home-section startup" id="startup"><div className="section-head motion-reveal"><div className="kicker">04 / From pitch to startup</div><div><h2>Make it a<br />business.</h2><p className="section-lead">A pitch is the beginning, not the finish line. When an idea shows real promise, members can turn it into a working student startup and learn what it takes to operate it.</p></div></div><div className="startup-bridge motion-reveal"><div>Good pitch</div><span>→</span><div>Real venture</div></div><div className="startup-grid motion-reveal">{[["01 / Demand","Prove people want it.","Talk to potential users, test whether the problem matters, and find evidence that people would choose the solution."],["02 / Team","Choose clear owners.","Divide responsibility across the product, operations, marketing, and money so the venture can move beyond one person."],["03 / Launch","Build the first version.","Create something small enough to use, sell, or deliver. Let real feedback shape what the team makes next."],["04 / Operate","Run it. Learn. Improve.","Track results, solve everyday problems, refine the offer, and decide whether the business deserves another cycle."]].map(([label,title,copy])=><article className="startup-card" key={label}><small>{label}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="home-section" id="team"><div className="team-intro motion-reveal"><div><div className="kicker">05 / The people</div><h2>Student-led.<br />Grade 10.</h2></div><p>Seven students keep the room moving. Tap any portrait to cycle through that person&apos;s photos.</p></div><div className="team-grid motion-reveal">{people.map((person)=><PersonCard person={person} key={person.name} />)}</div></section>

        <section className="home-section thursday" id="meeting"><div className="thursday-layout"><div className="motion-reveal"><div className="kicker">06 / Meetings</div><div className="meeting-mark">THURSDAYS<small>Every other week · Lunch · H40</small></div></div><div className="agenda motion-reveal">{[["00—10","Welcome","Meet the leadership team and learn what Venture Society will do this year."],["10—25","The plan","See the path from entrepreneurship workshops to team pitches and a possible student startup."],["25—35","Questions","Ask about meetings, teams, competitions, roles, or joining."],["ANYTIME","Join in","You do not need experience or a finished idea. Bring curiosity; the system supplies a place to start."]].map(([slot,title,copy])=><article className="agenda-row" key={slot}><b>{slot}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
      </main>

      <footer className="home-final"><div className="kicker">Your first move</div><h2>Join us.<br /><span>Oct 1.</span></h2><div className="final-bottom"><p>Lunch in H40. No experience required.</p><a className="round-button primary" href="/join">Join the club <span>↗</span></a></div><div className="home-footer"><div>Venture Society · PVPHS</div><img src="/brand/venture-society-logo.webp" alt="Venture Society logo" /><div>Ideas deserve a real test.</div></div></footer>
    </div>
  );
}
