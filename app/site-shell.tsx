export function SiteNav({ dark = false }: { dark?: boolean }) {
  return (
    <nav className={`site-nav${dark ? " dark" : ""}`}>
      <a className="site-brand" href="/">
        <img src="/brand/venture-society-logo.webp" alt="Venture Society logo" />
        <span>Venture Society</span>
      </a>
      <div className="site-nav-links">
        <a href="/about">About</a>
        <a className="nav-pill" href="/join">Join the club</a>
      </div>
    </nav>
  );
}

export function PageFooter() {
  return (
    <footer className="page-footer">
      <div>
        <img src="/brand/venture-society-logo.webp" alt="" />
        <span>Venture Society · PVPHS</span>
      </div>
      <a href="/">Back to the main page ↑</a>
    </footer>
  );
}
