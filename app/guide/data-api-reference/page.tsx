import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Callout, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StatusBadge, StepFlow } from '@/components/guide/GuideBlocks';

type KnownIssue = {
  tone: 'blue' | 'yellow' | 'red';
  title: string;
  text: string;
  linkHref: string;
  linkLabel: string;
};

type ApiSection = {
  title: string;
  slug: string;
  status: ReactNode;
  statusTone: 'available' | 'pending';
  statusLabel: string;
  does: string;
  when: string;
  method: string;
  endpoint: string;
  parameters: string;
  request: string;
  response: string;
  currentResponse?: string;
  fields: string[][];
  frontend: string;
  emptyError: string;
  current: string;
  knownIssue?: KnownIssue;
};

const apiSections: ApiSection[] = [
  {
    title: 'Datasets',
    slug: 'datasets',
    status: <StatusBadge key="datasets" tone="available">Live / Transitional Response</StatusBadge>,
    statusTone: 'available',
    statusLabel: 'Live / Transitional Response',
    does: 'Lists the datasets the IoT backend knows about.',
    when: 'Use it when the frontend needs dataset cards, dataset selectors, or a dataset landing page instead of hard-coded dataset information.',
    method: 'GET',
    endpoint: '/api/datasets',
    parameters: 'None required for the basic dataset list.',
    request: 'GET /api/datasets',
    currentResponse: `[
  {
    "id": 1,
    "name": "thingspeak-live",
    "description": "Live IoT sensor dataset for dashboard monitoring and analysis.",
    "updatedAt": "2026-09-01T00:55:37.000Z"
  }
]`,
    response: `{
  "data": {
    "datasets": [
      {
        "id": 1,
        "name": "thingspeak-live",
        "displayName": "ThingSpeak Live Sensor Feed"
      }
    ]
  },
  "meta": {
    "contractVersion": "v1"
  }
}`,
    fields: [
      ['(top-level array, what you get today)', 'The backend currently returns a plain JSON array of datasets, not the V1 envelope shown as the target below.', 'useDatasets.js already reads this directly with Array.isArray(datasetList).'],
      ['dataset.id', 'Backend numeric ID.', 'Used to call GET /api/datasets/:id for full detail.'],
      ['dataset.name', 'Backend dataset identity, such as thingspeak-live.', 'Use for dashboard/API identity.'],
      ['data.datasets (V1 target)', 'The planned final envelope shape.', 'Not live yet: only update useDatasets.js if the backend actually switches to this shape.'],
    ],
    frontend: 'HomePage.jsx already does this through useDatasets.js: it normalizes the response with buildDatasetCard() and calls GET /api/datasets/:id for each dataset\'s detail. If you add a new dataset display field, add it inside buildDatasetCard() rather than writing new request logic.',
    emptyError: 'Empty means the request worked but no datasets are available. Error means the list could not be loaded; show a retry/error state.',
    current: 'Live and already wired up: HomePage.jsx loads real datasets through useDatasets(). No hard-coded dataset array remains. The backend still returns a plain array today, not the {"data":{"datasets":[...]}} envelope shown below as the V1 target.',
  },
  {
    title: 'Series',
    slug: 'series',
    status: <StatusBadge key="series" tone="available">Live / Transitional Response</StatusBadge>,
    statusTone: 'available',
    statusLabel: 'Live / Transitional Response',
    does: 'Returns time-series sensor rows for one dataset.',
    when: 'Use it when the dashboard needs real rows for charts, stream selectors, time controls, statistics, scatter plots, and local analytics.',
    method: 'GET',
    endpoint: '/api/datasets/:name/series',
    parameters: ':name is the backend dataset name, such as thingspeak-live.',
    request: 'GET /api/datasets/thingspeak-live/series',
    currentResponse: `[
  {
    "created_at": "2026-08-13T00:55:37.000Z",
    "entry_id": 5702066,
    "field1": 113,
    "field2": 1.8,
    "field3": 0,
    "field4": 0.1,
    "field5": 0,
    "field6": 29.59,
    "field7": 0,
    "field8": 0
  }
]`,
    response: `{
  "data": {
    "dataset": {
      "id": 5,
      "name": "thingspeak-live",
      "displayName": "ThingSpeak Live Sensor Feed"
    },
    "series": [
      {
        "created_at": "2026-08-13T00:55:37.000Z",
        "entry_id": 5702066,
        "field1": 113,
        "field2": 1.8,
        "field6": 29.59
      }
    ]
  }
}`,
    fields: [
      ['(top-level array, what you get today)', 'The backend currently returns a plain array of sensor rows for this dataset.', 'sensorService.js already requires Array.isArray(rows) and throws a clear error otherwise.'],
      ['created_at', 'Row timestamp.', 'Use for time axes and time filters.'],
      ['entry_id', 'Sensor entry identifier.', 'Use for entry-range filtering and debugging.'],
      ['field1...field8', 'Sensor stream values.', 'Use as selectable stream fields.'],
      ['data.series (V1 target)', 'The planned final envelope shape.', 'Not live yet: the array above is what the frontend must handle today.'],
    ],
    frontend: 'Once the known bug below is fixed, sensorService.js already builds GET {baseUrl}/datasets/{datasetId}/series, validates the response is an array, and derives the available stream list by excluding dataset_id, created_at, and entry_id from row keys. Rows already reach the existing charts, stats, and scatter plots unchanged.',
    emptyError: 'Empty or not found means the selected dataset has no rows or does not exist. Error means live series data could not be loaded.',
    current: 'Live, not mock: Dashboard.jsx already targets this endpoint through useSensorData() and sensorService.js. A known frontend bug (see below) currently stops it from ever being called. The backend still returns a plain array today, not the V1 envelope shown below as the target.',
    knownIssue: {
      tone: 'red',
      title: 'Known frontend bug blocks this endpoint today',
      text: 'The API itself works: persisted rows have already been returned and verified. The problem is a frontend call-site bug: Dashboard.jsx currently passes arguments to useSensorData() in the wrong order, so no request is ever sent and every dashboard shows "Error loading data". This is a one-line fix, not a missing feature.',
      linkHref: '/guide/mock-to-live-integration/series',
      linkLabel: 'See the exact fix in the Series Mock-to-Live guide',
    },
  },
  {
    title: 'Filters',
    slug: 'filters',
    status: <StatusBadge key="filters" tone="available">Live / Transitional Response</StatusBadge>,
    statusTone: 'available',
    statusLabel: 'Live / Transitional Response',
    does: 'Returns selected stream fields for a dataset.',
    when: 'Use it when selected stream data should come from the backend. Keep useful local time and display controls where they still make sense.',
    method: 'POST',
    endpoint: '/api/datasets/:name/series/filter',
    parameters: ':name is the dataset name. The request body must include streamNames.',
    request: `POST /api/datasets/thingspeak-live/series/filter
Content-Type: application/json

{
  "streamNames": ["field1", "field2", "field6"]
}`,
    currentResponse: `[
  {
    "created_at": "2026-08-13T00:55:37.000Z",
    "entry_id": 5702066,
    "field1": 113,
    "field2": 1.8,
    "field6": 29.59
  }
]`,
    response: `{
  "data": {
    "dataset": {
      "name": "thingspeak-live"
    },
    "filters": {
      "streamNames": ["field1", "field2", "field6"]
    },
    "series": [
      {
        "created_at": "2026-08-13T00:55:37.000Z",
        "entry_id": 5702066,
        "field1": 113,
        "field2": 1.8,
        "field6": 29.59
      }
    ]
  }
}`,
    fields: [
      ['(top-level array, what you get today)', 'The backend currently returns a plain array of filtered rows, with no dataset/filters wrapper.', 'A normalizer should read this directly rather than assume data.series exists yet.'],
      ['streamNames', 'Selected backend field names, sent in the request body.', 'Build from selected stream controls.'],
      ['created_at and entry_id', 'Row context fields, always included.', 'Preserve for existing charts and filters.'],
      ['data.series (V1 target)', 'The planned final envelope shape.', 'Not live yet: handle the plain array above today.'],
      ['400 error', 'streamNames must be a non-empty array.', 'Show readable validation when no streams are selected.'],
    ],
    frontend: 'Send selected field names as streamNames, normalize the returned array, then pass rows to existing charts and statistics.',
    emptyError: 'A 400 validation error can happen when streamNames is missing or empty. Empty rows are valid when no matching data exists.',
    current: 'Live: the backend validates streamNames and returns matching rows today as a plain array, not the V1 envelope shown below. The frontend also performs useful time and interval filtering locally, on top of this.',
  },
  {
    title: 'Analytics',
    slug: 'analytics',
    status: <StatusBadge key="analytics" tone="pending">Prepare Now / Pending Backend</StatusBadge>,
    statusTone: 'pending',
    statusLabel: 'Prepare Now / Pending Backend',
    does: 'Intended to return backend-generated analytics for selected dataset streams.',
    when: 'Use it later for backend analysis cards or summaries after backend analytics is complete.',
    method: 'POST',
    endpoint: '/api/analyse',
    parameters: 'Request body should include datasetName, streamNames, analysisType, and optional time bounds when supported.',
    request: `POST /api/analyse
Content-Type: application/json

{
  "datasetName": "thingspeak-live",
  "streamNames": ["field1", "field2", "field6"],
  "analysisType": "summary",
  "from": "2026-08-13T00:55:37.000Z",
  "to": "2026-08-13T00:57:37.000Z"
}`,
    response: `{
  "data": {
    "dataset": {
      "name": "thingspeak-live"
    },
    "analysis": {
      "analysisType": "summary",
      "streams": [
        { "name": "field1", "count": 3, "min": 0, "max": 113, "average": 37.67 }
      ]
    }
  }
}`,
    fields: [
      ['datasetName', 'Dataset being analysed.', 'Use the current dashboard dataset name.'],
      ['streamNames', 'Streams selected for analysis.', 'Use selected stream state.'],
      ['data.analysis', 'Future backend analytics result.', 'Render only after real backend analytics is available.'],
      ['analysis.streams', 'Per-stream summary values.', 'Future analysis card input.'],
    ],
    frontend: 'Keep current local analytics working. A frontend service (analysisService.js) already exists and is ready to wire in, but do not replace local analytics with placeholder backend output.',
    emptyError: 'Placeholder output should be treated as unavailable, not success. Empty selected data should show a clear no-data state.',
    current: 'Endpoint exists, but the backend service currently returns a fixed placeholder message ("Analysis completed (placeholder)") instead of real analytics. Do not present it as fully live.',
  },
  {
    title: 'Latest Alerts',
    slug: 'latest-alerts',
    status: <StatusBadge key="latest" tone="pending">Contract Ready / Pending Backend</StatusBadge>,
    statusTone: 'pending',
    statusLabel: 'Contract Ready / Pending Backend',
    does: 'Intended to return the most recent alert records for a dataset.',
    when: 'Use it later for a latest-alert summary panel after backend alert persistence and the live route are available.',
    method: 'GET',
    endpoint: '/api/alerts/latest',
    parameters: 'Optional query values may include datasetName and limit.',
    request: 'GET /api/alerts/latest?datasetName=thingspeak-live&limit=2',
    response: `{
  "data": {
    "dataset": {
      "name": "thingspeak-live"
    },
    "alerts": [
      {
        "id": "alert_5702066_field1_high",
        "datasetName": "thingspeak-live",
        "entry_id": 5702066,
        "streamName": "field1",
        "severity": "warning",
        "status": "active",
        "message": "field1 exceeded the configured warning threshold.",
        "value": 113,
        "threshold": 100,
        "created_at": "2026-08-13T00:55:37.000Z"
      }
    ]
  }
}`,
    fields: [
      ['data.alerts', 'Latest alert list.', 'Render alert summary rows.'],
      ['severity', 'Alert level.', 'Style the alert label.'],
      ['status', 'Alert state.', 'Show active or resolved state when available.'],
      ['message', 'Human-readable alert text.', 'Primary alert copy.'],
      ['value and threshold', 'Why the alert fired.', 'Help the user understand the alert.'],
    ],
    frontend: 'Prepare a latest-alert panel and normalizer only as unavailable/future work until the backend route is live. ActiveAlerts.jsx already exists and already renders every state correctly; it is just not mounted anywhere yet.',
    emptyError: 'Empty means no current alerts. Missing route or backend failure should show unavailable, not fake alert data.',
    current: 'Frontend-ready contract/examples exist, but no alerts table, route, controller, service, or repository currently exists in the backend at all. Do not present it as live.',
  },
  {
    title: 'Alert History',
    slug: 'alert-history',
    status: <StatusBadge key="history" tone="pending">Contract Ready / Pending Backend</StatusBadge>,
    statusTone: 'pending',
    statusLabel: 'Contract Ready / Pending Backend',
    does: 'Intended to return previous alerts with filters and pagination.',
    when: 'Use it later for a history table or alert review view after backend alert history is available.',
    method: 'GET',
    endpoint: '/api/alerts/history',
    parameters: 'Optional query values may include datasetName, status, severity, from, to, limit, and offset.',
    request: 'GET /api/alerts/history?datasetName=thingspeak-live&status=resolved&severity=warning&limit=20&offset=0',
    response: `{
  "data": {
    "alerts": [
      {
        "id": "alert_5702066_field1_high",
        "datasetName": "thingspeak-live",
        "streamName": "field1",
        "severity": "warning",
        "status": "resolved",
        "message": "field1 exceeded the configured warning threshold.",
        "created_at": "2026-08-13T00:55:37.000Z",
        "resolved_at": "2026-08-13T01:05:37.000Z"
      }
    ],
    "pagination": {
      "limit": 20,
      "offset": 0,
      "total": 1
    }
  }
}`,
    fields: [
      ['data.alerts', 'Historical alert rows.', 'Render the table/list.'],
      ['data.pagination.limit', 'Page size.', 'Drive page-size display.'],
      ['data.pagination.offset', 'Current starting row.', 'Drive previous/next controls.'],
      ['data.pagination.total', 'Total matching rows.', 'Show result count and disable next when done.'],
      ['resolved_at', 'Resolved time when available.', 'Show in history rows.'],
    ],
    frontend: 'Prepare a history table/view, query state, and normalizer that returns alerts plus pagination. Keep it unavailable until the backend route exists.',
    emptyError: 'Empty means no matching alert history. Missing route or backend failure should show unavailable, not fake rows.',
    current: 'Frontend-ready contract/examples exist, but the live backend route is not implemented yet: there is no alerts table in the backend at all yet. Do not present it as live.',
  },
];

