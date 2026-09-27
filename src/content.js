import { MORE_CASE_STUDIES } from './cases-more';

// All site copy lives here. Case-study blocks:
//   'text'                      paragraph (`code` spans allowed)
//   { h: 'Heading' }            sub-heading
//   { list: ['a', 'b'] }        bullet list
//   { table: { head, rows } }   table
//   { code: { caption, text } } code excerpt
//   { pre: 'ascii' }            diagram
//   { note: 'text' }            aside

export const PROFILE = {
  name: 'Vinay Jampana',
  email: 'vinayvarma541@gmail.com',
  linkedin: 'https://linkedin.com/in/vinay-jampana',
  github: 'https://github.com/vinayjampana',
  title: 'Senior software engineer, AI and full-stack',
  intro: [
    'With 5+ years building multi-tenant SaaS, I build and own products end to end: React and Next.js interfaces, NestJS services, and LLM agents together with the evaluation and observability they need to run in production.',
    'I work at Zotok.ai in Hyderabad, where I own the architecture and delivery of a WhatsApp order-agent platform and lead a team of five engineers. Before that I spent several years on frontend systems, which is why I care about how the whole thing feels to the person using it.',
  ],
  status: 'Open to senior full-stack and AI engineering roles. Hyderabad, Bangalore or remote.',
};

export const EXPERIENCE = [
  {
    company: 'Zotok.ai',
    role: 'Senior Software Engineer, AI and Full-Stack',
    period: 'May 2023 to present',
    place: 'Hyderabad',
    note: 'B2B WhatsApp-commerce SaaS. Customers include Sun Pharma, UltraTech, Johnson & Johnson and Samunnati.',
    bullets: [
      { text: 'Own the architecture and delivery of the order-agent platform: one opaque LangGraph agent became seven testable steps composed on a visual canvas, running in production.', to: '/work/order-agent-platform' },
      { text: 'Built a rarity-weighted alias matcher over about 15,000 production aliases. Real rep phrasings matched to the right product first time went from 81% to 95%.', to: '/work/alias-ranker' },
      { text: 'Built the evaluation system for the order agent: 6 eval sets, 64 scenarios, graded against ground-truth SKUs, run twice a day in CI with a breach rule that alerts the team.', to: '/work/order-agent-evals' },
      { text: 'Built OpenTelemetry-based Langfuse tracing and per-step trace capture, shown in the AI playground UI.', to: '/work/tracing-a-block-runtime' },
      { text: 'Made order placement multi-location: one checkout per delivery address against a cart API that merges lines.', to: '/work/multi-location-orders' },
      { text: 'Found and fixed production bugs across services: a crash loop, duplicate WhatsApp sends, tenant-blind vector search, OCR failures.', to: '/work/production-notes' },
      { text: 'Run a production canary that behaves like a real buyer and alerts on failure only.', to: '/work/production-canary' },
      { text: 'Built dynamic WhatsApp template buttons resolved at send time, from the template builder to the landing page.', to: '/work/template-buttons' },
      { text: 'Built single-use OTP statement links on Next.js 15 SSR across a shortener, a gateway route and a sheet API; migrated the customer web app from webpack to Next.js 15 on AWS Amplify.', to: '/work/secure-statement-links' },
      { text: 'Drove the design of the two-layer access model (module access plus role permissions) and built its API.', to: '/work/access-control' },
      { text: 'Set up and maintain Module Federation remotes and their deploy workflows in a 19-app Nx monorepo; own the frontend of the real-time inbox.', to: '/work/micro-frontends' },
      { text: 'Promoted to Lead within the first year. I lead a team of five engineers: I turn business requirements into technical approaches, review designs and pull requests, guide implementation, and own delivery and quality. I hired for three roles.' },
    ],
  },
  {
    company: 'Sumeru Software',
    role: 'Senior Developer',
    period: 'Aug 2022 to Jan 2023',
    place: 'Bengaluru',
    bullets: [
      { text: 'Built a role-based CRM from scratch (React, Redux Toolkit, Node.js) with permission-based rendering and modular dashboards. Owned it from kickoff to production and shipped the MVP in four months with a four-person team.' },
    ],
  },
  {
    company: 'Aerchain',
    role: 'Software Development Engineer 1 (converted from intern)',
    period: 'Jul 2019 to Jan 2022',
    place: 'Bengaluru',
    note: 'B2B procurement SaaS.',
    bullets: [
      { text: 'Built a real-time procurement auction module (optimistic UI with server reconciliation) and barcode-scan inventory management with offline-first PWA support.' },
    ],
  },
];

