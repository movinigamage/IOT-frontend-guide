import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Callout, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';

export default function IntegrationSupportPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Integration Support and Issue Reporting</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to investigate frontend-backend integration problems and report them with useful evidence.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Use It"
          fixLabel="Key Thing To Remember"
          state="How to investigate and report a frontend-backend bug with real evidence."
          issue="Whenever something is broken and you are not sure if it is frontend or backend."
          fix={'Always include the actual request, response, and status code, not just "it does not work."'}
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Before Reporting an Issue</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A good issue report helps the team solve the problem faster. Before reporting, collect enough information to show where the problem is likely happening.
          </p>
          <GuideTable
            columns={['Question', 'Why it helps']}
            rows={[
              ['Was an API request sent?', 'If no request was sent, the problem may be in the frontend event, service, or mock/live switch.'],
              ['Which endpoint was used?', 'A wrong endpoint can make the backend look broken when the frontend called the wrong place.'],
              ['Was the correct method used?', 'GET and POST are not interchangeable.'],
              ['Were the parameters correct?', 'Missing or invalid parameters can cause validation errors.'],
              ['What HTTP status was returned?', 'The status code gives the first clue about success or failure.'],
              ['What response was returned?', 'The response body often explains the problem.'],
              ['Does it match the API reference?', 'A mismatch may be a contract or integration problem.'],
              ['Did the frontend service process it?', 'The backend may be correct while the frontend adapter fails.'],
              ['Did the component receive expected data?', 'The service may be correct while rendering fails.'],
              ['Is the problem only in rendering?', 'The UI can fail even when the API and adapter are correct.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Identify the Likely Problem Area</h2>
          <StepFlow
            steps={[
              'No request sent',
              'Check frontend event/service',
              'Incorrect request',
              'Check integration code',
              'Correct request + backend error',
              'Check backend/service',
              'Correct response + UI fails',
              'Check frontend processing/rendering',
            ]}
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            This flow is a guide, not a strict rule. Real integration issues can involve more than one area.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Situations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="No request sent">
              <p>Likely frontend/service issue. Check whether the button, page load, hook, or mock/live switch actually triggers the request.</p>
            </GuideCard>
            <GuideCard title="Incorrect request">
              <p>Likely frontend integration issue. Check endpoint, method, parameters, and request body.</p>
            </GuideCard>
            <GuideCard title="Correct request + backend error">
              <p>Investigate backend, data, validation, authentication, or upstream service behaviour.</p>
            </GuideCard>
            <GuideCard title="Correct response + UI fails">
              <p>Likely frontend processing or rendering issue. Check adapter output, component props, and chart/table rendering.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Issue Reporting Template</h2>
          <CodeBlock>{`Feature:
Endpoint:
Expected behaviour:
Actual behaviour:

Request:
Response:
HTTP status:

Frontend component:
Screenshot / Network evidence:
Reproduction steps:

Suspected area:
- Frontend
- Backend
- Data
- Contract
- Unknown

Notes:
`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The most useful reports include the request, response, status code, and reproduction steps. This prevents the team from spending time guessing what happened.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Example Report</h2>
          <div className="bg-card/50 border border-border rounded-lg p-6 space-y-3">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Feature:</strong> Dashboard series loading
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Endpoint:</strong> GET /api/datasets/thingspeak-live/series
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Actual behaviour:</strong> The request returns data, but the chart stays empty.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Suspected area:</strong> Frontend adapter or chart rendering, because the backend response includes rows.
            </p>
          </div>
        </section>

        <Callout title="Final practical rule" tone="yellow">
          <p>Do not report only that "the API does not work." Report what was requested, what came back, and where the frontend stopped behaving as expected.</p>
        </Callout>

        <NextUp title="Next Step">
          <p>If you are unsure whether a response is correct, compare it with the Data API Reference.</p>
          <Link href="/guide/data-api-reference" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Return to Data API Reference <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
