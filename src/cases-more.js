// Additional case studies. Same block format as content.js.

export const MORE_CASE_STUDIES = [
  // ------------------------------------------------------------------ 6
  {
    slug: 'secure-statement-links',
    title: 'A single-use link that shows a buyer their balance',
    dek: 'A Google Sheet, a short link, an OTP and a server-rendered page: how a sensitive number gets to the right person once, across a web app, a shortener and two APIs.',
    summary: 'Next.js SSR, OTP, single-use enforcement, and the bugs at the seams between four services.',
    year: '2026',
    meta: [
      ['Role', 'Built end to end'],
      ['Scope', 'Next.js pages and API routes, URL-shortener handlers, gateway route, sheet-connector endpoint'],
      ['Stack', 'Next.js 15, TypeScript, Python (FastAPI), AWS Lambda and S3, KrakenD'],
    ],
    facts: [
      ['1 use', 'per link, enforced server-side'],
      ['4', 'services touched: web app, shortener, gateway, sheet API'],
      ['4 s', 'abort timeout on the customer lookup'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'Sellers keep buyers\' outstanding balances in a Google Sheet. They wanted to WhatsApp each buyer a link that shows their own balance. The number is sensitive, links get forwarded, and sheets get edited after the message goes out. So the link has to prove the person opening it is the buyer, work once, and refuse to show anything if the row it points to has changed.',
        ],
      },
      {
        title: 'The flow',
        body: [
          { pre:
`seller's sheet (Apps Script)
   creates a short link with metadata: row id, mobile number, sheet id, tab gid
        |
buyer opens the link ---> Next.js SSR page
        |
   read link metadata (checks the view limit, does NOT consume it)
   confirm phone  ->  OTP  ->  verified
        |
   API route -> gateway -> sheet-connector API (uses the seller's stored Google credentials)
        |
   guards: row deleted? phone mismatch? record changed?  -> "unauthorized" screen
        |
   show statement  ->  only now mark the link as used` },
          'The page is server-rendered on purpose. Tokens and the seller\'s sheet credentials never reach the browser; the browser only ever sees the final numbers.',
        ],
      },
      {
        title: 'Decisions',
        body: [
          { list: [
            'A gateway route that accepts a buyer\'s token (not a platform user\'s), then validates that this buyer belongs to the seller workspace named in the query before forwarding. The sheet API then loads that seller\'s connector credentials through its own dependency.',
            'The sheet tab is identified by its numeric gid, not its name. A seller renaming the tab used to break every link; the API resolves gid to name when it builds the range.',
            'Single use is a policy of the whole journey, not of the first request. That distinction caused most of the bugs below.',
          ] },
        ],
      },
      {
        title: 'What went wrong',
        body: [
          { list: [
            'The first version consumed the link on every server render, so the limit was used up before the buyer finished OTP. I split the shortener into a read that returns metadata and checks the limit without consuming it, and a separate increment that is called only after auth and data are complete.',
            'Then the increment sometimes did not happen. The API route responded before the write finished, and on a serverless runtime the function freezes once the response is sent. The fix was one word: await the call before responding.',
            'A query parameter meant to trigger the increment was misnamed, so it silently did nothing.',
            'Edge cases the sheet model creates: the row is deleted after sending, the phone on the row changes, the row now belongs to someone else. Each gets a guard and the same neutral "unauthorized" screen, so the page does not confirm which case it was.',
            'A slow customer lookup could hang the page, so it has a four-second abort timeout. A diagnostic log for missing customer fields records presence only, never values.',
          ] },
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Single use is check-then-act across two calls, so two tabs opened together can both pass the check. It should be one atomic conditional write. I would also add an expiry, rate-limit OTP sends per number, and keep an audit trail of who viewed what.',
        ],
      },
      {
        title: 'Ownership',
        body: [{ list: ['Built: the web app flow, the shortener changes, the gateway route and the sheet-connector endpoint. I worked from the customer\'s journey document and defined the states and guards myself.'] }],
      },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    slug: 'template-buttons',
    title: 'Buttons that resolve at send time',
    dek: 'WhatsApp templates only let a URL button carry one variable. I made five kinds of dynamic button work through one resolver, from the template builder to the landing page.',
    summary: 'A placeholder contract between the template builder, the send pipeline and the landing app.',
    year: '2026',
    meta: [
      ['Role', 'Built end to end'],
      ['Scope', 'Template builder UI, send-time resolver in the communication service, landing routes'],
      ['Stack', 'React, TypeScript, NestJS, Jest'],
    ],
    facts: [
      ['5', 'dynamic button kinds: form, custom page, book contract, reorder, aging invoice'],
      ['1', 'placeholder contract shared by frontend and backend'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'Sellers send WhatsApp campaigns with a button: "Open your offer page", "Reorder", "Book contract". The button has to open the right page for each buyer, with the buyer\'s identity and the campaign attached. But templates are approved by Meta ahead of time, and the only field that survives publishing for a URL button is its example value. The selection has to live there.',
        ],
      },
      {
        title: 'The contract',
        body: [
          'The template builder writes a structured placeholder into the example. At send time the backend rewrites it into a deep link on the app\'s own domain, carrying everything the page needs.',
          { code: { caption: 'Placeholder in, deep link out (values changed)', text:
`example (what the builder writes):
  {{custom_page/<spreadsheetId>/<sheetId>/<sheetName>/<templateName>}}

resolved link (what the buyer receives):
  /invite/<inviteId>?target=custom_page
      &spreadsheetId=..&sheetId=..&sheetName=..&templateName=..
      &token=..&campaignId=..` } },
          { list: [
            'Both the tab\'s gid and its name go out. The gid survives a rename; the name is what the sheets API takes in range notation.',
            'The name segments are percent-encoded by the builder, because a name may contain the "/" the placeholder is split on.',
            'A half-made selection (no template chosen yet) is left unresolved rather than sent as a link that 404s. A link to nowhere is worse than none.',
          ] },
          'The behaviour is pinned by tests that assert the contract from both ends: what the builder writes, what the resolver returns, that survey-form placeholders still work, and that an incomplete selection resolves to nothing.',
        ],
      },
      {
        title: 'What went wrong',
        body: [
          { list: [
            'I added custom-page resolution alongside the survey-form one rather than through it, kept the survey call sites byte-identical so a path that already worked could not change, and then unified the two behind one resolver with the same tests.',
            'The first pass resolved buttons only on the bulk campaign path, so single sends went out with the raw placeholder until I added it there too.',
            'A custom-page link now always carries the seller workspace id.',
            'Later placeholder kinds (reorder, aging invoice) were not recognised by the button transform until the recogniser was made to cover every custom URL variable in one place.',
          ] },
        ],
      },
      {
        title: 'Reorder as a worked example',
        body: [
          'Reorder resolves from the buyer\'s latest order into an invite. The builder offers two modes: confirm (opens the pre-filled cart) or one-tap (places it directly). The link target for one-tap is its own value, not a flag on the confirm one, so the landing page cannot mix them up.',
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Version the placeholder grammar and validate it in the builder against the same schema the resolver uses, so a malformed selection fails when the seller edits the template, not when a campaign sends.',
        ],
      },
      {
        title: 'Ownership',
        body: [{ list: ['Built: the builder options, the resolver and its tests, and the landing targets.'] }],
      },
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    slug: 'multi-location-orders',
    title: 'One product, three delivery addresses',
    dek: 'A buyer sends "2 for sector 44, 1 for sector 18". The cart API merges same-product lines, so getting three orders out took a deliberate sequence.',
    summary: 'Sequenced submit and checkout per location, and the decisions about where each piece of information belongs.',
    year: '2026',
    meta: [
      ['Role', 'Built'],
      ['Scope', 'The cart step of the order pipeline'],
      ['Stack', 'TypeScript, Zod, commerce API'],
    ],
    facts: [
      ['1 checkout', 'per delivery location'],
      ['15 to 60 s', 'cart submit budget'],
    ],
    sections: [
      {
        title: 'The problem',
        body: [
          'A bakery customer orders the same product for several places in one message. Each place needs its own order. The cart webhook cannot do that on its own: it appends to the customer\'s active order and merges lines that share a product variant, summing quantities. Three locations would become one order for the total quantity.',
        ],
      },
      {
        title: 'The design',
        body: [
          'Checkout is what ends an order and clears the active one. So each location is submitted and checked out before the next starts.',
          { code: { caption: 'The comment that explains the loop (from the code)', text:
`// One placed order per delivery location, in sequence.
//
// Sequential and checked out on purpose, not an implementation detail: the cart
// webhook appends to the customer's active order and merges lines that share a
// product variant, so submitting all the locations first would leave one order
// with the summed quantity. Checkout ends an order and clears the active one, so
// the next location starts a fresh one.
//
// A failure stops the loop instead of continuing: between a submit and its
// checkout the order is still active, so the next location's order would carry
// this one's lines too. The locations not reached are returned so the buyer is
// told which ones to send again.` } },
          'The reply is built in this step, not in the general formatter, because the formatter attaches one button and several orders need several links in the message body. Each placed location gets its own review link; the ones that failed are named.',
        ],
      },
      {
        title: 'Where does each piece of information go?',
        body: [
          { list: [
            'The place is a delivery instruction, not the customer\'s address. An earlier version put it in the shipping address and overwrote the real one. It now goes into the order\'s notes.',
            'Notes are validated per channel, and the commerce service throws when a channel has no notes schema. So notes are sent only when there is something to say and the keys match a schema that exists.',
            'Each location\'s own lines win when it has them; otherwise the matched lines are scaled to that location\'s quantity. That keeps the original one-product case working.',
            'Failures name the locations not placed, so the buyer knows exactly what to resend.',
          ] },
        ],
      },
      {
        title: 'The platform decision',
        body: [
          'The flow builder stores an unfilled field as an empty string, and a list input given "" is rejected. I could have asked every customer\'s canvas to be fixed. Instead the step treats a blank list as an empty one. It is a small tolerance in the function, and it removes a whole class of "the flow returned 400" failures for every author.',
          'Separately, the cart submit\'s timeout was raised from 15 to 60 seconds, and the runtime\'s wait for a function raised to match.',
        ],
      },
      {
        title: 'What I would change',
        body: [
          'A failure part-way leaves earlier orders placed and does not compensate them; the buyer is told, but a saga with an explicit compensation or a single commerce call that accepts several locations would be safer. I would also send an idempotency key per location so a retried message cannot double-place.',
        ],
      },
      {
        title: 'Ownership',
        body: [{ list: ['Built: the sequenced placement, the per-location summary and the blank-list tolerance, with tests.'] }],
      },
    ],
  },

  // ------------------------------------------------------------------ 9
  {
    slug: 'micro-frontends',
    title: 'Module Federation across a 19-app Nx monorepo',
    dek: 'One host, seven independently deployed remotes, five shared singletons, and a deploy script that keeps the host pointing at fresh remote entries.',
    summary: 'The host and remote shape, the shared-singleton choices, and the deploy path.',
    year: '2023 to 2026',
    meta: [
      ['Role', 'Set up and maintained remotes and their deploys'],
      ['Scope', '19 apps in one Nx workspace'],
      ['Stack', 'React, TypeScript, Webpack 5 Module Federation, Nx, GitHub Actions, CloudFront, Amplify'],
    ],
    facts: [
      ['19', 'apps in the workspace'],
      ['1 + 7', 'host and independently deployed remotes'],
      ['5', 'shared singletons'],
      ['tags', 'the only way to deploy to production'],
    ],
    sections: [
      {
        title: 'Shape',
        body: [
          'The seller app is the host. It loads remotes for commerce, communication, super-admin, support, turnover schemes, RMC and reports. Each remote exposes a single entry, and product areas deploy on their own schedule.',
          { code: { caption: 'A remote (simplified)', text:
`new ModuleFederationPlugin({
  name: 'comms',
  filename: 'remoteEntry.js',
  exposes: { './Module': 'apps/comms-web-app/src/remote-entry.ts' },
  shared: {
    react:                        { singleton: true, eager: false, requiredVersion: false },
    'react-dom':                  { singleton: true, eager: false, requiredVersion: false },
    '@zonofi/seller-rtk-store':   { singleton: true, requiredVersion: false },
    'react-router-dom':           { singleton: true, requiredVersion: false },
    '@zonofi/i18n':               { singleton: true, requiredVersion: false },
  },
})` } },
          'The host declares the same five shared modules and a `remotes` map read from a JSON file. React, the router, the store and i18n must exist once at runtime: two copies of React break hooks, and two store instances break shared state.',
        ],
      },
      {
        title: 'Trade-offs I made or inherited',
        body: [
          { list: [
            '`requiredVersion: false` skips version negotiation. It removes runtime conflicts between separately built apps, and it means a remote built against a different major version fails at runtime, not build time. It is the right default while everything lives in one workspace and moves together, and the wrong one once it does not.',
            'Chunking differs by role: the host splits everything into chunks capped near 200 KB, remotes only split async chunks, capped near 400 KB.',
            'Independent deploys mean version skew is normal. The mitigation is a stable exposed contract (one `./Module` entry per remote) and a shared package set that changes deliberately.',
          ] },
        ],
      },
      {
        title: 'Deploy path',
        body: [
          'Each deployable app has its own workflow. Production deploys are refused unless they run from a tag. Before the host is built, a script regenerates the remotes map: each remote gets its CDN URL with a build id appended, so browsers never hold a stale `remoteEntry.js`. A remote can also be pointed at a local port for development, and the script fails loudly when a mapping is missing.',
          { code: { caption: 'Remote entry URL with a cache buster (simplified)', text:
`const BUILD_ID = process.env.BUILD_ID || Date.now();

const getHostUrl = (hostOrUrl) => {
  if (/^https?:\\/\\//.test(hostOrUrl)) return withEntry(hostOrUrl.replace(/\\/$/, ''));
  return 'https://' + hostOrUrl + '.cloudfront.net/remoteEntry.js?v=' + BUILD_ID;
};

// dev remotes point at localhost, no cache busting; static remotes get the build id` } },
        ],
      },
      {
        title: 'What I did',
        body: [
          { list: [
            'Added the support and super-admin remotes in 2023, the turnover-schemes app in late 2025 and the RMC app in 2026, each with its deploy workflow (including Amplify for the newer apps).',
            'Kept the remotes map and cache-busting working across environments as the number of remotes grew.',
            'Sped up CI with a two-layer dependency cache and a PR test workflow, and fixed disk-space failures in the deploy runners.',
          ] },
          'The host and remote conventions and the update script were shared work with the frontend team.',
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Contract tests for each remote\'s exposed module, an error boundary per remote so one failing remote cannot blank the shell, a health check of the new `remoteEntry.js` before the host deploy proceeds, and typed remotes so the host catches an API change at build time.',
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 10
  {
    slug: 'access-control',
    title: 'Two layers of access: what a workspace has, and what a person may do',
    dek: 'Workspace-level module access on top of role-based permissions, from a DynamoDB table to route guards to the buttons a user sees.',
    summary: 'A module-access API and the way roles, modules and the frontend fit together.',
    year: '2026',
    meta: [
      ['Role', 'Drove the design; built the module-access API, the super-admin roles screen and permission gating'],
      ['Scope', 'Orgs service API, gateway routes, seller and super-admin apps'],
      ['Stack', 'NestJS, DynamoDB, KrakenD, React, TypeScript'],
    ],
    facts: [
      ['2', 'layers: modules a workspace has, permissions a person has'],
      ['0', 'code changes per customer to give them a custom role'],
    ],
    sections: [
      {
        title: 'Two questions, kept apart',
        body: [
          'Access control at a multi-tenant product answers two different questions. Which parts of the product has this workspace been given (a commercial decision made by a super admin)? And within those, what may this particular person do (an operational decision made by the workspace)? Mixing them produces roles named "Sales with Reports but not Schemes", one per customer.',
          { pre:
`request
  |
  1. module access   Does this workspace have this app/module enabled?   (super admin sets)
  |                  Does this user have it enabled within the workspace?
  |
  2. role permissions  Do the user's roles, for their user type, include every permission
                       this route declares?                               (workspace admin sets)
  |
frontend: hide routes and buttons using the same two answers` },
        ],
      },
      {
        title: 'Layer 1: module access',
        body: [
          'Config is a map of app to enabled modules, stored per workspace and per user in one DynamoDB table (partition key the workspace, sort key the record type). The API is small on purpose:',
          { list: [
            'Workspace config, writable by super admins only.',
            'User config within a workspace; the user id comes from the JWT, not the path, so a caller cannot ask for someone else\'s.',
            'No separate "permissions" endpoint. Clients read the user config directly, which removed a redundant round trip.',
          ] },
          { code: { caption: 'Stored item and input normalisation (simplified)', text:
`interface ModuleAccessItem {
  workspaceId: string;                     // PK: "WORKSPACE#<id>"
  type: string;                            // SK: "CONFIG" or a user record
  enabledModules: Record<string, string[]>; // app -> modules
  updatedAt?: string; updatedBy?: string;
}

// keep only non-empty strings, de-duplicate, preserve order
for (const [app, modules] of Object.entries(input)) {
  if (!app || !Array.isArray(modules)) continue;
  out[app] = unique(modules.filter(m => typeof m === 'string' && m.trim()));
}` } },
          'Old rows had been imported by hand with different key shapes (bare ids, lowercase types), so reads try the candidates in order instead of failing on a table that was never uniform.',
        ],
      },
      {
        title: 'Layer 2: role permissions',
        body: [
          'Routes declare the permissions they need. A guard resolves the caller\'s workspace roles for their user type into a permission set and requires every declared permission. Bots and principal users bypass it, and it fails closed if the caller has no roles.',
          { code: { caption: 'The check, reduced to its idea', text:
`const required = reflector.get('permissions', handler);
if (!required) return true;                    // route declares nothing: open

const granted = [];
for (const role of user.workspaceRoles)
  granted.push(...await permissions.forRole(role, user.userType));

return required.every(p => granted.includes(p));` } },
        ],
      },
      {
        title: 'Why roles, and not per-user grants',
        body: [
          { list: [
            'Per-user grants do not scale operationally: every hire is a checklist, and nobody can answer "who can approve dispatches?" without reading every user.',
            'Roles let a workspace configure its own structure without a release, which is the requirement that mattered for enterprise customers.',
            'Roles compose with the module layer: the module layer bounds what is possible, roles decide who does it.',
            'The cost is role sprawl and a per-request lookup, which is why permission resolution should be cached.',
          ] },
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Deny by default: a route with no declared permissions is currently open, which is convenient and dangerous. Cache permission resolution with short-lived invalidation on role change. Add an audit log of grants and changes, and consider attribute-based rules for cases roles model badly (this customer group, this region).',
        ],
      },
      {
        title: 'Ownership',
        body: [{ list: [
          'Built: the module-access API (workspace and user config), its gateway routes, the super-admin roles screen, and route and button permission gating in the apps.',
          'Drove: the split between module access and role permissions.',
          'Shared with the team: the role-permission guard and its schema, and the seller-side module-access tab.',
        ] }],
      },
    ],
  },

  // ------------------------------------------------------------------ 11
  {
    slug: 'rep-mapping-history',
    title: 'Built it, measured it, paused it',
    dek: 'A feature that used a sales rep\'s past orders as evidence for product matching. The data said it would not pay off yet.',
    summary: 'How replaying production history turned a half-built feature into a deliberate stop.',
    year: '2026',
    meta: [
      ['Role', 'Built the prototype; made the call to pause'],
      ['Stack', 'TypeScript, NestJS, PostgreSQL'],
    ],
    facts: [
      ['~5%', 'of later lines would have been helped by history'],
      ['60 to 67%', 'of the time the right product was in the top 3 when shown'],
      ['371', 'rep order lines in 180 days, mostly test orders'],
    ],
    sections: [
      {
        title: 'The idea',
        body: [
          'Reps type product names in shorthand. If the same rep once mapped "choco syr" to a specific product, the matcher should treat that pair as strong evidence next time. It is the alias idea, keyed on the person instead of the customer.',
          'I built it end to end: a commerce endpoint that returns distinct buyer-text to final-product pairs by line date (applying post-submit remaps), an index on user and channel, and a function in the pipeline that scores history rows per line (with typo, truncation and code rules and a size guard), returns the top three, never throws, and is switched on by a flag. The matcher takes the hits as optional evidence.',
        ],
      },
      {
        title: 'What the data said',
        body: [
          'Before tuning anything I read the production data with read-only queries. Four things changed the plan:',
          { list: [
            'The order file records who placed the order, but it is reused as the cart, so dates on the file are wrong for history. Line dates are the right key.',
            'Cart remaps were never recorded as manual in 180 days, so the "the rep corrected it" signal I wanted mostly did not exist.',
            'Sales reps had almost no history: 371 lines in 180 days, mostly test orders, against about 15,000 lines for customers.',
            'Replaying real customer lines against the history: it would have helped about 5% of later lines, and when it did the right product was in the top three roughly 60 to 67% of the time.',
          ] },
        ],
      },
      {
        title: 'The decision',
        body: [
          'A feature that helps one line in twenty, on a population with almost no history, is not worth another sprint of tuning while the alias ranker was still missing shorthand that the store already knew. I paused it behind the flag (off by default), wrote a handover, and moved to the ranker, which produced the measured lift in the alias case study.',
        ],
      },
      {
        title: 'What I take from it',
        body: [
          'Read the data before building the feature. A two-hour replay would have told me the same thing before the endpoint, the migration and the scoring code existed. The stop was the right call; the order of work was the mistake.',
          'It also matters that the code stays inert. The flag is off, the endpoint is additive, and the branch documents exactly what to re-check (rep history volume) before anyone resumes.',
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 12
  {
    slug: 'production-canary',
    title: 'A canary that talks to the bot',
    dek: 'A scheduled check that behaves like a real user, and the design choices that keep it from crying wolf.',
    summary: 'Real login, real message, real reply, and alerts only when something breaks.',
    year: '2026',
    meta: [
      ['Role', 'Built and operated'],
      ['Stack', 'TypeScript, Vitest, GitHub Actions, Microsoft Teams webhooks'],
    ],
    facts: [
      ['10 min', 'check interval'],
      ['3', 'assertions: WhatsApp session up, alert channel reachable, bot answers'],
    ],
    sections: [
      {
        title: 'Why not just health endpoints',
        body: [
          'Service health endpoints stay green while the product is broken. The failure I care about is a customer sending a message and getting nothing back. So the canary is the customer: it signs in, sends a message in the way a real one arrives, and waits for the bot\'s reply.',
        ],
      },
      {
        title: 'Design',
        body: [
          { list: [
            'It checks that the WhatsApp session is connected, that the alert channel is reachable (an alert path that is broken is its own outage), and that the bot answers a greeting within a bounded poll.',
            'The seller session is minted through the real OTP sign-in each run. A pasted token expires silently and turns the canary into a source of false alarms.',
            'The reply check matches the menu\'s row titles as well as text, because the bot answers with an interactive list, not a sentence.',
            'Alerts fire on failure only, in an adaptive card with the time in IST and the failing assertion. Pass notifications train people to ignore the channel.',
            'It used to send the greeting twice per run. Fixing that removed a source of confusing double replies in the channel it tests.',
          ] },
        ],
      },
      {
        title: 'When it earned its keep',
        body: [
          'One night every check failed for about nine hours. The alert fired; the CI run still showed green, because the scheduler ran once per invocation and ignored its own exit code. The cause was a configuration difference in a day/night deployment swap (see the production notes), which no unit test or health endpoint would have caught, and which the canary caught within ten minutes of starting.',
          'Two changes followed: the canary\'s exit code becomes the job\'s status, and the trigger moved out of the CI scheduler, which is best-effort at short intervals, to an external one.',
        ],
      },
      {
        title: 'What I would change',
        body: [
          'Several canaries per flow (order, payment, catalogue) rather than one greeting, a status page fed by the same results, and an on-call route that pages after two consecutive failures instead of alerting a shared channel on the first.',
        ],
      },
    ],
  },
];