export const PROJECTS = [
  {
    name: 'vite-plugin-bundle-size-tracker',
    line: 'Published npm package',
    text: 'Tracks Vite bundle sizes across builds, compares each build with the average of the last N, and warns past a configurable threshold (+10% by default). JSON output for CI, zero config.',
    stack: 'TypeScript, Vite plugin API, Node.js',
    links: [['npm', 'https://www.npmjs.com/package/vite-plugin-bundle-size-tracker'], ['GitHub', 'https://github.com/vinayjampana/vite-plugin-bundle-size-tracker']],
  },
  {
    name: 'RoleMiner',
    line: 'Job discovery pipeline (in progress)',
    text: 'Scrapes five ATS types, then narrows thousands of postings in stages: rule filter, TF-IDF pre-rank, one batched LLM scoring call. A full run costs under $0.002. FastAPI backend with an SSE event stream, React dashboard.',
    stack: 'Python, FastAPI, SQLite, scikit-learn, React, Docker',
    links: [['GitHub', 'https://github.com/vinayjampana/role-miner']],
  },
  {
    name: 'Tiny Tracker',
    line: 'Habit tracker, live at tinytracker.in',
    text: 'Daily habits with streaks and a progress heatmap. Installable PWA that works offline; per-user data isolation through Firestore security rules.',
    stack: 'Next.js, React 19, Firebase, Tailwind',
    links: [['Live', 'https://tinytracker.in'], ['GitHub', 'https://github.com/vinayjampana/habit-and-routine-tracker']],
  },
];

export const SKILLS = [
  ['AI', 'LLM agents and tool calling, LangGraph, structured outputs, prompt engineering, LLM evaluation, Langfuse, OpenTelemetry, OCR and vision pipelines, OpenSearch kNN retrieval'],
  ['Backend', 'TypeScript, Node.js, NestJS, Python (FastAPI), PostgreSQL, Prisma, Hasura, REST'],
  ['Frontend', 'React, TypeScript, Next.js, Redux Toolkit, Webpack Module Federation, Vite, Vitest'],
  ['Cloud', 'AWS (ECS, ECR, Lambda, S3, Amplify), Docker, GitHub Actions'],
  ['Practice', 'Event-driven design, idempotency, feature flags and rollback, multi-tenant systems, RBAC, eval-driven development'],
];

const CONFIDENTIAL =
  'Code excerpts are simplified from a proprietary codebase. Customer names, identifiers and internal endpoints are removed.';

