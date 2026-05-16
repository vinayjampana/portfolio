import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// Set to false when not actively seeking roles
const OPEN_TO_ROLES = true;

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
    navigator.clipboard.writeText('vinayvarma541@gmail.com').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="copy-email-btn">
      {copied ? 'Copied!' : 'vinayvarma541@gmail.com'}
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

const EXPERIENCE = [
  {
    company: 'Zotok.ai',
    role: 'Senior Software Engineer / Frontend Lead',
    period: 'May 2023 - Present',
    location: 'Hyderabad',
    note: 'B2B SaaS | WhatsApp Business Platform | Sun Pharma | UltraTech | J&J | Samunnati',
    bullets: [
      'Built and owned real-time communication across service and UI layers: NestJS APIs, PubNub/Centrifuge integration, channel lifecycle modeling, token-based authorization, and responsive React messaging for 2,000+ channels per account.',
      'Designed workspace-level RBAC end-to-end: PostgreSQL role and permission schema, NestJS guard/middleware pipeline, token-embedded permission resolution, and frontend enforcement for enterprise customer workspaces.',
      'Architected Webpack 5 Module Federation across 6 remote micro-frontends and a shell host; configured singleton shared dependencies for RTK Store, i18n, and realtime SDKs to avoid duplicate bundle loading and runtime version conflicts.',
      'Led frontend performance overhaul: custom Nx executor, production-mode enforcement, route and remote lazy loading, vendor chunk splitting, and browser cache policy; reduced initial load from 15-30s to about 1.5s.',
      'Promoted to Lead within the first year; built a 5-engineer team, owned hiring for 3 positions, ran architecture reviews, and shipped a 40+ component React + TypeScript design system across 9 micro-apps.',
    ],
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Module Federation', 'Nx', 'Realtime Systems'],
  },
  {
    company: 'Sumeru Software',
    role: 'Senior Developer',
    period: 'Aug 2022 - Jan 2023',
    location: 'Bengaluru',
    note: '',
    bullets: [
      'Built a role-based CRM from scratch with React, Redux Toolkit, and Node.js; designed modular dashboard architecture with permission-based rendering and state isolation, then shipped the MVP in 4 months with a 4-member team.',
    ],
    tags: ['React', 'Redux Toolkit', 'Node.js'],
  },
  {
    company: 'Aerchain',
    role: 'SDE 1 / Intern',
    period: 'Jul 2019 - Jan 2022',
    location: 'Bengaluru',
    note: 'B2B SaaS | Procurement tech',
    bullets: [
      'Joined as intern and converted to SDE1 after taking ownership of complex modules, including real-time auctions with optimistic UI and server reconciliation, plus barcode-based inventory flows with offline PWA support.',
    ],
    tags: ['React', 'PWA', 'Service Workers'],
  },
];

const FOCUS_AREAS = [
  {
    label: 'Frontend Systems',
    weight: '40%',
    title: 'Micro-frontends, design systems, performance',
    copy: 'React and TypeScript architecture for multi-tenant SaaS: Module Federation, Nx libraries, shared state boundaries, design systems, and bundle budgets that keep product teams moving without degrading UX.',
  },
  {
    label: 'Backend Engineering',
    weight: '40%',
    title: 'APIs, permissions, realtime infrastructure',
    copy: 'Service ownership across NestJS, Node.js, PostgreSQL, REST contracts, token-based auth, event routing, and realtime communication systems that support enterprise-grade workspace behavior.',
  },
  {
    label: 'GenAI Engineering',
    weight: '20%',
    title: 'LLM-assisted workflows with cost controls',
    copy: 'Pragmatic AI integration: structured scoring, prompt design, OpenAI-compatible APIs, TF-IDF pre-ranking, batch evaluation, and dashboards that expose model decisions instead of hiding them.',
  },
];

const STATUS_LABEL = { live: 'Live', npm: 'npm', wip: 'In Progress' };

