import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  PROFILE, EXPERIENCE, PROJECTS, SKILLS, CASE_STUDIES, CONFIDENTIAL_NOTE,
  HERO_STATS, FOCUS, PRINCIPLES, PLATFORM,
} from './content';

const OPEN_TO_ROLES = true;
const SITE_TITLE = `${PROFILE.name} - Senior Software Engineer, AI and Full-Stack`;

/* ─── tiny router: pathname + hash, no dependency ───────── */

const currentLocation = () => window.location.pathname.replace(/\/+$/, '') + window.location.hash;

function useLocation() {
  const [loc, setLoc] = useState(currentLocation);
  useEffect(() => {
    const onChange = () => setLoc(currentLocation());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);
  return loc;
}

function navigate(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

const Link = React.forwardRef(({ to, children, ...rest }, ref) => {
  const onClick = e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return <a ref={ref} href={to} onClick={onClick} {...rest}>{children}</a>;
});

const inline = text =>
  text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 1
      ? <code key={i}>{part.slice(1, -1)}</code>
      : part
  );

/* ─── shared bits ───────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="copy-email-btn">
      {copied ? 'Copied!' : PROFILE.email}
    </button>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span className="section-label-num mono-label">{String(number).padStart(2, '0')}</span>
      <span className="section-label-text">{children}</span>
    </div>
  );
}

function Section({ id, number, label, intro, children }) {
  const [ref, inView] = useInView(0.05);
  return (
    <section id={id} className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={number}>{label}</SectionLabel>
        <div className="section-rule" />
      </div>
      {intro && <div className="focus-intro"><p>{intro}</p></div>}
      {children}
    </section>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <Link to="/" className="nav-logo">VJ</Link>
      <div className="nav-links">
        <Link to="/#focus">Focus</Link>
        <Link to="/#work">Work</Link>
        <Link to="/#experience">Experience</Link>
        <Link to="/#platform">Systems</Link>
        <Link to="/#skills">Skills</Link>
        <a href="/resume.pdf" download className="nav-cta nav-cta--resume">Download CV</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="nav-cta">LinkedIn</a>
      </div>
    </nav>
  );
}

/* ─── home ──────────────────────────────────────────────── */

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className={`hero-content ${mounted ? 'hero-content--visible' : ''}`}>
          <div className="hero-eyebrow">
            <span className="mono-label">Available | Hyderabad / Bangalore / Remote</span>
          </div>
          <h1 className="hero-name">Vinay<br /><em>Jampana</em></h1>
          {OPEN_TO_ROLES && (
            <div className="hero-status">
              <span className="hero-status-dot" aria-hidden="true" />
              <span className="mono-label hero-status-text">Open to Senior AI / Full-Stack roles</span>
            </div>
          )}
          <p className="hero-title">Senior Software Engineer | AI + Full-Stack</p>
          <p className="hero-bio">{PROFILE.intro[0]}</p>
          <p className="hero-bio hero-bio--second">{PROFILE.intro[1]}</p>
          <div className="hero-links">
            <CopyEmailButton />
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link">LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hero-link">GitHub</a>
            <a href="/resume.pdf" download className="hero-cv-btn">Download CV ↓</a>
          </div>
        </div>
        <div className={`hero-avatar-wrap ${mounted ? 'hero-avatar-wrap--visible' : ''}`}>
          <div className="hero-avatar">
            <div className="hero-initials">VJ</div>
          </div>
          <div className="hero-avatar-ring" />
        </div>
      </div>
      <div className={`hero-stats ${mounted ? 'hero-stats--visible' : ''}`}>
        {HERO_STATS.map(([value, label], i) => (
          <React.Fragment key={label}>
            {i > 0 && <div className="hero-stat-div" />}
            <div className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function FocusCard({ area, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`focus-card ${inView ? 'focus-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="focus-card-top">
        <span className="focus-weight">{String(index + 1).padStart(2, '0')}</span>
        <span className="focus-label mono-label">{area.label}</span>
      </div>
      <h3 className="focus-title">{area.title}</h3>
      <p className="focus-copy">{area.copy}</p>
    </div>
  );
}

function WorkCard({ study, index }) {
  const [ref, inView] = useInView(0.08);
  return (
    <Link
      to={`/work/${study.slug}`}
      className={`work-card ${inView ? 'work-card--visible' : ''}`}
      style={{ transitionDelay: `${(index % 2) * 80}ms` }}
      ref={ref}
    >
      <div className="work-card-top">
        <span className="project-highlight mono-label">{study.group}</span>
        <span className="mono-label work-card-year">{study.year}</span>
      </div>
      <h3 className="work-card-title">{study.title}</h3>
      <p className="work-card-summary">{study.summary}</p>
      <div className="exp-tags">
        {study.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <span className="work-card-cta mono-label">Read case study →</span>
    </Link>
  );
}

function ExperienceItem({ item, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`exp-item ${inView ? 'exp-item--visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="exp-header">
        <div className="exp-header-left">
          <h3 className="exp-company">{item.company}</h3>
          <span className="exp-role">{item.role}</span>
          {item.note && <span className="exp-note mono-label">{item.note}</span>}
        </div>
        <div className="exp-header-right">
          <span className="exp-period mono-label">{item.period}</span>
          <span className="exp-location mono-label">{item.place}</span>
        </div>
      </div>
      <ul className="exp-bullets">
        {item.bullets.map((b, i) => (
          <li key={i} className="exp-bullet">
            {b.text}
            {b.to && <> <Link to={b.to} className="exp-more">Case study →</Link></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Principle({ p, index }) {
  const [ref, inView] = useInView(0.1);
  const body = (
    <>
      <span className="principle-num mono-label">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="principle-title">{p.title}</h3>
      <p className="principle-text">{p.text}</p>
      {p.to && <span className="work-card-cta mono-label">See the example →</span>}
    </>
  );
  const cls = `principle ${inView ? 'principle--visible' : ''}`;
  return p.to
    ? <Link to={p.to} className={cls} ref={ref}>{body}</Link>
    : <div className={cls} ref={ref}>{body}</div>;
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? 'project-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="project-card-top">
        <div>
          <div className="project-card-meta">
            <div className="project-highlight mono-label">{project.line}</div>
          </div>
          <h3 className="project-name">{project.name}</h3>
        </div>
        <div className="project-links">
          {project.links.map(([label, href], i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-link ${i > 0 ? 'project-link--muted' : ''}`}
            >
              {i === 0 ? `↗ ${label}` : label}
            </a>
          ))}
        </div>
      </div>
      <p className="project-desc">{project.text}</p>
      <div className="exp-tags">
        {project.stack.split(', ').map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function SkillGroup({ name, text, index, parentInView }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!parentInView) return;
    const t = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(t);
  }, [parentInView, index]);
  return (
    <div className={`skill-group ${visible ? 'skill-group--visible' : ''}`}>
      <h4 className="skill-category mono-label">{name}</h4>
      <p className="skill-text">{text}</p>
    </div>
  );
}

function Skills() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="skills" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={8}>Technical Skills</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="skills-grid">
        {SKILLS.map(([name, text], i) => (
          <SkillGroup key={name} name={name} text={text} index={i} parentInView={inView} />
        ))}
      </div>
    </section>
  );
}

function Education() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="education" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={9}>Education</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className={`edu-card ${inView ? 'edu-card--visible' : ''}`}>
        <div className="edu-main">
          <div className="edu-left">
            <h3 className="edu-institution">BITS Pilani</h3>
            <p className="edu-degree">B.E. (Hons) Mechanical Engineering</p>
            <p className="edu-note">Birla Institute of Technology and Science, one of India's premier technical universities</p>
          </div>
          <div className="edu-right">
            <span className="mono-label">2016 - 2020</span>
            <span className="edu-badge mono-label">Pilani Campus</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <div className="sections-wrapper">
        <Section
          id="focus"
          number={1}
          label="Engineering Focus"
          intro="I work where product, backend and AI meet: I take a business problem, decide the technical approach and where each piece should live, and stay with it through delivery and production."
        >
          <div className="focus-grid">
            {FOCUS.map((area, i) => <FocusCard key={area.label} area={area} index={i} />)}
          </div>
        </Section>

        <Section
          id="work"
          number={2}
          label="Case Studies"
          intro="Written from the code of systems I own at Zotok.ai. Each one covers the problem, the decision and the alternatives, what broke, and what I would change."
        >
          <div className="work-grid">
            {CASE_STUDIES.map((cs, i) => <WorkCard key={cs.slug} study={cs} index={i} />)}
          </div>
        </Section>

        <Section id="how" number={3} label="How I Work">
          <div className="principle-grid">
            {PRINCIPLES.map((p, i) => <Principle key={p.title} p={p} index={i} />)}
          </div>
        </Section>

        <Section id="experience" number={4} label="Work Experience">
          <div className="exp-list">
            {EXPERIENCE.map((item, i) => <ExperienceItem key={item.company} item={item} index={i} />)}
          </div>
        </Section>

        <Section
          id="platform"
          number={5}
          label="Systems I Work Across"
          intro="The product is a multi-tenant WhatsApp-commerce platform. Here is the map, and where my work sits on it."
        >
          <div className="platform">
            {PLATFORM.map(([layer, what, mine]) => (
              <div className="platform-row" key={layer}>
                <span className="platform-layer mono-label">{layer}</span>
                <span className="platform-what">{what}</span>
                <span className="platform-mine">{mine}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" number={6} label="Other Projects">
          <div className="projects-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
          </div>
        </Section>

        <Skills />
        <Education />
      </div>
    </>
  );
}

/* ─── case study page ───────────────────────────────────── */

function Block({ b }) {
  if (typeof b === 'string') return <p>{inline(b)}</p>;
  if (b.h) return <h3>{b.h}</h3>;
  if (b.list) return <ul>{b.list.map((x, i) => <li key={i}>{inline(x)}</li>)}</ul>;
  if (b.code) {
    return (
      <figure className="code">
        <figcaption className="mono-label">{b.code.caption}</figcaption>
        <pre><code>{b.code.text}</code></pre>
      </figure>
    );
  }
  if (b.pre) return <pre className="diagram">{b.pre}</pre>;
  if (b.table) {
    return (
      <div className="table-wrap">
        <table>
          <thead><tr>{b.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>
            {b.table.rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (b.note) return <p className="case-note">{b.note}</p>;
  return null;
}

function CaseStudy({ study }) {
  const index = CASE_STUDIES.indexOf(study);
  const next = CASE_STUDIES[index + 1];
  const prev = CASE_STUDIES[index - 1];
  return (
    <div className="sections-wrapper">
      <article className="case">
        <p className="case-crumb"><Link to="/#work" className="mono-label">← All case studies</Link></p>
        <div className="case-kicker">
          <span className="project-highlight mono-label">{study.group}</span>
          <span className="mono-label">{study.year}</span>
        </div>
        <h1 className="case-title">{study.title}</h1>
        <p className="case-dek">{study.dek}</p>

        <dl className="case-meta">
          {study.meta.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="mono-label">{k}</dt>
              <dd>{v}</dd>
            </React.Fragment>
          ))}
        </dl>

        <div className="case-facts">
          {study.facts.map(([n, label]) => (
            <div className="case-fact" key={label}>
              <span className="case-fact-value">{n}</span>
              <span className="case-fact-label mono-label">{label}</span>
            </div>
          ))}
        </div>

        {study.sections.map((section, si) => (
          <section className="case-section" key={section.title}>
            <h2>
              <span className="case-section-num mono-label">{String(si + 1).padStart(2, '0')}</span>
              {section.title}
            </h2>
            {section.body.map((b, i) => <Block key={i} b={b} />)}
          </section>
        ))}

        <p className="case-note">{CONFIDENTIAL_NOTE}</p>

        <nav className="case-pager">
          {prev ? <Link to={`/work/${prev.slug}`}><span className="mono-label">Previous</span>{prev.title}</Link> : <span />}
          {next ? <Link to={`/work/${next.slug}`} className="case-pager-next"><span className="mono-label">Next</span>{next.title}</Link> : <span />}
        </nav>
      </article>
    </div>
  );
}

function NotFound() {
  return (
    <div className="sections-wrapper">
      <article className="case">
        <h1 className="case-title">Page not found</h1>
        <p className="case-dek"><Link to="/">Back to the home page</Link></p>
      </article>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Vinay Jampana</span>
          <span className="footer-status mono-label">Open to Senior AI / Full-Stack roles</span>
        </div>
        <div className="footer-links">
          <a href={`mailto:${PROFILE.email}`} className="footer-link">{PROFILE.email}</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="/resume.pdf" className="footer-link">Resume</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="mono-label">Hyderabad | Bangalore | Remote</span>
      </div>
    </footer>
  );
}

export default function App() {
  const loc = useLocation();
  const [path, hash] = loc.split('#');
  const match = path.match(/^\/work\/([^/]+)$/);
  const study = match && CASE_STUDIES.find(cs => cs.slug === match[1]);

  useEffect(() => {
    document.title = study ? `${study.title} - ${PROFILE.name}` : SITE_TITLE;
  }, [study]);

  useEffect(() => {
    const el = hash && document.getElementById(hash);
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [path, hash]);

  let page;
  if (path === '' || path === '/') page = <Home />;
  else if (study) page = <CaseStudy study={study} />;
  else page = <NotFound />;

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>{page}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