const BASE_CASE_STUDIES = [
  // ------------------------------------------------------------------ 1
  {
    slug: 'order-agent-platform',
    title: 'Turning an order-taking agent into a pipeline that authors can compose',
    dek: 'A monolithic LangGraph agent became seven typed steps on a visual canvas, with explicit outcomes, an error path, and a trace for every step.',
    summary: 'Seven typed steps, per-outcome routing, an error edge and per-step traces, from builder UI to function runtime.',
    year: '2026',
    meta: [
      ['Role', 'Owned architecture and delivery'],
      ['Scope', 'Flow builder, workflow engine, function runtime, playground trace UI'],
      ['Stack', 'TypeScript, NestJS, Zod, React, Python (LangGraph origin)'],
    ],
    facts: [
      ['7', 'pipeline steps, each a standalone function'],
      ['4', 'of the 7 call a model; the rest are plain code'],
      ['50+', 'functions share the same outcome contract'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'Distributors send orders on WhatsApp as free text and as photos of handwritten sheets: "2 tiffin sector 44, 1 sector 18", "choco syrup 5cs". The order agent turns that into a validated cart.',
          'It started as one LangGraph agent in Python, and that caused two problems. Every customer wanted slightly different behaviour (ask or auto-pick when a product is ambiguous, which review link to send, how quantities are read), and each change meant editing Python and redeploying. And when an order went wrong there was no seam to test, trace or intervene at: the whole pipeline ran inside one node.',
        ],
      },
      {
        title: 'The decision: where does the model belong?',
        body: [
          'Before choosing a framework I listed each step and asked whether it needs a model at all. Four steps do (extraction, matching against retrieved candidates, quantity reading, and writing the reply). Catalog search, alias lookup, ambiguity prompts and cart writes are deterministic, and making a model choose to call them only adds latency, tokens and variance.',
          { pre:
`buyer text / photo
      |
extractProducts ......... model
      |
catalogSearch, fetchAliases ... plain code
      |
matchProducts ........... model, over retrieved candidates
      |--- ambiguous ---> interactive list ---> recordAmbiguityChoice
resolveQuantities ....... model
      |
manageCart .............. plain code (cart + checkout)
      |
formatOrderResponse ..... model writes the body, the button is deterministic` },
          'I weighed three shapes. Keeping the Python agent and adding per-workspace config would have moved the problem, not removed it. A free-running tool-calling agent would be the most flexible, but a model choosing between catalog and cart calls on every order is exactly the variance I was trying to remove. Pinned steps with explicit outcomes kept the flexibility that customers actually asked for (reordering, branching, per-customer rules) at the level where a solution author can see it.',
          'I shipped an intermediate version first: one Agent block that exposed the nine functions as tools and drew six outcome connectors. It worked, but it still hid the pipeline behind a single node. The next iteration replaced it with a generic block that runs one function per node.',
        ],
      },
      {
        title: 'How it works',
        body: [
          'Each step is a function with a declared input, output and a list of outcomes. The registry is served to the flow builder, which renders one connector per outcome plus an `error` connector.',
          { code: { caption: 'A step declares its outcomes (simplified)', text:
`export const checkOrderBlock = defineFunction({
  name: 'checkOrderBlock',
  category: 'order',
  outcomes: [
    { id: 'blocked', description: 'Buyer is barred from ordering; tell them to contact the seller.' },
    { id: 'allowed', description: 'Carry on with the pipeline.' },
  ],
  input:  z.object({ order_block_reason: z.string().nullish() }),
  output: z.object({ blocked: z.boolean(), message: z.string().nullable() }),
  run: ({ order_block_reason }) =>
    order_block_reason
      ? withOutcome({ blocked: true, message: BLOCKED_TEXT }, 'blocked')
      : withOutcome({ blocked: false, message: null }, 'allowed'),
});` } },
          'In the workflow engine the block calls the function, unwraps the outcome and follows the matching edge. The failure path was a deliberate choice:',
          { code: { caption: 'Engine: outcome routing and the error edge (simplified)', text:
`try {
  returned = await callRemoteFunction({ module, export, input, context });
} catch (error) {
  // record the failure with the input that was attempted, so a timed-out
  // step still shows up in the per-step trace
  writeTrace(block, 'error', input, { error: describe(error) });

  // an author who drew the error connector handles it; one who did not falls
  // through to the block's own edge, so a failing function never strands
  // a live conversation
  return { outgoingEdgeId: resolveOutcomeEdgeId(block, 'error') };
}

const { value, outcome } = unwrapOutcome(returned);
return { outgoingEdgeId: resolveOutcomeEdgeId(block, outcome) };` } },
          'Steps hand each other large objects (catalog candidates are arrays of full variants). I pass those through canvas variables and shared state, not through model arguments. Asking a model to copy thousands of tokens between calls costs money and loses fields to paraphrasing.',
        ],
      },
      {
        title: 'The builder side',
        body: [
          'A platform is only as good as the authoring experience, so the builder changed too:',
          {
            list: [
              'The settings panel shows what each function returns (`{{cart.summary}}`, `{{cart.order_id}}`), and the canvas shows which variable a block produces, so data flow is visible without reading code.',
              'Saving a canvas that fails validation used to fail silently: the editor kept a broken local copy and autosave stopped. It now refuses the save and names the block, for example `Group "4. Match products" > agent block: options.step: Required`.',
              'Every step appends its name, input and output to the conversation\'s trace metadata, which the AI playground renders as step cards. Failed and timed-out steps included.',
            ],
          },
        ],
      },
      {
        title: 'What went wrong',
        body: [
          'Linting the live canvases with the repository\'s canvas lint found three wired outcomes on one production canvas that could never fire, because the functions never return them. A second canvas passed empty strings for list inputs the function expects as arrays and got a 400 on every order. The lint only checked input names, not types, so it had missed this.',
          'Most `error` outcomes on the order canvases were unwired, which is safe (they fall through) but means failures are silent to the buyer.',
        ],
      },
      {
        title: 'What I would change',
        body: [
          {
            list: [
              'Type-aware canvas lint: check each mapped input against the function schema, not just the name.',
              'Require an explicit choice for `error` (route it, or accept fall-through) instead of a silent default.',
              'Treat canvases as versioned artefacts with contract tests against the function registry, so a function change cannot break a live canvas unnoticed.',
            ],
          },
        ],
      },
      {
        title: 'Ownership',
        body: [
          { list: [
            'Built: the generic flow block (builder and engine), outcome connectors and the error path, per-step trace capture, save-time validation, the multi-location cart step, the playground trace view.',
            'Drove: where the step boundaries sit, the outcome contract, and which steps use a model.',
            'Shared with teammates: the extraction and matching internals and the catalog client.',
          ] },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    slug: 'alias-ranker',
    title: 'Fixing product matching without adding a single alias',
    dek: 'A rarity-weighted matcher over the aliases a workspace already had. Real rep phrasings matched to the right product first time went from 48 to 56 of 59, with no new data and no new infrastructure.',
    summary: 'Matching rep shorthand to the right product over 15,000 known aliases: 81% to 95% of real phrasings right first time.',
    year: '2026',
    meta: [
      ['Role', 'Designed the memory; built the ranker, benchmark and rollout'],
      ['Scope', 'Alias lookup for product matching'],
      ['Stack', 'TypeScript, PostgreSQL (pg_trgm), Jest'],
    ],
    facts: [
      ['~15,000', 'production aliases in the test workspace'],
      ['208 to 234', 'of 300 held-out phrases matched at rank 1'],
      ['48 to 56', 'of 59 real rep phrasings matched at rank 1'],
      ['6 to 0', 'phrasings with no result at all'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'When a distributor resolves an ambiguous product ("gold 1L"), the agent should remember it. I designed a persistent phrase-to-SKU memory: a customer namespace that beats a workspace-wide one, keys that ignore word order, and, importantly, aliases passed to the matching model as evidence next to the catalog candidates, not as a shortcut around it. If price or a facet disagrees, the model can still override.',
          'The store was already large, about 15,000 aliases for one customer. But lookups missed reps\' shorthand: "WCD red" for a longer product name, "T.p tomato 1.2 kg", "Pro. chocolate syrup". The existing lookup used trigram similarity and required every query word to pair with an alias word. It scored a phrase by its weakest word, so one shorthand token emptied the result.',
        ],
      },
      {
        title: 'Constraints I set',
        body: [
          { list: [
            'No new aliases to fix misses. Data entry would hide the bug and grow the store.',
            'Deterministic and explainable: I want to say why a product ranked first.',
            'No new infrastructure. Embeddings were scoped out of the first version deliberately.',
            'Safe to roll back with one environment variable.',
          ] },
        ],
      },
      {
        title: 'The ranker',
        body: [
          'A query word can stand for an alias word in five ways, each with a score. Words are weighted by rarity across products, so "chocolate" decides and a brand word barely counts. An alias must cover enough of the weighted query, and descriptive words it has that the query never asked for reduce its score, which is what separates a plain product from its variants.',
          { code: { caption: 'Word matching and the constants that drive it (simplified)', text:
`const MATCH = { exact: 1, letters: 0.95, initials: 0.9, typo: 0.85, prefix: 0.8 };
const COVERAGE_GATE = 0.5;   // enough of the weighted query must be explained
const EXTRA_PENALTY = 0.3;   // aliases with unrequested descriptive words rank lower
const NOISE_SHARE   = 0.25;  // a word in >=25% of products is brand noise

function tokenMatchScore(query, alias) {
  if (query === alias) return MATCH.exact;
  if (isSizeLike(query) || isSizeLike(alias)) return 0;   // sizes must match exactly
  const q = lettersOnly(query), a = lettersOnly(alias);
  if (q && q === a) return MATCH.letters;
  // prefix before typo: "choco" vs "chocos" is a shortening, not a misspelling
  if (q.length >= 3 && a.length >= 3 && (a.startsWith(q) || q.startsWith(a))) return MATCH.prefix;
  if (q.length >= 4 && a.length >= 4 && boundedLevenshtein(q, a, maxEdits(q, a)) <= maxEdits(q, a))
    return MATCH.typo;
  return 0;
}

// score = coverage - EXTRA_PENALTY * extraFraction, best alias per product,
// customer aliases first, top 8, minimum score 0.65` } },
          'Initials are handled separately: "wcd" can match the first letters of three consecutive words in the alias\'s original order. The stored key is token-sorted, so the index keeps original word order just for this. Rarity is an inverse-document-frequency over products, with a floor so a tiny catalogue does not call every word noise.',
        ],
      },
      {
        title: 'How I measured it',
        body: [
          'The number people call hit@1 just asks: was the right product the very first suggestion? I loaded the production alias seed into a local database and ran two checks with it.',
          { list: [
            'Real rep phrasings: 59 phrasings taken from the order eval, the way reps actually type.',
            'Held-out phrases: remove 300 sampled aliases from the store, then see whether the matcher still finds each product from its own phrase. This is deliberately the hard case, a phrase the store has never seen.',
          ] },
          { table: { head: ['', 'Before', 'After'], rows: [
            ['Real phrasings (of 59): right product suggested first', '48 (81%)', '56 (95%)'],
            ['Real phrasings: nothing suggested at all', '6', '0'],
            ['Held-out phrases (of 300): right product suggested first', '208 (69%)', '234 (78%)'],
            ['Held-out phrases: nothing suggested at all', '85', '63'],
            ['Held-out phrases: wrong product suggested', '1', '1'],
          ] } },
          'The held-out test is the strict one, which is why its gain looks modest. Day to day, most lookups are exact matches that both versions handle; what changed is the shorthand nobody had confirmed before, and on live orders the number of alias matches rose sharply after rollout. Two caveats: 59 phrasings is a small set, and one wrong match before and after is too few to claim "no regression", only "no visible one". The remaining misses were data conflicts (two products holding the same shorthand), not ranking errors.',
        ],
      },
      {
        title: 'What went wrong',
        body: [
          { list: [
            'A quantity glued to the product text ("... 1 KG 5cs") stopped the right alias from matching, in both rankers, because numeric tokens must match exactly. The bug was upstream, in the cleanup step before lookup.',
            'I shipped behind a flag that defaulted off. The production task definition never set the flag, so production stayed on the old lookup until I made the ranker the default with an environment variable to roll back.',
            'The first version of the memory demoted an alias after two catalog misses. That meant a correctly seeded alias could decay through search-ranking noise, so I paused demotion.',
          ] },
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Evaluate on held-out real traffic and track hit rate online. Add a curation loop for conflicting aliases. Fuzzy-match customer-scoped aliases too (today only the global index gets the ranker). Use a lexical and embedding hybrid for cold starts, where a phrase shares no words with anything known.',
        ],
      },
      {
        title: 'Ownership',
        body: [
          { list: [
            'Designed: the alias memory (namespaces, evidence-not-shortcut, confirmation-only writes).',
            'Built: the ranker, the cached index and its invalidation, the benchmark harness, and the rollout.',
            'Shared with teammates: the production alias store and its queries.',
          ] },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    slug: 'order-agent-evals',
    title: 'An evaluation suite that cannot flatter you',
    dek: 'Deterministic, end-to-end evals for a WhatsApp order agent, run twice a day in CI, gated on score, errors and completion.',
    summary: 'Six eval sets, 64 scenarios, graded per line against ground-truth SKUs, with a breach rule and a hosted dashboard.',
    year: '2026',
    meta: [
      ['Role', 'Designed and built'],
      ['Scope', 'Runner, scoring, reports, CI, hosted dashboard'],
      ['Stack', 'TypeScript, Vitest, GitHub Actions, S3, Next.js on AWS Amplify'],
    ],
    facts: [
      ['6', 'eval sets'],
      ['64', 'scenarios, incl. 100 generated order lines'],
      ['2 / day', 'scheduled runs at 09:00 and 17:00 IST'],
      ['90%', 'default benchmark; a run also fails on any errored item'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'The order agent changes every week: prompts, retrieval, ranking, cart rules. A customer acceptance test showed problems that I wanted to catch before the customer did. There was no regression signal at all.',
        ],
      },
      {
        title: 'Design',
        body: [
          'I chose end-to-end checks through the real channel over unit-level checks on prompts. The order goes in as a WhatsApp message, and I grade the outcome that matters, the cart.',
          { pre:
`eval.json  (target, items, benchmark)
    |
runner:  send message into a test WhatsApp group (the path a real message takes)
         clear draft orders, snapshot cart, wait for the bot's reply
    |
score:   diff cart vs expected  ->  per-line result, per-case breakdown, HTML report
    |
eval-ci: read report -> breach? -> alert Teams -> publish to reports branch / S3
    |
dashboard: hosted UI shows latest run, trend, per-item result, Run button` },
          { code: { caption: 'One eval item (values changed)', text:
`{
  "id": "uat-01",
  "input": { "text": "Tomato ketchup sachet - 3 case\\nTandoori spread - 4 case\\nVinegar - 1 case" },
  "expectedOutput": {
    "order_created": true,
    "unmapped_count": 0,
    "products": [
      { "sku": "SKU-0040", "typed": "Tandoori spread", "rep_unit": "case",
        "pack_size": 12, "rep_quantity": 4, "expected_quantity_pcs": 48 }
    ]
  }
}` } },
          'A line passes only if the right SKU is in the cart at the exact quantity in pieces (a "case" is quantity times pack size), there are no unmapped lines, and there are no extra SKUs. No model grades the output. That costs partial credit, and buys a score that means one thing.',
        ],
      },
      {
        title: 'The breach rule',
        body: [
          'The rule I care most about is the last one. An errored item adds nothing to the score\'s denominator, so without it a run where half the items failed to send could still read 100%.',
          { code: { caption: 'When a scheduled run counts as failed', text:
`export function breachReasons(report, minScore) {
  if (!report) return ['no report was written (runner crashed, or skipped)'];
  const reasons = [];
  if (report.status && report.status !== 'done')
    reasons.push('run stopped at status "' + report.status + '"');
  const s = report.summary;
  if (!s) return [...reasons, 'report has no summary'];
  if (s.score < minScore)  reasons.push('score ' + pct(s.score) + ' is below the ' + pct(minScore) + ' benchmark');
  if (s.errored > 0)       reasons.push(s.errored + ' item(s) errored and were not scored');
  return reasons;
}` } },
          'It is a pure function with its own self-check. A breach posts an alert with the worst items first and a link to the report.',
        ],
      },
      {
        title: 'Making it visible',
        body: [
          'Reports are published to a dedicated branch after every scheduled run, in the shape the local dashboard already reads, keeping the newest 60 per eval and retrying when two jobs push at once. I hosted the dashboard on AWS Amplify.',
          'That created two real constraints. The dashboard needs to call the product API, but the test cases point at a private hostname, and the hosted server runs outside the VPC. I added a server-side proxy that only forwards to two public hosts over HTTPS, refuses credentials in the URL and never logs bodies, so a public, login-free page cannot be used as an open relay. And because these evals send real WhatsApp messages, the Run button starts the same CI workflow using a server-held token, checks the caller\'s write access to the repository, refuses a second run while one is active, and can only start the three scheduled evals.',
        ],
      },
      {
        title: 'What went wrong',
        body: [
          { list: [
            'The first run on one eval scored 0%: the live canvas was sending empty strings where the function expected arrays, so every call was rejected. The eval was correct and the system was not, which is the point of having it.',
            'An eval can run ahead of production. If the check encodes a fix that is not deployed yet, it goes falsely green or falsely red. I now deploy the fix before merging the scheduled check.',
            'The report publisher silently added nothing: the reports branch was a copy of main whose ignore file excluded the reports folder. A test against a real repository found it; the publisher now force-adds that folder.',
          ] },
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Repeat runs to measure variance before trusting a threshold. Build golden sets from real traffic, not only from acceptance documents. Alert on trend as well as level. Grade per step (retrieval, match, quantity) so a failure names its layer. Record cost per run.',
        ],
      },
      {
        title: 'Ownership',
        body: [
          { list: [
            'Built: the runner, scoring and reports, CI and breach logic, the publisher, the dashboard screens and hosting.',
            'Decided with the product side: what counts as correct for each case (units, pack sizes, ignored lines).',
          ] },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    slug: 'tracing-a-block-runtime',
    title: 'Tracing a runtime where every block is its own HTTP call',
    dek: 'OpenTelemetry-based Langfuse tracing for a workflow engine where there is no single long-lived agent run to instrument.',
    summary: 'Deterministic trace IDs, an isolated tracer provider, fail-open behaviour, and two bugs that silently dropped every span.',
    year: '2026',
    meta: [
      ['Role', 'Designed and built'],
      ['Scope', 'Tracing for the function runtime, correlated with request logs'],
      ['Stack', 'TypeScript, OpenTelemetry, Langfuse v5, NestJS, pnpm'],
    ],
    facts: [
      ['1 trace', 'per conversation turn, however many blocks run'],
      ['Fail-open', 'a tracing fault cannot fail a customer turn'],
      ['2', 'dependency-resolution bugs that silently dropped every span'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'Failed order turns vanished. Debugging meant searching logs across services. The usual answer, a Langfuse callback on one LangGraph run, did not fit: the canvas drives everything through separate HTTP calls, one block per call, and the LangGraph thread path had almost no traffic.',
        ],
      },
      {
        title: 'Design',
        body: [
          { list: [
            'One span per block, opened where the block is invoked. Model generations inside the block nest under it through ambient OpenTelemetry context, so nothing has to be passed down.',
            'Blocks in one turn are separate requests, so they need a shared trace. The trace ID is derived deterministically from the request ID, and every block attaches to a synthetic parent span with that trace ID. All the blocks of a turn become siblings in one trace.',
            'Session is the conversation thread and user is the workspace, so conversations group naturally.',
            'An isolated tracer provider, not the global one, so it coexists with the APM agent already in the process.',
            'Off by default, and every function is fail-open. A tracing fault must never fail a customer turn.',
          ] },
          { code: { caption: 'Block span wrapper (simplified)', text:
`export const runBlockSpan = async (options, fn) => {
  const ready = await ensureInitialized();
  if (!ready) return fn();                       // tracing off or broken: run untraced

  let traceId;
  try {
    traceId = await createTraceId(options.requestId);   // same request -> same trace
  } catch (error) {
    log.warn('span.setup-failed', { reason: 'this block will run untraced' });
    return fn();                                  // setup failure only, fn has not started
  }

  // fn() runs from here down. Its error is the caller's error: nothing below
  // may catch and fall back to running fn() a second time.
  return propagateAttributes(
    { userId: options.workspaceId, sessionId: options.threadId },
    () => startActiveObservation(options.name, async span => {
      span.update({ input: options.input });
      try {
        const result = await fn();
        span.update({ output: result });
        return result;
      } catch (error) {
        span.update({ level: 'ERROR', statusMessage: String(error) });
        throw error;
      }
    }, { parentSpanContext: { traceId, spanId: SYNTHETIC_PARENT_SPAN_ID, traceFlags: 1 } })
  );
};` } },
          'The trace ID is also written onto every log line for that block, so a log found by request ID gives the trace to open, and a trace can be turned back into a log query.',
        ],
      },
      {
        title: 'What went wrong',
        body: [
          { list: [
            'An earlier version wrapped the whole span lifecycle, including the function, in one try/catch that fell back to running the function untraced on any error. That silently ran every failing function twice. It never showed up in happy-path tests, only once something actually threw. The comment above is the scar.',
            'A bare tracer provider does not set up async context propagation like the full SDK does. Without an explicit context manager, every observation landed as an unrelated root trace. I reproduced this locally before adding it.',
            'After migrating to the OpenTelemetry-based SDK, spans were "processed" but never left the process. The exporter peer-resolved to an old version pinned by other apps in the same pnpm workspace, and a second peer dependency collided the same way. I proved it by patching the HTTP client and seeing zero network calls, then fixed it with an aliased exporter and a scoped override. A clean-room install had hidden both bugs, so I now verify against the real bundled output.',
          ] },
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Add sampling and prompt redaction before enabling it broadly, attribute cost per span, and link traces to eval runs so a failing eval item opens its own trace.',
        ],
      },
      {
        title: 'Ownership',
        body: [
          { list: ['Built: everything described above, including the pnpm fixes and the log correlation.'] },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    slug: 'production-notes',
    title: 'Production bugs worth writing down',
    dek: 'Six root-cause write-ups: what looked wrong, what was wrong, and what I changed.',
    summary: 'A crash loop, duplicate sends, tenant-blind vector search, OCR that never saw the image, a 4x latency cut, and an overnight outage.',
    year: '2026',
    meta: [
      ['Role', 'Diagnosed and fixed (the overnight outage: diagnosed)'],
      ['Stack', 'NestJS, Hasura, OpenSearch, Python, AWS ECS, Node.js'],
    ],
    facts: [
      ['875 to 228 ms', 'catalog search per order line'],
      ['173 copies', 'of one document that starved a tenant\'s search'],
    ],
    sections: [
      {
        title: '1. One process.exit in a shared library',
        body: [
          'A messaging service kept crash-looping. A shared library installed a global handler that exits the process on any unhandled promise rejection, and one five-second HTTP timeout to a downstream service was enough to trigger it. Deleting the handler would change every other service that depends on it, so I gated the exit behind an environment flag whose default preserves today\'s behaviour, and opted this service out.',
          { code: { caption: 'Shared handler', text:
`// a downstream promise rejection (an HTTP timeout) is not a reason to
// kill the process. Default keeps the historical exit for every other
// service; a service opts out with EXIT_ON_UNHANDLED=false.
if (process.env.EXIT_ON_UNHANDLED !== 'false') {
  process.exit(1);
}` } },
          'The same service was also under memory pressure: the frontend refetches after each channel-member change with a cache-busting parameter, so concurrent identical requests each ran a ten-query chain. I coalesced them. Identical in-flight calls share one promise and the entry is removed when it settles, so nothing outlives the call. The known ceiling: a caller arriving mid-flight can see data from just before a write.',
          { code: { caption: 'Single-flight', text:
`const existing = this.inFlight.get(key);
if (existing) return existing;
const promise = this.load(args).finally(() => this.inFlight.delete(key));
this.inFlight.set(key, promise);
return promise;` } },
        ],
      },
      {
        title: '2. The fix that hides the bug',
        body: [
          'A group notification went out twice on production but once on QA. The handler sent it inline, and again when a PDF render finished. QA looked fine only because its send queue de-duplicated by the original message ID, which production did not have. Copying that queue change to production would have made both environments look right while leaving the bug in place. The cure was removing the redundant send.',
          'A second duplicate had a different cause: a database event trigger fires on every update, not only on real status changes, so reopening a stale tab and saving an already-approved dispatch sent the notification again. The handler now notifies only on insert or on a real transition into the approved state, with a test for each branch.',
          'The lesson I took: put the guard at the source of the event, and do not let a transport-level dedupe make two environments differ.',
        ],
      },
      {
        title: '3. Top-20, then filter',
        body: [
          'Knowledge-base search returned two irrelevant hits for a tenant. The query asked the vector index for the global top 20 chunks and then filtered by tenant. This version of the engine cannot filter inside the nearest-neighbour query, so a tenant whose documents were duplicated across other tenants (one demo file existed 173 times) lost almost everything after filtering.',
          { code: { caption: 'Filter first, then score exactly', text:
`"script_score": {
  "query": { "bool": { "filter": [ { "term": { "seller_workspace_id": ws } } ] } },
  "script": {
    "source": "knn_score", "lang": "knn",
    "params": { "field": "vector_field", "query_value": embedding, "space_type": "l2" }
  }
}` } },
          'The trade-off is stated in the code: this is exact scoring over one tenant\'s chunks, which is correct but brute-force. The upgrade path is the engine\'s native filtered search once a tenant grows past tens of thousands of chunks. The space type has to match the index.',
        ],
      },
      {
        title: '4. The model never saw the image',
        body: [
          'Handwritten order sheets came back with misread digits, and lines written as a number over a bar over a number came back as arithmetic ("0121 over 4" became 0.1221). I built a two-stage eval, OCR then product mapping graded on real SKU codes, so I could tell which stage failed. Of 45 missed lines, 25 were OCR and 20 were mapping.',
          'Three root causes. The base prompt said "return as-is, do not guess" while workspace rules said to disambiguate digits, so they contradicted each other. Dense handwriting needed the higher vision detail setting. And the document-annotation service runs OCR first and hands the annotation model markdown, not the image: the OCR emitted the fraction as LaTeX, the guidance described it visually, and the model never connected the two. I translated the guidance\'s visual vocabulary into the notation the model actually receives. For circled numerals I asked for plain digits and kept a deterministic strip as a backstop.',
          'The first verified baseline was 94% (191 of 203 lines). After I rebuilt the ground truth with more sheets it read 88% (333 of 378), and I report both.',
        ],
      },
      {
        title: '5. Faster by asking for less',
        body: [
          'Catalog search ran the platform\'s full decoration on every order line. Order matching only reads a handful of fields, so I switched to a slim projection that requests exactly those. On the production catalog it returned the same SKUs in the same order at about 228 ms per line instead of about 875 ms. The trade-off is that price comes from the index rather than the customer\'s price list, which I confirmed is used only in the matching prompt and the pick list, never in the cart.',
        ],
      },
      {
        title: '6. The overnight outage',
        body: [
          'A health check that sends a real message through the bot failed every ten minutes overnight. A shared LLM client had been changed to fail closed when its workspace key is missing (the old code fell back to another provider). Meanwhile a scheduled job swaps services between day and night task definitions, and the night definition had no secrets. Every request failed in about two milliseconds.',
          'Two things I took from it. The CI run showed green while the alert fired, because the scheduler ignored its own exit code. And failing closed is the right default for a missing secret, but only if a deploy cannot produce a state that has none. What I would do: generate both task definitions from one source and add a drift check.',
        ],
      },
      { title: 'Note', body: [{ note: CONFIDENTIAL }] },
    ],
  },
];


const ORDER = [
  'order-agent-platform',
  'alias-ranker',
  'order-agent-evals',
  'tracing-a-block-runtime',
  'rep-mapping-history',
  'secure-statement-links',
  'template-buttons',
  'multi-location-orders',
  'micro-frontends',
  'access-control',
  'production-notes',
  'production-canary',
];

// group label + tags shown on the cards
const CARD = {
  'order-agent-platform': ['AI systems', ['LangGraph', 'TypeScript', 'NestJS', 'Zod', 'Flow builder']],
  'alias-ranker': ['AI systems', ['Retrieval', 'PostgreSQL', 'Benchmarking', 'TypeScript']],
  'order-agent-evals': ['AI systems', ['LLM evaluation', 'GitHub Actions', 'AWS Amplify', 'S3']],
  'tracing-a-block-runtime': ['AI systems', ['OpenTelemetry', 'Langfuse', 'pnpm', 'NestJS']],
  'rep-mapping-history': ['AI systems', ['Data analysis', 'PostgreSQL', 'Feature flags']],
  'secure-statement-links': ['Full-stack', ['Next.js 15', 'OTP', 'FastAPI', 'AWS Lambda', 'KrakenD']],
  'template-buttons': ['Full-stack', ['React', 'NestJS', 'WhatsApp templates', 'Jest']],
  'multi-location-orders': ['Backend', ['TypeScript', 'Zod', 'Idempotency', 'Commerce API']],
  'micro-frontends': ['Frontend platform', ['Module Federation', 'Nx', 'GitHub Actions', 'CloudFront']],
  'access-control': ['Platform', ['NestJS', 'DynamoDB', 'RBAC', 'KrakenD', 'React']],
  'production-notes': ['Reliability', ['Node.js', 'OpenSearch', 'Hasura', 'OCR', 'AWS ECS']],
  'production-canary': ['Reliability', ['Vitest', 'GitHub Actions', 'Teams', 'OTP']],
};

export const CASE_STUDIES = ORDER.map(slug => {
  const cs = [...BASE_CASE_STUDIES, ...MORE_CASE_STUDIES].find(c => c.slug === slug);
  return { ...cs, group: CARD[slug][0], tags: CARD[slug][1] };
});

export const CONFIDENTIAL_NOTE = CONFIDENTIAL;

export const HERO_STATS = [
  ['LangGraph', 'LLM agents and tool calling'],
  ['OpenSearch', 'Retrieval and kNN search'],
  ['OpenTelemetry', 'Tracing and LLM evals'],
  ['NestJS', 'Node, Python, PostgreSQL'],
  ['Next.js', 'React and TypeScript'],
  ['AWS', 'ECS, Lambda, Amplify'],
];

export const FOCUS = [
  {
    label: 'AI systems',
    title: 'Agents that are tested, traced and safe to change',
    copy: 'I decide where the model belongs and where plain code does, then build the parts around it: typed steps with explicit outcomes, retrieval that is benchmarked, evals gated in CI, and traces that make a failed turn debuggable.',
  },
  {
    label: 'Full-stack product',
    title: 'From the button a buyer taps to the row in the database',
    copy: 'Next.js and React interfaces, NestJS and Python services, gateway routes and queues. I own features across those boundaries, including the awkward seams: signed links, template contracts, single-use enforcement.',
  },
  {
    label: 'Leadership and platform',
    title: 'Leading a team of five, and the platform under it',
    copy: 'I turn business requirements into technical approaches, decide where each piece should live, review designs and pull requests, and own delivery. Module Federation remotes and their deploy path, access control and CI are part of that.',
  },
];

export const PRINCIPLES = [
  {
    title: 'Start from the business problem',
    text: 'The order pipeline exists because every customer wanted slightly different ordering behaviour. I wrote down what each step needed to decide before choosing a framework.',
    to: '/work/order-agent-platform',
  },
  {
    title: 'Decide where logic lives',
    text: 'Tolerate blank lists in the platform, not in every customer\'s canvas. Keep a delivery place in order notes, not the shipping address. Put the dedupe guard at the source of the event.',
    to: '/work/multi-location-orders',
  },
  {
    title: 'Measure before and after',
    text: 'Share of real phrasings matched first time, latency per order line, eval scores with a breach rule. Where the sample is small I say so.',
    to: '/work/alias-ranker',
  },
  {
    title: 'Know when to stop',
    text: 'I paused a half-built feature when production data showed it would help about one line in twenty, and moved to the change that did.',
    to: '/work/rep-mapping-history',
  },
  {
    title: 'Debug across boundaries',
    text: 'A crash loop from a shared library, two environments that differed for the wrong reason, an outage that only appeared at night. The fix is usually a level above where the symptom is.',
    to: '/work/production-notes',
  },
  {
    title: 'Leave the team better equipped',
    text: 'I review my team\'s designs and pull requests, and write design docs, root-cause notes and handovers so work survives a change of owner.',
  },
];

export const PLATFORM = [
  ['Frontend', 'Nx workspace with 19 apps. A seller host with seven Module Federation remotes; customer-facing Next.js 15 apps for secure links and customer hub.', 'Remotes, deploy paths, CI, real-time inbox, permission gating.'],
  ['Gateway', 'KrakenD routes in front of the services.', 'Added routes for module access, facets and the sheet connector.'],
  ['Bot platform', 'Message ingestion, queues and the flow engine (a Typebot fork) with a visual builder.', 'The Zo Flow block, outcome routing, error path, trace capture and save validation.'],
  ['AI runtime', 'zo-flow (typed function runtime), a Python LangGraph service, an OCR service.', 'Owner of the order pipeline, alias ranker, tracing and evals.'],
  ['Business services', 'Commerce, organisations, communication, custom entities. NestJS, TypeORM, Hasura.', 'Features and root-cause fixes across all four.'],
  ['Data', 'PostgreSQL, DynamoDB, OpenSearch.', 'Ranker queries, module-access table, kNN retrieval fix.'],
  ['Delivery', 'GitHub Actions, ECR and ECS, Amplify, Lambda, S3.', 'Deploy workflows, CI caching, runner fixes, hosted dashboards.'],
  ['Quality', 'Sentinel: API tests, evals, a production canary.', 'Evals, CI gate, hosted dashboard, canary.'],
];