const PROJECTS = [
  {
    name: 'vite-plugin-bundle-size-tracker',
    tagline: 'Published npm Package',
    description: 'Tracks and compares Vite bundle sizes across builds, then warns before regressions ship. Built after reducing a 9MB JS bundle to 5MB at Zotok.ai so Vite teams can enforce bundle budgets without custom CI scripts.',
    points: [
      'Tracks bundle size history across N builds',
      'Compares current build against rolling average',
      'Configurable threshold alerts, warns at +10% by default',
      'JSON report output for CI/CD pipelines',
      'Zero config, works out of the box',
    ],
    tags: ['TypeScript', 'Vite Plugin API', 'Node.js'],
    links: { npm: 'https://www.npmjs.com/package/vite-plugin-bundle-size-tracker', repo: 'https://github.com/vinayjampana/vite-plugin-bundle-size-tracker' },
    highlight: 'npm published',
    status: 'npm',
  },
  {
    name: 'Tiny Tracker',
    tagline: 'tinytracker.in',
    description: 'Minimalist daily habit and routine tracker with a clean Today view, habit streaks, visual progress heatmap, and offline-capable PWA support.',
    points: [
      'Next.js 16 App Router + React 19',
      'Firebase Auth (Email + Google) + Firestore',
      'Per-user data isolation via Firebase Security Rules',
      'PWA, installable and offline-capable',
      'IST timezone, built for Indian users',
    ],
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind', 'Shadcn/ui'],
    links: { live: 'https://tinytracker.in', repo: 'https://github.com/vinayjampana/habit-and-routine-tracker' },
    highlight: 'live',
    status: 'live',
  },
  {
    name: 'RoleMiner',
    tagline: 'GenAI Job Discovery Pipeline',
    description: 'India-first job discovery system that scrapes multiple ATS sources, filters and ranks roles locally, then uses one LLM batch call for structured fit scoring and reasoning.',
    points: [
      'Python 3.11 + FastAPI + SQLite, async HTTPX scrapers for 5 ATS types',
      'Pipeline: rule filter -> TF-IDF cosine rank -> LLM batch score',
      'SSE /stream/{run_id}: live events while running, DB replay for finished runs',
      'React 18 + Vite + TypeScript + React Query dashboard',
      'OpenAI-compatible model interface with structured output parsing',
      'Cost: less than $0.002 per run',
    ],
    tags: ['Python', 'FastAPI', 'SQLite', 'scikit-learn', 'LLM APIs', 'React', 'Docker'],
    links: { repo: 'https://github.com/vinayjampana/role-miner' },
    highlight: 'gen ai + full-stack',
    status: 'wip',
  },
];

// Update article URLs and titles with real Medium links once published
const ARTICLES = [
  {
    title: 'Building Micro-frontends with Webpack 5 Module Federation',
    excerpt: 'How we decomposed a monolithic React app into 6 independently deployable micro-frontends, shared RTK Store and i18n as singletons, and kept CI pipelines free of version conflicts.',
    readTime: '8 min read',
    date: 'Jan 2024',
    url: 'https://medium.com/@vinayjampana',
    tag: 'Architecture',
  },
  {
    title: 'From 30s to 1.5s: A Frontend Performance Overhaul',
    excerpt: 'A systematic breakdown of a slow enterprise SaaS app — custom Nx executors, route-level code splitting, vendor chunk strategy, and browser cache policies that held in production.',
    readTime: '6 min read',
    date: 'Mar 2024',
    url: 'https://medium.com/@vinayjampana',
    tag: 'Performance',
  },
];

