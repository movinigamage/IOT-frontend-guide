import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Callout, CheckList, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';

export default function FrontendBackendPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Frontend-Backend Integration Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn how frontend code communicates with the IoT backend and how integration code should be structured before applying it in Mock-to-Live.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="The general pattern: component asks a service, the service calls the backend, a normalizer cleans the response."
          issue="Once, before starting any Mock-to-Live guide below. It is the concepts those guides apply."
          fix="This project already uses this pattern for auth, datasets, and series. It is not just theory."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Frontend-Backend Integration Means</h2>
          <p className="text-muted-foreground leading-relaxed">
            Frontend-backend integration means the user interface asks the backend for data, receives a response, prepares that response for the UI, and updates what the user sees.
          </p>
          <StepFlow steps={['Component', 'API Service Layer', 'Backend API', 'Response', 'UI update']} />
          <p className="text-muted-foreground leading-relaxed mt-4">
            In plain English: the component should ask for the data it needs, but it should not contain every backend URL, response-shape rule, and error-handling detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Frontend and Backend Responsibilities</h2>
          <GuideTable
            columns={['Side', 'Responsible for', 'Should avoid']}
            rows={[
              ['Frontend', 'Rendering UI, responding to user actions, requesting data, showing loading/empty/error states, and displaying frontend-ready data.', 'Direct database access, hidden mock fallbacks in live paths, and repeated backend request logic in many components.'],
              ['Backend', 'Validating requests, reading or processing data, applying business rules, and returning clear API responses.', 'Returning inconsistent response shapes without coordination or expecting UI components to understand database details.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">API Contracts</h2>
          <p className="text-muted-foreground leading-relaxed">
            An API contract is the agreement about how the frontend and backend communicate. It describes the method, endpoint, parameters, request body, response fields, and error behaviour.
          </p>
          <GuideTable
            columns={['Question', 'Why it matters']}
            rows={[
              ['Which endpoint should the frontend call?', 'Prevents using old or mock endpoints by accident.'],
              ['Which parameter identifies the data?', 'For IoT data, the backend dataset name is often the important identity.'],
              ['What does a successful response look like?', 'Helps the frontend prepare the exact fields the UI needs.'],
              ['What does an empty or failed response look like?', 'Helps the UI show the right state instead of breaking.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">API Service Layer</h2>
          <p className="text-muted-foreground leading-relaxed">
            An API service layer is a small set of frontend functions responsible for backend requests. It keeps API communication centralised so components do not each hard-code backend URLs and request details.
          </p>
          <StepFlow steps={['HomePage or Dashboard', 'Data API Service', 'IoT Backend API']} />
          <GuideTable
            columns={['Without a service layer', 'With a service layer']}
            rows={[
              ['Every component can invent its own request logic.', 'Requests are handled in a shared service area.'],
              ['Endpoint strings are repeated across files.', 'Endpoint paths are easier to update in one place.'],
              ['Errors may look different in every component.', 'Errors can be converted into consistent frontend states.'],
              ['Mock-to-live changes become scattered.', 'Mock-to-live changes happen mainly at the data boundary.'],
            ]}
          />
          <p className="text-muted-foreground leading-relaxed">
            The existing frontend already uses service-based API behaviour for some areas, such as authentication. A Data API service can apply the same idea to IoT features like datasets, series rows, filters, analytics, and alerts.
          </p>
          <CodeBlock>{`// Conceptual shape only.
// Keep the real implementation aligned with the IoT frontend.
async function listDatasets() {
  const response = await client.get('/datasets');
  return normalizeDatasetsResponse(response.data);
}`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Response Normalisation / Adapter Layer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Response normalisation means converting backend responses into one predictable frontend shape. This is useful when the backend has transitional responses or when the final contract wraps data differently from the current implementation.
          </p>
          <StepFlow steps={['Backend Response', 'Normalizer', 'Frontend-Friendly Data', 'Component']} />
          <GuideTable
            columns={['Normalizer job', 'Why it helps']}
            rows={[
              ['Read the supported backend response shapes.', 'Components do not need to understand raw arrays, V1 envelopes, or temporary backend differences.'],
              ['Keep required fields consistent.', 'Charts and controls can depend on stable fields such as created_at, entry_id, and stream keys.'],
              ['Return empty arrays for empty results.', 'The UI can show an empty state instead of crashing on null.'],
              ['Convert values where safe.', 'Numeric strings can become numbers before charts or calculations use them.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Request Lifecycle</h2>
          <StepFlow steps={['Loading', 'Request', 'Success / Empty / Error', 'UI Update']} />
          <p className="text-muted-foreground leading-relaxed">
            A good integration does not only handle the happy path. The user should see a clear state while data loads, when data arrives, when the response is empty, and when something fails.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Error Handling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Validation error">
              <p>The request is shaped incorrectly, such as missing streamNames for a filter request.</p>
            </GuideCard>
            <GuideCard title="Not found">
              <p>The endpoint exists, but the requested dataset or record does not exist.</p>
            </GuideCard>
            <GuideCard title="Empty result">
              <p>The request worked, but there is nothing to display yet.</p>
            </GuideCard>
            <GuideCard title="Backend unavailable">
              <p>The backend cannot be reached or an upstream dependency failed.</p>
            </GuideCard>
            <GuideCard title="Unsupported or pending feature">
              <p>The API contract may exist, but the backend feature is not live yet. Show unavailable instead of pretending it works.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How Components Use the Integration Layer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Datasets">
              <StepFlow steps={['HomePage', 'Data API Service', 'Datasets API', 'Dataset cards']} />
            </GuideCard>
            <GuideCard title="Series">
              <StepFlow steps={['Dashboard', 'Data API Service', 'Series API', 'Charts and statistics']} />
            </GuideCard>
          </div>
        </section>

        <Callout title="Reusable Integration Checklist" tone="yellow">
          <CheckList
            items={[
              'Identify the UI feature and the data it needs.',
              'Find the matching API contract before writing request code.',
              'Put backend request logic in the service layer, not throughout components.',
              'Normalize the response into one frontend-friendly shape.',
              'Pass normalized data into existing components where possible.',
              'Handle loading, success, empty, validation, not-found, backend-unavailable, and pending-feature states where relevant.',
              'Use Browser DevTools to prove the expected request is sent and the UI renders the returned data.',
            ]}
          />
        </Callout>

        <NextUp title="Next Step">
          <p>Now apply these concepts to the practical IoT mock-to-live migration guides.</p>
          <Link href="/guide/mock-to-live-integration" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to Mock-to-Live <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
