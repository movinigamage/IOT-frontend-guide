import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Callout, CheckList, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';

export default function APIDebuggingPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">API Testing and Troubleshooting</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to check whether backend data requests are working and how to investigate problems when the frontend does not show expected data.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="How to check whether a backend request actually worked, using Browser DevTools and status codes."
          issue="Whenever the frontend is not showing expected data and you are not sure why."
          fix="An empty response can be valid. Do not assume no data means the API failed."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Is API Testing?</h2>
          <p className="text-muted-foreground leading-relaxed">
            An API is a way for the frontend to ask the backend for data or send information. API testing means checking that request directly, often before or separately from the full frontend UI.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This helps you answer an important question: is the problem in the backend response, the frontend request, or the way the UI processes and renders the response?
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Key API Terms</h2>
          <GuideTable
            columns={['Term', 'Simple meaning']}
            rows={[
              ['Request', 'The message the frontend sends to the backend.'],
              ['Response', 'The message the backend sends back.'],
              ['Endpoint', 'The URL path where a request is sent, such as /api/items.'],
              ['HTTP method', 'The type of request, such as GET to read data or POST to send data.'],
              ['Parameters', 'Extra information sent with a request, often in the URL or request body.'],
              ['JSON', 'A common text format for sending structured data between frontend and backend.'],
              ['Status code', 'A number that tells whether the request succeeded or failed.'],
              ['CORS', 'Browser security rules that control whether one website can call another server.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Troubleshooting Flow</h2>
          <StepFlow
            steps={[
              'Frontend does not show data',
              'Was a request sent?',
              'Which endpoint was called?',
              'What status code was returned?',
              'What response came back?',
              'Does the frontend process it correctly?',
              'Does the component render it correctly?',
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Tools You Can Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Browser DevTools">
              <p>Built into the browser. Use the Network tab for requests and responses, and the Console for frontend errors.</p>
            </GuideCard>
            <GuideCard title="Network tab">
              <p>Shows the endpoint, method, status code, request payload, response body, timing, and headers.</p>
            </GuideCard>
            <GuideCard title="Console">
              <p>Shows JavaScript errors, failed parsing, undefined values, and temporary debug logs.</p>
            </GuideCard>
            <GuideCard title="Postman or Thunder Client">
              <p>Lets you test an API endpoint outside the UI, which helps isolate whether the UI is the problem.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Small Example</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A simple API request might look like this:
          </p>
          <CodeBlock>{`GET /api/datasets

Successful response:
{
  "data": {
    "datasets": []
  }
}`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The method is GET, the endpoint is /api/datasets, and the response is JSON. If the datasets array is empty, that can be a valid empty result rather than an error.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Status Codes</h2>
          <GuideTable
            columns={['Status', 'Meaning', 'What to check']}
            rows={[
              ['200', 'Success.', 'Does the response contain the data shape the UI expects?'],
              ['400', 'The request was invalid.', 'Check parameters and request body.'],
              ['401', 'Authentication is missing or invalid.', 'Check whether the user is signed in or a token is missing.'],
              ['403', 'The user is not allowed to access this resource.', 'Check permissions.'],
              ['404', 'The requested resource was not found.', 'Check endpoint spelling and IDs/slugs.'],
              ['500', 'The backend had an internal error.', 'Capture evidence and ask backend contributors to investigate.'],
              ['503', 'A service is unavailable.', 'Check whether a backend service or upstream dependency is down.'],
            ]}
          />
        </section>

        <Callout title="Common Mistakes" tone="yellow">
          <CheckList
            items={[
              'Assuming no data means the API failed. An empty response can be valid.',
              'Looking only at the UI and not checking the Network tab.',
              'Testing the wrong endpoint or method.',
              'Ignoring the response body when the status code already explains the problem.',
              'Treating a CORS error as a normal backend response.',
              'Hiding every problem behind a generic error message during debugging.',
            ]}
          />
        </Callout>

        <NextUp title="What Should I Do Next?">
          <p>After learning general API testing, use the project guide to understand the specific APIs and integration path for IoT.</p>
          <div className="space-y-2">
            <Link href="/guide/data-api-reference" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Continue to Data API Reference <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/integration-support" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Continue to Integration Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </NextUp>
      </div>
    </article>
  );
}
