const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All-in-One Lecture Platform</title>
  <style>
    :root {
      --bg: #0b1020;
      --card: #121a33;
      --text: #eef2ff;
      --muted: #b8c0e0;
      --accent: #6ea8fe;
      --accent-2: #8b5cf6;
      --ok: #10b981;
      --line: #263055;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(180deg, #0b1020 0%, #111936 40%, #0b1020 100%);
      color: var(--text);
      line-height: 1.55;
    }
    .container { width: min(1100px, 92vw); margin: 0 auto; }
    header {
      position: sticky;
      top: 0;
      background: rgba(11,16,32,0.8);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--line);
      z-index: 10;
    }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
    .brand { font-weight: 700; letter-spacing: .2px; }
    .brand span { color: var(--accent); }
    nav a { color: var(--muted); text-decoration: none; margin-left: 16px; font-size: 14px; }
    nav a:hover { color: var(--text); }
    .hero { padding: 72px 0 44px; }
    .pill { display: inline-block; border: 1px solid var(--line); color: var(--accent); padding: 6px 12px; border-radius: 999px; font-size: 12px; }
    h1 { font-size: clamp(30px, 5vw, 52px); margin: 14px 0; line-height: 1.08; }
    .subtitle { color: var(--muted); max-width: 760px; }
    .cta { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
    .btn {
      border: 1px solid var(--line);
      color: var(--text);
      text-decoration: none;
      padding: 10px 16px;
      border-radius: 10px;
      font-weight: 600;
    }
    .btn.primary { background: linear-gradient(90deg, var(--accent), var(--accent-2)); border: none; }
    section { padding: 26px 0; }
    h2 { font-size: 26px; margin-bottom: 6px; }
    .section-lead { color: var(--muted); margin-bottom: 16px; }
    .grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
    .card {
      background: rgba(18,26,51,.75);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
    }
    .card h3 { margin: 0 0 8px; font-size: 17px; }
    ul { margin: 8px 0 0 18px; padding: 0; color: var(--muted); }
    li { margin: 7px 0; }
    .timeline .card { border-left: 4px solid var(--accent); }
    .kpi { display: flex; gap: 14px; flex-wrap: wrap; }
    .kpi .card { flex: 1; min-width: 210px; }
    footer { border-top: 1px solid var(--line); margin-top: 30px; padding: 20px 0 36px; color: var(--muted); }
    .tag { color: var(--ok); font-weight: 700; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="brand">OneApp <span>Lecture</span></div>
        <div>
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#revenue">Revenue</a>
        </div>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <span class="pill">One App. Every Teacher. Every Course. Every Student.</span>
      <h1>All-in-One Lecture Platform</h1>
      <p class="subtitle">A centralized marketplace where students discover, compare, purchase, and watch courses from multiple educators in one place—while teachers scale without building their own tech stack.</p>
      <div class="cta">
        <a class="btn primary" href="#solution">Explore Platform Plan</a>
        <a class="btn" href="/health">Check API Health</a>
      </div>
    </section>

    <section id="problem">
      <h2>Current Market Problem</h2>
      <p class="section-lead">The online learning experience is fragmented for students and expensive for educators.</p>
      <div class="grid">
        <article class="card">
          <h3>Student Friction</h3>
          <ul><li>Multiple apps, logins, and support channels</li><li>Scattered payments and no single learning dashboard</li><li>Hard to compare teachers and course outcomes</li></ul>
        </article>
        <article class="card">
          <h3>Educator Friction</h3>
          <ul><li>High tech costs: app, hosting, security, support</li><li>Low discoverability beyond local market</li><li>Limited scaling for independent faculty</li></ul>
        </article>
      </div>
    </section>

    <section id="solution">
      <h2>Core Solution</h2>
      <p class="section-lead">A multi-vendor education marketplace with dedicated workflows for students, educators, and admins.</p>
      <div class="grid">
        <article class="card"><h3>Student Experience</h3><ul><li>Smart search by exam, subject, language, rating, price</li><li>HD streaming, bookmarks, progress, notes, cross-device sync</li><li>Community doubts, announcements, recommendations</li></ul></article>
        <article class="card"><h3>Educator Dashboard</h3><ul><li>KYC onboarding + bank verification</li><li>Upload videos/PDFs/tests, pricing, bundles, coupons</li><li>Analytics: revenue, watch-time, completion, refunds</li></ul></article>
        <article class="card"><h3>Admin Controls</h3><ul><li>Seller approval and quality moderation</li><li>Payout and dispute management</li><li>Anti-piracy: watermarking, device limits, suspicious activity checks</li></ul></article>
      </div>
    </section>

    <section id="roadmap" class="timeline">
      <h2>Phased Go-To-Market</h2>
      <div class="grid">
        <article class="card"><h3>Phase 1: Beachhead</h3><p>Launch with CA, CMA, CS where students already buy subject-wise paid lectures.</p></article>
        <article class="card"><h3>Phase 2: Scale</h3><p>Expand to UPSC, SSC, Banking, Railways, PSC + school and college tuition.</p></article>
        <article class="card"><h3>Phase 3: Diversify</h3><p>Add skill and hobby segments: coding, design, spoken English, fitness, music, photography.</p></article>
      </div>
    </section>

    <section id="revenue">
      <h2>Revenue Model</h2>
      <div class="kpi">
        <article class="card"><h3>Commission</h3><p>Transparent commission per course sale with early low rates to attract sellers.</p></article>
        <article class="card"><h3>Seller Plans</h3><p>Freemium-to-pro subscriptions for analytics, branding, and lower commission tiers.</p></article>
        <article class="card"><h3>Ads & Services</h3><p>Featured listings + value-added services like white-label apps and launch support.</p></article>
      </div>
    </section>

    <section>
      <h2>Strategic Outcome</h2>
      <p class="section-lead">The defensibility comes from <span class="tag">network effects</span>: more educators drive more content; more content attracts more students; more students attract more educators.</p>
    </section>
  </main>

  <footer>
    <div class="container">Built as a product blueprint website for the All-in-One Lecture Platform vision.</div>
  </footer>
</body>
</html>`);
});

app.get("/health", async (req, res) => {
  try {
    const dbTime = await pool.query("SELECT NOW() AS now");
    res.json({
      status: "ok",
      service: "all-in-one-lecture-platform-site",
      database: "connected",
      time: dbTime.rows[0].now,
    });
  } catch (err) {
    res.status(503).json({
      status: "degraded",
      service: "all-in-one-lecture-platform-site",
      database: "disconnected",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