const SKILLS = [
  { category: 'Frontend', core: ['React 18/19', 'TypeScript', 'Next.js'], familiar: ['Redux Toolkit', 'Context API'] },
  { category: 'Backend', core: ['NestJS', 'Node.js', 'PostgreSQL'], familiar: ['REST APIs', 'JWT / Token Auth'] },
  { category: 'Architecture', core: ['Nx Monorepo', 'Module Federation', 'Micro-frontends'], familiar: ['Event-driven Systems', 'Modular Frontends'] },
  { category: 'GenAI', core: ['OpenAI-compatible APIs', 'Structured Outputs', 'Prompt Design'], familiar: ['LLM Batch Scoring', 'TF-IDF Pre-ranking'] },
  { category: 'Quality', core: ['Vitest', 'Jest', 'API E2E'], familiar: ['Coverage Thresholds', 'CI Budget Gates'] },
  { category: 'DevOps', core: ['GitHub Actions', 'CI/CD', 'Docker Compose'], familiar: ['Vercel', 'Preview Deployments'] },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <span className="nav-logo">VJ</span>
      <div className="nav-links">
        <a href="#focus">Focus</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        {/* Place your resume at public/resume.pdf */}
        <a href="/resume.pdf" download className="nav-cta nav-cta--resume">
          Download CV
        </a>
        <a
          href="https://linkedin.com/in/vinay-jampana"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}

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
              <span className="mono-label hero-status-text">Open to Senior Frontend / SDE2–SDE3 roles</span>
            </div>
          )}
          <p className="hero-title">Senior Software Engineer | Frontend + Backend + GenAI</p>
          <p className="hero-bio">
            Senior engineer with 5+ years building enterprise multi-tenant SaaS end-to-end:
            React and TypeScript frontends, NestJS and PostgreSQL services, realtime messaging,
            RBAC systems, and focused GenAI workflows where LLMs add measurable leverage.
          </p>
          <div className="hero-links">
            <CopyEmailButton />
            <a href="https://linkedin.com/in/vinay-jampana" target="_blank" rel="noopener noreferrer" className="hero-link">
              LinkedIn
            </a>
            <a href="https://github.com/vinayjampana" target="_blank" rel="noopener noreferrer" className="hero-link">
              GitHub
            </a>
            <a href="https://medium.com/@vinayjampana" target="_blank" rel="noopener noreferrer" className="hero-link">
              Medium
            </a>
            {/* Place your resume at public/resume.pdf */}
            <a href="/resume.pdf" download className="hero-cv-btn">
              Download CV ↓
            </a>
          </div>
        </div>
        <div className={`hero-avatar-wrap ${mounted ? 'hero-avatar-wrap--visible' : ''}`}>
          {/* Drop your photo at public/photo.jpg to replace this avatar */}
          <div className="hero-avatar">
            <img
              src="/photo.jpg"
              alt="Vinay Jampana"
              className="hero-photo"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="hero-initials" style={{ display: 'none' }}>VJ</div>
          </div>
          <div className="hero-avatar-ring" />
        </div>
      </div>
      <div className={`hero-stats ${mounted ? 'hero-stats--visible' : ''}`}>
        <div className="hero-stat">
          <span className="hero-stat-value">5+</span>
          <span className="hero-stat-label">Years building SaaS</span>
        </div>
        <div className="hero-stat-div" />
        <div className="hero-stat">
          <span className="hero-stat-value">2,000+</span>
          <span className="hero-stat-label">Realtime channels/account</span>
        </div>
        <div className="hero-stat-div" />
        <div className="hero-stat">
          <span className="hero-stat-value">15-30s</span>
          <span className="hero-stat-value hero-stat-value--arrow">to</span>
          <span className="hero-stat-value hero-stat-value--accent">1.5s</span>
          <span className="hero-stat-label">Page Load</span>
        </div>
        <div className="hero-stat-div" />
        <div className="hero-stat">
          <span className="hero-stat-value">40+</span>
          <span className="hero-stat-label">Component Library</span>
        </div>
        <div className="hero-stat-div" />
        <div className="hero-stat">
          <span className="hero-stat-value">40/40/20</span>
          <span className="hero-stat-label">Frontend / Backend / GenAI</span>
        </div>
      </div>
    </section>
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
          <span className="exp-location mono-label">{item.location}</span>
        </div>
      </div>
      <ul className="exp-bullets">
        {item.bullets.map((b, i) => (
          <li key={i} className="exp-bullet">{b}</li>
        ))}
      </ul>
      <div className="exp-tags">
        {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function Experience() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="experience" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={2}>Work Experience</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="exp-list">
        {EXPERIENCE.map((item, i) => (
          <ExperienceItem key={item.company} item={item} index={i} />
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
        // <span className="focus-weight">{area.weight}</span>
        <span className="focus-label mono-label">{area.label}</span>
      </div>
      <h3 className="focus-title">{area.title}</h3>
      <p className="focus-copy">{area.copy}</p>
    </div>
  );
}

function Focus() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="focus" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={1}>Engineering Focus</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="focus-intro">
        <p>
          I position myself as a senior product engineer: strong frontend systems, real backend ownership,
          and selective GenAI engineering for internal tools, ranking, scoring, and workflow acceleration.
        </p>
      </div>
      <div className="focus-grid">
        {FOCUS_AREAS.map((area, i) => (
          <FocusCard key={area.label} area={area} index={i} />
        ))}
      </div>
    </section>
  );
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
            <div className="project-highlight mono-label">{project.highlight}</div>
            {project.status && (
              <span className={`project-status-badge project-status-badge--${project.status} mono-label`}>
                {STATUS_LABEL[project.status]}
              </span>
            )}
          </div>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>
        <div className="project-links">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
              ↗ Live
            </a>
          )}
          {project.links.npm && (
            <a href={project.links.npm} target="_blank" rel="noopener noreferrer" className="project-link">
              ↗ npm
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="project-link project-link--muted">
              GitHub
            </a>
          )}
        </div>
      </div>
      <p className="project-desc">{project.description}</p>
      <ul className="project-points">
        {project.points.map((p, i) => (
          <li key={i} className="project-point">{p}</li>
        ))}
      </ul>
      <div className="exp-tags">
        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="projects" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={3}>Selected Projects</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({ article, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <a
      ref={ref}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`article-card ${inView ? 'article-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="article-card-top">
        <span className="article-tag mono-label">{article.tag}</span>
        <span className="article-meta mono-label">{article.date} · {article.readTime}</span>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-excerpt">{article.excerpt}</p>
      <span className="article-read-more mono-label">Read on Medium →</span>
    </a>
  );
}

function Articles() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="articles" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={4}>Writing</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="articles-grid">
        {ARTICLES.map((a, i) => (
          <ArticleCard key={a.title} article={a} index={i} />
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
        <SectionLabel number={5}>Education</SectionLabel>
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

function SkillGroup({ group, index, parentInView }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!parentInView) return;
    const t = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(t);
  }, [parentInView, index]);
  return (
    <div className={`skill-group ${visible ? 'skill-group--visible' : ''}`}>
      <h4 className="skill-category mono-label">{group.category}</h4>
      <div className="skill-items">
        {group.core.map(item => (
          <span key={item} className="skill-item skill-item--core">{item}</span>
        ))}
        <div className="skill-divider" />
        {group.familiar.map(item => (
          <span key={item} className="skill-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="skills" className="section" ref={ref}>
      <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
        <SectionLabel number={6}>Technical Skills</SectionLabel>
        <div className="section-rule" />
      </div>
      <div className="skills-grid">
        {SKILLS.map((group, gi) => (
          <SkillGroup key={group.category} group={group} index={gi} parentInView={inView} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Vinay Jampana</span>
          <span className="footer-status mono-label">Open to Senior Engineer / SDE2-SDE3 roles</span>
        </div>
        <div className="footer-links">
          <a href="mailto:vinayvarma541@gmail.com" className="footer-link">vinayvarma541@gmail.com</a>
          <a href="https://linkedin.com/in/vinay-jampana" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://github.com/vinayjampana" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://medium.com/@vinayjampana" target="_blank" rel="noopener noreferrer" className="footer-link">Medium</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="mono-label">Hyderabad | Bangalore | Remote</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <div className="sections-wrapper">
          <Focus />
          <Experience />
          <Projects />
          <Articles />
          <Education />
          <Skills />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