export default function DataApiReferencePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Data API Reference and Frontend-Ready Examples</h1>
        <p className="text-lg text-muted-foreground">
          A frontend-focused reference for the IoT APIs used by dataset, series, filter, analytics, alert, and authentication work.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Use It"
          fixLabel="Key Thing To Remember"
          state="A lookup table of every backend endpoint: method, URL, example request, and example response."
          issue="Whenever you need to know exactly what an endpoint expects or returns."
          fix="Most data routes still return a plain array today, not the V1 envelope. Each section below shows both shapes."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How to Use This Page</h2>
          <p className="text-muted-foreground leading-relaxed">
            Start with the plain-English purpose, then use the method, endpoint, examples, and response-field tables when you are ready to connect frontend code.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Frontend-ready API examples ([W5] [AFI-12] Publish Final Frontend-Ready API Examples For Live Integration) give agreed request and response examples for live integration work.
          </p>
          <StepFlow steps={['Read what it does', 'Check when the frontend uses it', 'Review method and endpoint', 'Map response fields to UI', 'Check current backend status']} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Current Backend Readiness</h2>
          <p className="text-sm text-muted-foreground mb-4">{apiSections.length + 2} APIs · click a card to jump to its details below.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {apiSections.map((api) => (
              <a
                key={api.title}
                href={`#${api.slug}`}
                className="group block rounded-2xl border border-border/70 bg-card/50 p-5 shadow-sm transition-colors hover:border-blue-400 dark:hover:border-blue-500"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">{api.title}</h3>
                  <StatusBadge tone={api.statusTone}>{api.statusLabel}</StatusBadge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{api.current}</p>
              </a>
            ))}
            <a
              href="#auth"
              className="group block rounded-2xl border border-border/70 bg-card/50 p-5 shadow-sm transition-colors hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">Authentication</h3>
                <StatusBadge tone="available">Live</StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">Register, login, email MFA, refresh, logout, and password reset. Fully implemented and already used by Login.jsx, RegistrationPage.jsx, and ForgotPassword.jsx.</p>
            </a>
            <a
              href="#legacy-routes"
              className="group block rounded-2xl border border-border/70 bg-card/50 p-5 shadow-sm transition-colors hover:border-red-400 dark:hover:border-red-500"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-red-600 dark:group-hover:text-red-400">Legacy Mock Routes</h3>
                <StatusBadge tone="pending">Do Not Use</StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">/api/streams, /api/stream-names, and others. Currently broken by a backend bug. Use the dataset-based APIs above instead.</p>
            </a>
          </div>
        </section>

        {apiSections.map((api) => (
          <section key={api.title} id={api.slug} className="scroll-mt-24">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{api.title}</h2>
              <span className="text-sm text-muted-foreground">Status:</span>
              {api.status}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GuideCard title="What it does">
                  <p>{api.does}</p>
                </GuideCard>
                <GuideCard title="When the frontend uses it">
                  <p>{api.when}</p>
                </GuideCard>
              </div>
              <GuideTable
                columns={['Method', 'Endpoint', 'Parameters']}
                rows={[[api.method, <code key={api.endpoint} className="text-blue-300">{api.endpoint}</code>, api.parameters]]}
              />
              <GuideCard title="Request Example">
                <CodeBlock>{api.request}</CodeBlock>
              </GuideCard>
              {api.currentResponse ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GuideCard title="Current Response (What You Get Today)">
                    <CodeBlock>{api.currentResponse}</CodeBlock>
                  </GuideCard>
                  <GuideCard title="V1 Target Response (Contract Goal)">
                    <CodeBlock>{api.response}</CodeBlock>
                  </GuideCard>
                </div>
              ) : (
                <GuideCard title="Response Example">
                  <CodeBlock>{api.response}</CodeBlock>
                </GuideCard>
              )}
              <GuideTable columns={['Important response field', 'What it means', 'What the frontend does']} rows={api.fields} />
              {api.knownIssue && (
                <Callout title={api.knownIssue.title} tone={api.knownIssue.tone}>
                  <p>{api.knownIssue.text}</p>
                  <Link href={api.knownIssue.linkHref} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                    {api.knownIssue.linkLabel} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Callout>
              )}
              <GuideCard title="What the frontend does with the response">
                <p>{api.frontend}</p>
              </GuideCard>
              <GuideCard title="Empty / error behaviour">
                <p>{api.emptyError}</p>
              </GuideCard>
              <GuideCard title="Current backend status">
                <p>{api.current}</p>
              </GuideCard>
            </div>
          </section>
        ))}

        <section id="auth" className="scroll-mt-24">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-foreground">Authentication API</h2>
            <span className="text-sm text-muted-foreground">Status:</span>
            <StatusBadge tone="available">Live</StatusBadge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GuideCard title="What it does">
                <p>Handles account creation, login, optional email-based two-factor verification, session refresh, logout, and password reset. This is a real, complete implementation backed by PostgreSQL, bcrypt password hashing, and JWT access tokens, not a stub.</p>
              </GuideCard>
              <GuideCard title="When the frontend uses it">
                <p>Login.jsx, RegistrationPage.jsx, and ForgotPassword.jsx already call these endpoints. Any new authenticated feature (such as creating a dataset) needs an Authorization: Bearer token from this API.</p>
              </GuideCard>
            </div>

            <GuideTable
              columns={['Method', 'Endpoint', 'Purpose', 'Auth required']}
              rows={[
                ['POST', <code key="register" className="text-blue-300">/api/auth/register</code>, 'Create an account with an email and password.', 'No'],
                ['POST', <code key="login" className="text-blue-300">/api/auth/login</code>, 'Log in. Returns a session, or an MFA challenge if the account has MFA enabled.', 'No'],
                ['POST', <code key="mfa-verify" className="text-blue-300">/api/auth/mfa/verify</code>, 'Complete login with the 6-digit code emailed to the user.', 'No (uses mfaChallengeId)'],
                ['POST', <code key="mfa-resend" className="text-blue-300">/api/auth/mfa/resend</code>, 'Request a new code. Rate-limited to one per 60 seconds.', 'No (uses mfaChallengeId)'],
                ['POST', <code key="refresh" className="text-blue-300">/api/auth/refresh</code>, 'Exchange the httpOnly refresh cookie for a new access token.', 'No (cookie-based)'],
                ['POST', <code key="logout" className="text-blue-300">/api/auth/logout</code>, 'Revoke the current session.', 'No (cookie-based)'],
                ['POST', <code key="reset-req" className="text-blue-300">/api/auth/password-reset/request</code>, 'Email a password reset token.', 'No'],
                ['POST', <code key="reset-confirm" className="text-blue-300">/api/auth/password-reset/confirm</code>, 'Set a new password using that token.', 'No'],
                ['GET', <code key="admin" className="text-blue-300">/api/auth/admin/users</code>, 'List all users.', 'Yes: Bearer token, admin role'],
              ]}
            />

            <Callout title="The session model, in plain terms" tone="blue">
              <p>A successful login (or a completed MFA step) returns an accessToken in the JSON response and sets an httpOnly iot_refresh cookie the frontend cannot read directly.</p>
              <p>authClient.js keeps the access token in memory only, not in localStorage. On every page refresh, the access token is gone until ProtectedRoute calls POST /api/auth/refresh (using the cookie) to get a new one. If an authenticated request fails right after a page reload, check whether that refresh call has finished yet.</p>
              <p>Every authenticated request (such as POST /api/datasets) needs Authorization: Bearer &lt;accessToken&gt;. datasetService.js already does this and retries once automatically if the token has expired.</p>
            </Callout>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GuideCard title="Request Example: Login">
                <CodeBlock>{`POST /api/auth/login
Content-Type: application/json

{
  "email": "dev@databytes.local",
  "password": "correct-horse-battery",
  "rememberMe": false
}`}</CodeBlock>
              </GuideCard>
              <GuideCard title="Response: No MFA (200 OK)">
                <CodeBlock>{`{
  "data": {
    "accessToken": "eyJhbGciOi...",
    "expiresInSeconds": 900,
    "user": { "id": "...", "email": "dev@databytes.local", "role": "user" }
  },
  "meta": { "requestId": "req_..." }
}`}</CodeBlock>
              </GuideCard>
            </div>

            <GuideCard title="Response: MFA Required (202 Accepted)">
              <CodeBlock>{`{
  "data": {
    "mfaChallengeId": "a1b2c3d4-...",
    "expiresInSeconds": 300,
    "delivery": "email"
  },
  "meta": { "requestId": "req_..." }
}`}</CodeBlock>
              <p className="mt-3">When the response looks like this instead of an accessToken, the frontend must show an OTP-entry step and call POST /api/auth/mfa/verify with mfaChallengeId, otp, and rememberMe before a session exists.</p>
            </GuideCard>

            <GuideTable
              columns={['Error code', 'HTTP status', 'Meaning']}
              rows={[
                ['VALIDATION_ERROR', '400', 'A field failed validation (weak password, malformed email, mismatched confirmPassword).'],
                ['ACCOUNT_EXISTS', '409', 'Registration used an email that already has an account.'],
                ['INVALID_CREDENTIALS', '401', 'Login email or password was wrong.'],
                ['OTP_INVALID / OTP_EXPIRED', '400', 'The MFA code was wrong or the challenge expired.'],
                ['OTP_ATTEMPTS_EXCEEDED', '429', 'Too many wrong MFA attempts on one challenge.'],
                ['OTP_RESEND_THROTTLED', '429', 'A new code was requested before the 60-second cooldown elapsed.'],
                ['SESSION_EXPIRED', '401', 'The refresh cookie is missing, expired, or already revoked.'],
              ]}
            />

            <GuideCard title="What the frontend already does with this">
              <p>authClient.js already implements every one of these calls, including the retry-once-after-refresh pattern reused by datasetService.js. If a new feature needs auth, call the existing functions in authClient.js rather than writing new request logic.</p>
            </GuideCard>
          </div>
        </section>

        <section id="legacy-routes" className="scroll-mt-24">
          <Callout title="Legacy Mock-Data Routes: Do Not Use" tone="red">
            <p>
              GET /api/streams, GET /api/stream-names, POST /api/filter-streams, GET /api/data-profile, and POST /api/top-correlated-pair predate the current dataset-based API and are not dataset-aware.
            </p>
            <p>
              They are also currently broken: the backend service behind them calls an async database method without awaiting it, so these routes throw or return incorrect results today. Use the /api/datasets/:name/... endpoints documented above instead. If frontend code is found still pointing at one of these paths, that is worth raising through Integration Support.
            </p>
          </Callout>
        </section>

        <Callout title="Important beginner reminder" tone="yellow">
          <p>A documented API contract does not always mean the frontend already uses that API or that the backend feature is live. Check the status before presenting a feature as complete.</p>
        </Callout>

        <NextUp title="Next Step">
          <p>Now that you know the APIs, learn how frontend code should connect to the backend cleanly.</p>
          <Link href="/guide/frontend-backend-connection" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to Frontend-Backend Integration Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
