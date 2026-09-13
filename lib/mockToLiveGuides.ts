export type IntegrationCodeBlock = {
  file: string;
  status: 'exists' | 'new';
  /** Which numbered step(s) from the list directly above this block the code implements, e.g. "Step 2" or "Steps 1-3". Omit only when the block doesn't map to a specific listed step. */
  steps?: string;
  code: string;
  note?: string;
};

export type MockGuide = {
  slug: string;
  title: string;
  status: string;
  shortLabel: string;
  description: string;
  goal: string;
  currentFlow: string[];
  targetFlow: string[];
  current: string[];
  wanted: string[];
  files: string[];
  inspect: string[];
  apiName: string;
  method: string;
  endpoint: string;
  apiLocation: string;
  whyApi: string;
  requestExample: string;
  responseExample: string;
  responseFields: string[][];
  comparison: string[][];
  service: string[];
  integrationCode: IntegrationCodeBlock[];
  connect: string[];
  connectCode?: IntegrationCodeBlock[];
  ui: string[];
  uiCode?: IntegrationCodeBlock[];
  states: string[][];
  tests: string[];
  doneWhen: string[];
  commonProblems: string[][];
  nextTitle: string;
  nextHref: string;
  splitLabel?: string;
  canPrepare?: string[];
  completeWhenAvailable?: string[];
  quickState: string;
  quickIssue: string;
  quickFix: string;
  quickIssueTone?: 'good' | 'warning' | 'neutral';
  connectFix?: { file: string; before: string; after: string };
  serviceExisting?: string[];
  connectExisting?: string[];
  uiExisting?: string[];
};

export const mockToLiveGuides: MockGuide[] = [
  {
    slug: 'datasets',
    title: 'Datasets',
    status: 'Live',
    shortLabel: 'Live dataset discovery (already connected)',
    description: 'The Home page already loads real datasets from the backend. This guide documents how that connection works so you can extend or debug it with confidence.',
    quickState: 'HomePage already loads real datasets from the backend through useDatasets().',
    quickIssue: 'None. This is done and working.',
    quickFix: 'Nothing to fix. Add new fields inside buildDatasetCard() if you extend it.',
    quickIssueTone: 'good',
    goal: 'Understand and preserve the existing live dataset-loading path so future changes do not accidentally reintroduce hard-coded data.',
    currentFlow: [
      'HomePage.jsx calls the useDatasets() hook on mount',
      'useDatasets.js requests GET /api/datasets, then GET /api/datasets/:id for each dataset',
      'Each result is normalized inline by buildDatasetCard()',
      'HomePage renders the returned list through the existing DatasetCard component',
      'Selecting a card opens /dashboard/{dataset.name}, the real backend dataset slug',
    ],
    targetFlow: [
      'Dataset information comes from the IoT backend (GET /api/datasets)',
      'The useDatasets hook requests the list and each dataset detail',
      'buildDatasetCard() turns backend fields into the shape DatasetCard.jsx expects',
      'DatasetCard.jsx keeps displaying the information exactly as before',
      'The backend dataset name opens the correct dashboard',
    ],
    current: [
      'This is done. new-frontend/frontend/src/pages/HomePage.jsx no longer contains a hard-coded dataset array; it calls the useDatasets() hook.',
      'new-frontend/frontend/src/hooks/useDatasets.js calls GET /api/datasets, then GET /api/datasets/:id for each dataset returned, and builds the card-ready object with buildDatasetCard().',
      'The live backend (backend/src/controllers/datasetsController.js) returns GET /api/datasets as a plain JSON array, not the {"data":{"datasets":[...]}} V1 envelope shown in the Data API Reference. useDatasets.js matches this: it checks Array.isArray(datasetList) directly. If the backend later moves to the V1 envelope shape, useDatasets.js will need a small update to read response.data.datasets.',
      'new-frontend/frontend/src/components/DatasetCard.jsx still receives id, name, icon, description, streams, lastUpdated, and status as props, unchanged.',
      'DatasetCard.jsx builds navigation with /dashboard/{id}, and buildDatasetCard() already sets id: dataset.name, so navigation already uses the real backend dataset slug (for example /dashboard/thingspeak-live), not a frontend-only placeholder.',
    ],
    wanted: [
      'Keep HomePage.jsx loading datasets through useDatasets() rather than reintroducing a local array.',
      'If you add new dataset display fields, add them inside buildDatasetCard() so there is one place that shapes backend data for the UI.',
      'If the backend response shape changes (for example a move to the {"data":{"datasets":[...]}} V1 envelope), update the Array.isArray(datasetList) check in useDatasets.js accordingly; this is the one place that assumption lives.',
      'DatasetCard.jsx should keep its current visual role; there is no need to change it just because the data source changed.',
    ],
    files: [
      'new-frontend/frontend/src/pages/HomePage.jsx',
      'new-frontend/frontend/src/hooks/useDatasets.js',
      'new-frontend/frontend/src/components/DatasetCard.jsx',
    ],
    inspect: [
      'HomePage.jsx calls const { datasets, loading, error, refreshDatasets } = useDatasets() and renders loading, error, empty, and success states before mapping datasets into DatasetCard.',
      'useDatasets.js is the shared place for Dataset API requests and normalization. It has no separate dataApiClient.js file; the fetch calls and buildDatasetCard() normalizer both live directly in the hook.',
      'buildDatasetCard() is where backend fields become UI-ready fields: it sets id to dataset.name, gives thingspeak-live a friendly display name and icon, and falls back to a generated description for uploaded datasets.',
      'refreshDatasets (the hook reload function) is called by HomePage after a dataset upload completes, so the list stays current without a full page reload.',
      'The goal of reading this section: know exactly where dataset data is shaped, so new fields or bug fixes go in one predictable place.',
    ],
    apiName: 'Dataset List API',
    method: 'GET',
    endpoint: '/api/datasets',
    apiLocation: 'Open Data API Reference, then find the Datasets section: this one documents a real, live endpoint, not a placeholder example. The same request/response pair is also recorded in backend/docs/mvp/evidence/api-samples.json.',
    whyApi: 'This is the real API HomePage.jsx already calls through useDatasets.js; this section documents the live connection rather than one that still needs to be built.',
    requestExample: 'GET /api/datasets',
    responseExample: `[
  {
    "id": 1,
    "name": "thingspeak-live",
    "description": "Live IoT sensor dataset for dashboard monitoring and analysis.",
    "updatedAt": "2026-09-01T00:55:37.000Z"
  }
]`,
    responseFields: [
      ['(top-level array)', 'The backend currently returns a plain array of datasets, not a data.datasets envelope.', 'useDatasets.js reads this directly with Array.isArray(datasetList).'],
      ['dataset.id', 'Backend numeric identifier.', 'Used to call GET /api/datasets/:id for full detail.'],
      ['dataset.name', 'Stable backend dataset slug, for example thingspeak-live.', 'Used for /dashboard/{dataset.name} and as the card id.'],
      ['dataset.description / updatedAt / mappings', 'Detail fields returned by GET /api/datasets/:id.', 'Shaped by buildDatasetCard() into description, lastUpdated, and streams.'],
    ],
    comparison: [
      ['Dataset identity', 'Was: sensor1, sensor2, sensor3 (removed)', 'dataset.name', 'Already used for live dashboard navigation.'],
      ['Card title', 'Was: hard-coded name (removed)', 'dataset.name, with a friendly override for thingspeak-live', 'Already handled in buildDatasetCard().'],
      ['Card icon', 'Was: hard-coded emoji (removed)', 'No required API field', 'buildDatasetCard() still assigns a UI-only icon per dataset name.'],
      ['Card description', 'Was: hard-coded copy (removed)', 'dataset.description, with a generated fallback', 'Already handled in buildDatasetCard().'],
      ['Stream count', 'Was: hard-coded value (removed)', 'dataset.mappings.length', 'Already read from the detail response.'],
      ['Availability text', 'Was: hard-coded Available (removed)', 'Request state (loading/error/empty/success)', 'HomePage.jsx already renders distinct states instead of assuming data is always available.'],
    ],
    service: [
      'There is no separate dataApiClient.js for datasets; the request and normalization logic both live in useDatasets.js. If you extract a shared client later, keep the same Array.isArray(datasetList) response handling.',
      'loadDatasets() (inside the hook) already requests GET /api/datasets, fetches detail for each dataset, and calls buildDatasetCard() on the combined result.',
      'refreshDatasets is already exposed from the hook and already called after a successful dataset upload.',
      'Conceptual path (already implemented): useDatasets() -> GET /api/datasets -> GET /api/datasets/:id (per dataset) -> buildDatasetCard() -> HomePage state.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/hooks/useDatasets.js',
        status: 'exists',
        steps: 'Steps 1-4',
        code: `export function useDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDatasets = async () => {
    setLoading(true);
    setError(null);

    try {
      // Requests GET /api/datasets. Backend returns a plain array today.
      const response = await fetch(\`\${API_BASE_URL}/datasets\`);
      const datasetList = await response.json();

      if (!Array.isArray(datasetList)) {
        throw new Error('Dataset response must be an array');
      }

      // Fetches detail (description, updatedAt, mappings) per dataset.
      const detailedDatasets = await Promise.all(
        datasetList.map(async (dataset) => {
          const detailResponse = await fetch(\`\${API_BASE_URL}/datasets/\${dataset.id}\`);
          return detailResponse.ok ? detailResponse.json() : dataset;
        })
      );

      // Normalizes into card-ready fields via buildDatasetCard() below.
      setDatasets(detailedDatasets.map(buildDatasetCard));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  // refreshDatasets: exposed so the upload dialog can reload without a full page refresh.
  return { datasets, loading, error, refreshDatasets: loadDatasets };
}

function buildDatasetCard(dataset) {
  return {
    id: dataset.name, // already the real backend slug, e.g. "thingspeak-live"
    name: dataset.name === 'thingspeak-live' ? 'ThingSpeak Live' : dataset.name,
    description: dataset.description ?? \`\${dataset.totalRows ?? 0} imported sensor records.\`,
    streams: Array.isArray(dataset.mappings) ? dataset.mappings.length : 0,
    status: 'Available',
  };
}`,
        note: 'This one file covers every step above: there is no separate dataApiClient.js by design (step 1), it requests and fetches detail (step 2), exposes refreshDatasets (step 3), and is the full request-to-state path (step 4).',
      },
      {
        file: 'new-frontend/frontend/src/pages/HomePage.jsx',
        status: 'exists',
        code: `const { datasets, loading, error, refreshDatasets } = useDatasets();`,
        note: 'Not one of the numbered steps above -- this just shows how HomePage.jsx already consumes the hook. refreshDatasets is already called by the Upload Dataset dialog when a new dataset is created.',
      },
    ],
    connectExisting: [
      'HomePage.jsx already calls useDatasets() and stores the result in state via the hook.',
    ],
    connect: [
      'If you add a new page that also needs the dataset list, reuse useDatasets() rather than duplicating the fetch logic.',
      'Keep new dataset-related fields flowing through buildDatasetCard() so there is a single normalization point.',
    ],
    uiExisting: [
      'HomePage.jsx already uses the returned dataset list as the source for rendering through DatasetCard.',
      'The existing card UI and dashboard navigation are already preserved; no redesign was needed for this migration.',
    ],
    ui: [
      'Any new dataset metadata should be added to DatasetCard props and buildDatasetCard output together, so both stay in sync.',
    ],
    states: [
      ['Loading', 'Already implemented: HomePage.jsx shows a loading state while useDatasets() resolves.'],
      ['Success', 'Already implemented: the backend datasets render through the existing cards.'],
      ['Empty', 'Already implemented: HomePage.jsx shows "No datasets available" when the array is empty.'],
      ['Error', 'Already implemented: HomePage.jsx shows an "Unable to load datasets" message; it does not silently fall back to sensor1/sensor2/sensor3.'],
    ],
    tests: [
      'Start the IoT frontend, open the Home page, and open Browser DevTools.',
      'Go to the Network tab and refresh the page.',
      'Confirm GET /api/datasets is called and returns a plain array (not a data.datasets envelope).',
      'Confirm each dataset triggers a GET /api/datasets/:id request and the combined result renders as cards.',
      'Click a dataset card and confirm the dashboard route uses the backend dataset name, such as /dashboard/thingspeak-live.',
      'Upload a new dataset through the Upload Dataset dialog and confirm refreshDatasets() causes the new card to appear without a full page reload.',
      'Temporarily break the API (wrong port, backend stopped) and confirm the "Unable to load datasets" error state appears instead of a silent fallback.',
    ],
    doneWhen: [
      'The Home page displays datasets returned by GET /api/datasets. (Done.)',
      'DatasetCard.jsx is preserved as the display component. (Done.)',
      'Dashboard navigation uses backend dataset.name, not sensor1/sensor2/sensor3. (Done.)',
      'New contributors know where to add fields (buildDatasetCard()) rather than reintroducing a hard-coded list.',
    ],
    commonProblems: [
      ['Wrong dashboard route', 'Confirm buildDatasetCard() is still setting id: dataset.name rather than a numeric id.'],
      ['Blank cards after a backend change', 'Check whether the backend started wrapping the response in {"data":{"datasets":[...]}}; useDatasets.js currently expects a raw array.'],
      ['New dataset field not showing on the card', 'Add it inside buildDatasetCard(), not directly in HomePage.jsx.'],
      ['Card list does not refresh after upload', 'Confirm the upload dialog onClose handler still calls refreshDatasets().'],
    ],
    nextTitle: 'Series',
    nextHref: '/guide/mock-to-live-integration/series',
  },
  {
    slug: 'series',
    title: 'Series',
    status: 'Live / Bug Found',
    shortLabel: 'Wired to live data, but currently broken by an argument-order bug',
    description: 'The dashboard already targets the live Series API, but a recent hook refactor changed useSensorData\'s parameters and Dashboard.jsx was never updated to match. Every dashboard currently shows "Error loading data."',
    quickState: 'Dashboard.jsx already targets the real live Series endpoint, not mock data.',
    quickIssue: 'Broken: wrong argument order means every dashboard shows "Error loading data."',
    quickFix: 'In Dashboard.jsx, change useSensorData(false, url) to useSensorData(datasetName, false, "/api").',
    goal: 'Document the current (broken) call so a one-line fix can restore live series data, and explain exactly what changed and why.',
    currentFlow: [
      'DashboardPage.jsx reads id from the route and passes datasetName into Dashboard',
      'Dashboard.jsx calls useSensorData(false, `/api/datasets/${datasetName}/series`): a full endpoint string as the second argument',
      'useSensorData.js current signature is (datasetId, useMock, baseUrl), so it receives datasetId = false',
      'The hook if (!datasetId) guard fires immediately and sets an error before any request is sent',
      'Dashboard.jsx renders "Error loading data" for every dataset',
    ],
    targetFlow: [
      'Dashboard.jsx passes the real datasetName as the first argument: useSensorData(datasetName, false, \'/api\')',
      'useSensorData.js calls sensorService.getSensorData(datasetName, { useMock: false, baseUrl: \'/api\' })',
      'sensorService builds GET /api/datasets/{datasetName}/series itself and validates the response shape',
      'Rows and metadata.streams reach the existing charts and stats exactly as before',
    ],
    current: [
      'IMPORTANT: this is not a mock-data problem, it is a live bug: Dashboard.jsx already targets the real Series endpoint, but the current call is broken.',
      'Dashboard.jsx (new-frontend/frontend/src/components/Dashboard.jsx, last changed 8 Aug) calls: useSensorData(false, `/api/datasets/${encodeURIComponent(datasetName)}/series`).',
      'useSensorData.js was refactored on 31 Aug and 1 Sep to a new signature: useSensorData(datasetId, useMock = false, baseUrl = "/api"). Dashboard.jsx was never updated to match.',
      'Because of the mismatch, Dashboard.jsx first argument (false) is read as datasetId. The hook\'s own guard (if (!datasetId)) is true, so it immediately sets an error and returns without ever calling the backend.',
      'The visible symptom: every /dashboard/{name} route currently renders "Error loading data" (see the if (error) return <p>Error loading data</p> line in Dashboard.jsx), because loading and error are the only two states Dashboard.jsx currently checks.',
      'The backend endpoint itself is fine: GET /api/datasets/:name/series is real and working; this is purely a frontend call-site bug from two files falling out of sync during separate refactors.',
    ],
    wanted: [
      'Dashboard.jsx should call useSensorData(datasetName, false, \'/api\'), matching the hook\'s current (datasetId, useMock, baseUrl) signature, instead of passing a pre-built URL string as the second argument.',
      'sensorService.getSensorData already builds the endpoint itself ({baseUrl}/datasets/{datasetId}/series), so Dashboard.jsx should stop constructing the path manually.',
      'created_at and field1 through field8 should keep reaching useStreamNames, useTimeRange, useFilteredData, Chart, StreamStats, ScatterPlot, and MostCorrelatedPair; sensorService already returns rows and metadata.streams in a compatible shape, so this should need no further changes once the call is fixed.',
      'Whoever picks this up should also check Dashboard.jsx loading/error branches: right now it only renders "Loading dataset..." or "Error loading data" with no distinction between an empty dataset and a real failure, which useSensorData already exposes via isEmpty/isValid but Dashboard.jsx does not currently read.',
    ],
    files: [
      'new-frontend/frontend/src/components/Dashboard.jsx',
      'new-frontend/frontend/src/hooks/useSensorData.js',
      'new-frontend/frontend/src/services/sensorService.js',
      'new-frontend/frontend/src/hooks/useStreamNames.js',
      'new-frontend/frontend/src/hooks/useTimeRange.js',
      'new-frontend/frontend/src/hooks/useFilteredData.js',
    ],
    inspect: [
      'DashboardPage.jsx reads the dataset value from the route and passes it to Dashboard as datasetName; this part is already correct.',
      'Dashboard.jsx is responsible for coordinating dashboard data, stream selection, time controls, charts, stats, scatter plots, and analytics; all of that logic is intact and does not need to change.',
      'useSensorData.js no longer directly fetches or contains mock JSON; it delegates to sensorService.getSensorData(datasetId, { useMock, baseUrl }) and validates the response shape (rows array, metadata.streams array, required fields) before returning data.',
      'sensorService.js is the actual fetch layer now. Its live branch builds GET {baseUrl}/datasets/{datasetId}/series, requires a plain array response, and derives available streams by excluding dataset_id, created_at, and entry_id from row keys.',
      'The goal: fix the one call site so the dataset name reaches sensorService correctly, then confirm the rest of the already-built pipeline still works.',
    ],
    apiName: 'Dataset Series API',
    method: 'GET',
    endpoint: '/api/datasets/:name/series',
    apiLocation: 'Open Data API Reference, then find the Series section: this one documents a real, live endpoint. Use thingspeak-live for testing, but pass the route dataset name in real code.',
    whyApi: 'This is the real, working endpoint. The only problem is that Dashboard.jsx currently does not call it correctly: fixing the call, not building new integration, is the actual task here.',
    requestExample: 'GET /api/datasets/thingspeak-live/series',
    responseExample: `[
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
    responseFields: [
      ['(top-level array)', 'The backend returns a plain array of sensor rows for this endpoint.', 'sensorService.js requires Array.isArray(rows) and throws a clear error otherwise.'],
      ['created_at', 'Timestamp for the sensor row.', 'Used by chart time axis, useTimeRange, and time filtering.'],
      ['entry_id', 'ThingSpeak or persisted entry identifier.', 'Excluded from the derived stream list, used for row identity.'],
      ['field1...field8', 'Sensor stream values.', 'Used by stream selector, charts, stats, scatter plots, and local analytics.'],
      ['metadata.streams (derived, not sent by backend)', 'sensorService.js builds this by excluding dataset_id, created_at, and entry_id from row keys.', 'Used by useStreamNames and the stream selector.'],
    ],
    comparison: [
      ['Dataset name reaching the hook', 'Currently: false (bug); the real dataset name never reaches useSensorData', 'datasetName (route value)', 'Fix the call: useSensorData(datasetName, false, \'/api\')'],
      ['Endpoint construction', 'Currently: Dashboard.jsx builds the full path itself and passes it as useMock', 'sensorService.js already builds {baseUrl}/datasets/{datasetId}/series', 'Stop building the path in Dashboard.jsx; pass baseUrl instead.'],
      ['Rows', 'Was: sensorData1.json (removed)', 'Live rows via sensorService, validated by useSensorData', 'Already normalized once the call is fixed.'],
      ['Streams', 'Derived from live field keys (already implemented in sensorService)', 'Same', 'No change needed: already excludes dataset_id/created_at/entry_id.'],
      ['Error/empty distinction', 'Dashboard.jsx only checks loading/error, not isEmpty/isValid', 'useSensorData already returns isEmpty and isValid', 'Read isEmpty/isValid in Dashboard.jsx for clearer states.'],
    ],
    serviceExisting: [
      'sensorService.js and useSensorData.js already implement fetching, validation, and stream derivation. No new service code is needed.',
    ],
    service: [
      'Replace useSensorData(false, `/api/datasets/${datasetName}/series`) with useSensorData(datasetName, false, \'/api\') in Dashboard.jsx.',
      'Optional follow-up: have Dashboard.jsx read isEmpty and isValid from the hook (it currently only destructures data, loading, error) so empty datasets and real failures can show different messages.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/services/sensorService.js',
        status: 'exists',
        code: `export const getSensorData = async (datasetId, { useMock = false, baseUrl = '/api' } = {}) => {
  if (useMock) {
    // ...mock switch, unrelated to the live path...
  }

  if (!datasetId) {
    throw new Error('Dataset ID is required');
  }

  // Builds the real endpoint from the dataset name and fetches it.
  const response = await fetch(\`\${baseUrl}/datasets/\${encodeURIComponent(datasetId)}/series\`);
  if (!response.ok) {
    throw new Error(\`Failed to fetch data: \${response.status} \${response.statusText}\`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows)) {
    throw new Error('Invalid backend response: expected an array of sensor readings');
  }

  // Derives the stream list from row keys, excluding row-identity fields.
  const excludedFields = new Set(['dataset_id', 'created_at', 'entry_id']);
  const streamIds = [...new Set(
    rows.flatMap((row) => Object.keys(row).filter((key) => !excludedFields.has(key)))
  )];

  return {
    dataset: datasetId,
    rowCount: rows.length,
    metadata: { streams: streamIds.map((id) => ({ id, name: id })) },
    rows,
  };
};`,
        note: 'This already exists and already works. No new service code is needed for Series -- only the call site below is broken.',
      },
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Step 2',
        code: `// Before -- datasetId receives false, useMock receives a URL string. No request is ever sent.
const { data, loading, error } = useSensorData(
  false,
  \`/api/datasets/\${encodeURIComponent(datasetName)}/series\`
);

// After -- pass the real dataset name first, mock explicitly off, base path third.
const { data, loading, error, isEmpty, isValid } = useSensorData(datasetName, false, '/api');`,
        note: 'This is the one-line fix (step 2 above). isEmpty and isValid are already returned by the hook -- reading them is step 3, the optional follow-up (see the Connect the Result to the UI section below).',
      },
    ],
    connectFix: {
      file: 'new-frontend/frontend/src/components/Dashboard.jsx',
      before: "useSensorData(false, `/api/datasets/${encodeURIComponent(datasetName)}/series`)",
      after: "useSensorData(datasetName, false, '/api')",
    },
    connect: [
      'Change the useSensorData call in Dashboard.jsx to pass datasetName as the first argument.',
      'Remove the manually-built endpoint string; pass \'/api\' as baseUrl and let sensorService construct the path.',
      'Re-test every dashboard route after the fix, since this bug currently affects all datasets, not just one.',
      'Once fixed, double check useStreamNames still receives the same row shape it expected before this refactor.',
    ],
    uiExisting: [
      'Dashboard.jsx already destructures { data, loading, error } from useSensorData(); once the step 9 fix lands, data stops being undefined and becomes the real rows array.',
      'Dashboard.jsx already passes data (rows) and the derived stream list into Chart, so once real rows exist, the line chart already draws them, nothing to wire.',
      'Dashboard.jsx already passes the same rows into StreamStats, so summary numbers (min/max/average per stream) already calculate from real data once it arrives.',
      'Dashboard.jsx already passes rows and selectedStreams into ScatterPlot and MostCorrelatedPair, so the correlation view already works once there is enough real data with variance.',
      'The stream selector and time-range controls already read from this same data source, so switching streams or narrowing the time window already works against real rows, no separate connection needed.',
    ],
    ui: [
      'Consider distinguishing the current single "Error loading data" message into loading / empty / real-error states once isEmpty and isValid are read from the hook.',
    ],
    uiCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'exists',
        code: `// Already wired -- Chart, StreamStats, ScatterPlot, and MostCorrelatedPair
// already receive rows and selectedStreams like this, and already draw them
// correctly as soon as data stops being undefined.
<Chart data={data} selectedStreams={selectedStreams} />
<StreamStats data={data} stream={selectedStreams[0]} />
<ScatterPlot data={data} streams={selectedStreams} />
<MostCorrelatedPair data={data} selectedStreams={selectedStreams} />`,
        note: 'Nothing here needs to change once the fix above lands -- these four components already accept exactly this shape.',
      },
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Step 6',
        code: `// Read isEmpty / isValid (already returned by the hook) instead of
// collapsing every failure into one "Error loading data" message.
if (loading) return <p>Loading dataset...</p>;
if (error) return <p>Error loading data</p>;
if (isEmpty) return <p>No data yet for this dataset.</p>;
if (!isValid) return <p>Unexpected data shape from the backend.</p>;`,
        note: 'isEmpty and isValid already exist on the hook -- Dashboard.jsx just does not read them yet.',
      },
    ],
    states: [
      ['Loading', 'Already implemented: Dashboard.jsx shows "Loading dataset..." while the hook resolves.'],
      ['Currently broken', 'Every dataset shows "Error loading data" because of the argument-order bug described above; this is the state to fix first.'],
      ['Success (after fix)', 'Charts, stats, stream selector, and local analytics should render from live backend rows once the call site is corrected.'],
      ['Empty result (after fix)', 'useSensorData already exposes isEmpty; Dashboard.jsx would need to read it to show a distinct "no rows yet" message.'],
      ['Backend unavailable', 'sensorService already throws a clear error in this case; it will surface through the existing error path once the call is fixed.'],
    ],
    tests: [
      'Open any /dashboard/{name} route today and confirm you see "Error loading data"; this confirms the bug is currently live.',
      'Open Dashboard.jsx and confirm the useSensorData call passes false as the first argument.',
      'After applying the fix (datasetName as the first argument, \'/api\' as the third), reopen the dashboard and confirm "Loading dataset..." is briefly shown, then real data appears.',
      'Open DevTools Network tab and confirm GET /api/datasets/{name}/series is actually requested after the fix; it currently is not requested at all.',
      'Confirm the stream selector, charts, and stats populate from the live response once data loads.',
      'Test a dataset with no rows and confirm the behaviour (currently indistinguishable from an error, worth improving per the wanted section above).',
    ],
    doneWhen: [
      'Dashboard.jsx passes the real dataset name into useSensorData as its first argument.',
      'Opening a dashboard route triggers an actual GET /api/datasets/:name/series request (confirmed in the Network tab).',
      'Charts, StreamStats, ScatterPlot, MostCorrelatedPair, stream controls, and time controls render live data, not "Error loading data".',
      '(Stretch) Dashboard.jsx distinguishes empty datasets from real errors using isEmpty/isValid.',
    ],
    commonProblems: [
      ['Dashboard shows "Error loading data" for every dataset', 'This is the known current bug: check the argument order in the useSensorData(...) call in Dashboard.jsx.'],
      ['Fix applied but still no data', 'Confirm baseUrl is passed as \'/api\' (or matches VITE_API_BASE_URL) and not left as the old manually-built URL string.'],
      ['Streams missing after the fix', 'Check sensorService excludedFields set: dataset_id, created_at, and entry_id are intentionally excluded from the stream list.'],
      ['Old mock behaviour reappears', 'Confirm useMock is passed as false, not accidentally left true.'],
    ],
    nextTitle: 'Filters',
    nextHref: '/guide/mock-to-live-integration/filters',
  },
  {
    slug: 'filters',
    title: 'Filters',
    status: 'Ready / Transitional',
    shortLabel: 'Local stream selection -> backend-supported filtering',
    description: 'Connect selected streams to the Filter API while keeping useful frontend time-range and display behaviour.',
    quickState: 'Filtering happens locally in the browser, after the data has already loaded.',
    quickIssue: 'The backend filter endpoint exists, but nothing in the frontend calls it yet.',
    quickFix: 'Add filterSeries(datasetName, streamNames) and call it when the user applies a filter.',
    quickIssueTone: 'neutral',
    goal: 'Connect selected stream filtering to the backend without removing useful browser-side dashboard controls.',
    currentFlow: [
      'Rows are already loaded in the browser',
      'Selected streams live in dashboard state (selectedStreams)',
      'Browser-side filtering prepares display rows (useFilteredData)',
      'Existing charts and stats render the filtered result',
    ],
    targetFlow: [
      'The user chooses stream fields in the UI',
      'Selected fields become the request body (streamNames)',
      'The IoT backend returns selected stream rows (POST filter API)',
      'Local time and interval controls still shape the display',
      'Existing charts and stats render the result',
    ],
    current: [
      'new-frontend/frontend/src/hooks/useFilteredData.js filters rows in the browser after data is loaded.',
      'Dashboard.jsx stores selectedStreams, selected time values, relative time mode, and selected interval.',
      'StreamSelector, TimeSelector, TimeRangePanel, and IntervalSelector are useful controls to preserve.',
      'The backend filter endpoint exists and validates streamNames.',
    ],
    wanted: [
      'Selected streams can be sent to POST /api/datasets/:name/series/filter.',
      'Backend filtering should return rows containing the selected stream fields.',
      'Local time window and interval sampling can remain frontend display behaviour unless the backend contract expands.',
      'Do not automatically move every kind of filtering to the backend.',
    ],
    files: [
      'new-frontend/frontend/src/components/Dashboard.jsx',
      'new-frontend/frontend/src/hooks/useFilteredData.js',
      'new-frontend/frontend/src/services/dataApiClient.js',
      'new-frontend/frontend/src/components/StreamSelector.jsx',
      'new-frontend/frontend/src/components/TimeRangePanel.jsx',
      'new-frontend/frontend/src/components/IntervalSelector.jsx',
    ],
    inspect: [
      'Dashboard.jsx owns the selectedStreams state and the dashboard controls that change it.',
      'useFilteredData.js is useful browser-side display logic. It filters by created_at, entry_id, and interval sampling after rows are available.',
      'StreamSelector controls which stream fields the user wants to see. Those field names can become streamNames for the backend request.',
      'TimeRangePanel and IntervalSelector are display controls and should not be removed just because backend stream filtering is introduced.',
      'The goal: send selected stream names to the backend when useful, then preserve local time and interval behaviour for the displayed rows.',
    ],
    apiName: 'Series Filter API',
    method: 'POST',
    endpoint: '/api/datasets/:name/series/filter',
    apiLocation: 'Open Data API Reference, then find the Filters section: the route is live, though the response shape may still be transitional.',
    whyApi: 'This API matches the selected-stream part of the UI. It does not replace every local time or display control.',
    requestExample: `POST /api/datasets/thingspeak-live/series/filter
Content-Type: application/json

{
  "streamNames": ["field1", "field2", "field6"]
}`,
    responseExample: `{
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
    responseFields: [
      ['streamNames request body', 'The selected backend field names.', 'Must come from selectedStreams.'],
      ['data.filters.streamNames', 'Echo of applied stream filters.', 'Useful for confirming what backend returned.'],
      ['data.series', 'Rows with selected stream fields.', 'Input for charts, stats, and analytics.'],
      ['400 error', 'streamNames must be a non-empty array.', 'Show readable validation when no streams are selected.'],
    ],
    comparison: [
      ['Selected streams', 'Dashboard selectedStreams state', 'streamNames', 'Send field names such as field1, not display labels.'],
      ['Time range', 'useFilteredData created_at checks', 'Not part of current filter API body', 'Keep local unless backend adds time filters.'],
      ['Interval sampling', 'useFilteredData interval logic', 'Not part of current filter API body', 'Keep local display behaviour.'],
      ['Rows', 'Full loaded row set', 'Filtered rows', 'Normalize and feed existing visual components.'],
      ['Validation', 'Frontend can prevent empty selection', '400 error from backend', 'Handle both clearly.'],
    ],
    service: [
      'Add filterSeries(datasetName, streamNames) to dataApiClient.js.',
      'Validate streamNames before sending the request. Do not send an empty array as a normal request.',
      'Add normalizeFilterResponse(response). It should read data.series, data.rows, or transitional raw arrays.',
      'Preserve created_at, entry_id, and selected field keys so existing visual components still work.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/services/dataApiClient.js',
        status: 'new',
        steps: 'Steps 1-4',
        code: `// This file doesn't exist yet -- create it.

export async function filterSeries(datasetName, streamNames) {
  // Validate before sending -- never POST an empty selection.
  if (!Array.isArray(streamNames) || streamNames.length === 0) {
    throw new Error('Select at least one stream before filtering.');
  }

  const response = await fetch(
    \`/api/datasets/\${encodeURIComponent(datasetName)}/series/filter\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ streamNames }),
    }
  );

  if (!response.ok) {
    throw new Error(\`Filter request failed: \${response.status}\`);
  }

  const body = await response.json();

  // Normalize -- backend currently returns a plain array, not { data: { series } } yet.
  // created_at, entry_id, and the selected field keys are preserved automatically,
  // since the backend only ever returns those keys.
  return Array.isArray(body) ? body : body?.data?.series ?? [];
}`,
        note: 'Call this from Dashboard.jsx as filterSeries(datasetName, selectedStreams) when the user applies backend filtering (see Connect the API below).',
      },
    ],
    connect: [
      'Use selectedStreams as the source for streamNames.',
      'Call filterSeries(datasetName, selectedStreams) when the user applies backend stream filtering.',
      'After backend rows return, still pass them through the local time/interval display filtering if needed.',
      'Keep local filtering available for already-loaded rows when it gives a better user experience.',
    ],
    connectCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Steps 1-3',
        code: `async function handleApplyFilter() {
  // selectedStreams already holds the ticked field names -- send them as-is.
  const filteredRows = await filterSeries(datasetName, selectedStreams);

  // Still run the existing local time/interval display filtering on the result.
  const displayRows = applyLocalFiltering(filteredRows, selectedTimeStart, selectedTimeEnd, selectedInterval);

  setData(displayRows);
}`,
        note: 'Step 4 is not a line of code -- it just means keep useFilteredData available for already-loaded rows, do not delete it once backend filtering exists.',
      },
    ],
    uiExisting: [
      'StreamSelector already exists and already controls selectedStreams; keep using it as the source for the streamNames sent to the backend.',
      'TimeSelector, TimeRangePanel, and IntervalSelector already exist as local display controls and can stay exactly as they are.',
    ],
    ui: [
      'Wire Charts, StreamStats, MostCorrelatedPair, and ScatterPlot to receive the filtered rows that come back from the backend, instead of only the full unfiltered row set.',
      'Show the currently selected streams clearly in the UI so the user can see what is actually being requested from the backend.',
    ],
    uiCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Step 3',
        code: `<Chart data={displayRows} selectedStreams={selectedStreams} />
<StreamStats data={displayRows} stream={selectedStreams[0]} />
<MostCorrelatedPair data={displayRows} selectedStreams={selectedStreams} />
<ScatterPlot data={displayRows} streams={selectedStreams} />`,
        note: 'These four components already accept a data prop shaped exactly like this. Once handleApplyFilter (above) sets displayRows, nothing here needs to change. Step 4 (showing the selected streams clearly) is a small UI touch, not shown here.',
      },
    ],
    states: [
      ['No stream selected', 'Show a message asking the user to choose at least one stream.'],
      ['Loading', 'Show that filtered data is loading after the user applies the filter.'],
      ['Success', 'Render selected stream fields in charts and stats.'],
      ['400 validation error', 'Show streamNames must be a non-empty array in beginner-friendly wording.'],
      ['404 missing dataset', 'Show that the selected dataset was not found or has no rows.'],
      ['Backend unavailable', 'Show an error state and avoid hidden mock fallback.'],
    ],
    tests: [
      'Open /dashboard/thingspeak-live and select field1, field2, and field6.',
      'Open DevTools and the Network tab.',
      'Trigger the backend filter action.',
      'Confirm POST /api/datasets/thingspeak-live/series/filter is called.',
      'Open the request payload and confirm streamNames contains field1, field2, and field6.',
      'Open the response and confirm rows contain selected fields plus created_at and entry_id.',
      'Confirm charts and stats render the filtered fields.',
      'Submit with no streams selected and confirm validation is visible.',
      'Confirm time and interval controls still affect the displayed rows where they are meant to remain local.',
    ],
    doneWhen: [
      'The live filter path calls POST /api/datasets/:name/series/filter.',
      'Legacy /api/filter-streams is not used for the live path.',
      'Selected streams become streamNames in the request body.',
      'Filtered rows feed existing charts, StreamStats, MostCorrelatedPair, and ScatterPlot.',
      'Local time and interval controls still work where they are intentionally preserved.',
    ],
    commonProblems: [
      ['400 validation error', 'Check whether streamNames is missing, empty, or not an array.'],
      ['Wrong fields returned', 'Check whether selectedStreams contains display labels instead of field names.'],
      ['Time controls stop working', 'Check whether local useFilteredData was removed too aggressively.'],
      ['Mock data hides errors', 'Confirm the live filter path does not fall back to local JSON after a failed request.'],
    ],
    nextTitle: 'Analytics',
    nextHref: '/guide/mock-to-live-integration/analytics',
  },
  {
    slug: 'analytics',
    title: 'Analytics',
    status: 'Prepare Now / Pending Backend',
    shortLabel: 'Local analytics -> backend analytics preparation',
    description: 'Understand what analytics already run in the frontend and prepare safely for backend analytics when it becomes available.',
    quickState: 'Local correlation already works. A frontend service (analysisService.js) already exists too.',
    quickIssue: 'Nothing calls analysisService.js yet, and the backend still returns a placeholder.',
    quickFix: 'Wire analysisService.js into the dashboard behind an unavailable check. Do not show placeholder output as real.',
    quickIssueTone: 'neutral',
    goal: 'Preserve working local analytics while preparing a safe future integration point for the backend Analytics API.',
    splitLabel: 'Can Prepare Now / Complete When Backend Is Available',
    canPrepare: [
      'Keep local correlation, variance checks, trendline logic, and most-correlated-pair display working on normalized live series rows.',
      'Create an analyse() service boundary only if it treats placeholder backend output as unavailable.',
      'Prepare a normalizer for the future V1 analytics payload.',
    ],
    completeWhenAvailable: [
      'Complete live backend analytics only after BDAI-10 produces real analytics output.',
      'Replace or supplement local analytics only after the backend response is verified with real values.',
    ],
    currentFlow: [
      'Dashboard rows are available in the frontend',
      'Local utilities calculate analytics',
      'Existing analytics UI renders correlation and plots',
    ],
    targetFlow: [
      'Live Series rows keep feeding local analytics',
      'A future backend request can be prepared (POST /api/analyse)',
      'Backend analytics are normalized only when real output exists',
      'Analysis cards show backend results after backend completion',
    ],
    current: [
      'The frontend already calculates correlation locally.',
      'MostCorrelatedPair uses findMostCorrelatedPair and checks variance before rendering a scatter plot.',
      'ScatterPlot and trendline behaviour depend on local utilities.',
      'A frontend Analytics service already exists: new-frontend/frontend/src/services/analysisService.js exports a working runAnalysis({ datasetId, selectedStreams }) function, with request validation and a THINGSPEAK_FIELD_MAP that translates stream field names (field1, field2...) into backend metric names (eco2, temperature...). It is built and committed, but nothing currently imports or calls it.',
      'POST /api/analyse exists, but the backend service currently returns placeholder output (backend/src/services/analyseService.js: message: "Analysis completed (placeholder)").',
      'Analytics completion depends on BDAI-10.',
    ],
    wanted: [
      'Local analytics should keep working for live Series rows.',
      'The UI should not present /api/analyse placeholder output as successful backend analytics.',
      'The frontend can prepare a future analytics service and normalizer.',
      'Backend analytics should be connected only after real backend implementation is available.',
    ],
    files: [
      'new-frontend/frontend/src/utils/correlationUtils.js',
      'new-frontend/frontend/src/utils/varianceUtils.js',
      'new-frontend/frontend/src/utils/trendlineUtils.js',
      'new-frontend/frontend/src/components/MostCorrelatedPair.jsx',
      'new-frontend/frontend/src/components/ScatterPlot.jsx',
      'new-frontend/frontend/src/components/Dashboard.jsx',
      'new-frontend/frontend/src/services/analysisService.js',
    ],
    inspect: [
      'correlationUtils.js is responsible for local correlation and most-correlated-pair calculations.',
      'MostCorrelatedPair.jsx protects the UI from misleading plots by checking variance before rendering ScatterPlot.',
      'ScatterPlot.jsx displays relationships between selected stream values and should continue receiving frontend-ready rows.',
      'Dashboard.jsx passes filteredData and selected streams into the analytics components.',
      'analysisService.js is already the future boundary this guide used to say to prepare; read it before writing a new one.',
      'The goal: wire the existing analysisService.js into the dashboard behind an unavailable/placeholder check, while keeping local analytics working.',
    ],
    apiName: 'Analytics API',
    method: 'POST',
    endpoint: '/api/analyse',
    apiLocation: 'Open Data API Reference and Frontend-Ready Examples, then find the Analytics section: this one is a contract-ready example, not a live backend endpoint yet.',
    whyApi: 'This API is intended for backend-generated analysis cards later. It should not replace working local analytics while it returns placeholder output.',
    requestExample: `POST /api/analyse
Content-Type: application/json

{
  "datasetName": "thingspeak-live",
  "streamNames": ["field1", "field2", "field6"],
  "analysisType": "summary",
  "from": "2026-08-13T00:55:37.000Z",
  "to": "2026-08-13T00:57:37.000Z"
}`,
    responseExample: `{
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
    responseFields: [
      ['datasetName request field', 'Dataset slug being analyzed.', 'Should come from the dashboard route.'],
      ['streamNames request field', 'Selected stream fields.', 'Should come from selectedStreams.'],
      ['analysisType', 'Requested analysis mode.', 'Use only modes the backend supports.'],
      ['data.analysis', 'Future real analytics result.', 'Render analysis cards only when backend output is real.'],
    ],
    comparison: [
      ['Correlation', 'calculateCorrelation in frontend', 'Future backend analysis/correlation payload', 'Preserve local version until backend is real.'],
      ['Most correlated pair', 'findMostCorrelatedPair plus ScatterPlot', 'Future backend insight', 'Do not remove local component yet.'],
      ['Variance guard', 'hasVariance prevents misleading scatter plots', 'Backend should provide equivalent safety later', 'Keep the frontend guard.'],
      ['Backend response', 'Not needed for local analytics', 'Currently placeholder', 'Show unavailable, not success.'],
    ],
    serviceExisting: [
      'analysisService.js already exports runAnalysis({ datasetId, selectedStreams }), including its own validation and field-name mapping. Do not write a new analyse(payload) function from scratch.',
      'runAnalysis() currently builds a payload with model.metric, model.detector, and correlation.streams, then POSTs it to /api/analyse and returns the parsed JSON, throwing on a non-OK response.',
    ],
    service: [
      'Still needed: a normalizer for the real V1 data.analysis shape once BDAI-10 replaces the placeholder response; runAnalysis() does not normalize the response yet, it returns it as-is.',
      'Detect placeholder output (message: "Analysis completed (placeholder)") and show an unavailable state, not completed analytics.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/services/analysisService.js',
        status: 'exists',
        code: `export const runAnalysis = async ({ datasetId, selectedStreams }) => {
  if (!datasetId) {
    throw new Error('A dataset must be selected before running analysis.');
  }
  if (!Array.isArray(selectedStreams) || selectedStreams.length < 2) {
    throw new Error('Select at least two streams before running analysis.');
  }

  // Translates field1/field2 into backend metric names (eco2, temperature, ...).
  const canonicalStreams = selectedStreams.map((stream) => getCanonicalMetric(datasetId, stream));

  const payload = {
    dataset: datasetId,
    model: { metric: canonicalStreams[0], detector: 'isolationforest', parameters: {} },
    correlation: { streams: canonicalStreams.slice(0, 2), window_size: 20, step_size: 10, method: 'pearson' },
  };

  // Already POSTs to the real endpoint -- nothing to build here.
  const response = await fetch('/api/analyse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.error || result?.message || \`Analysis request failed with HTTP \${response.status}.\`);
  }
  return result; // not normalized yet -- returned exactly as the backend sends it
};`,
        note: 'This already exists, exactly like this, and already works end to end -- it is just never called from the dashboard, and the backend still returns a placeholder result. Do not write a new analyse() function from scratch.',
      },
    ],
    connectExisting: [
      'Local analytics already runs on normalized live rows from the Series guide; MostCorrelatedPair, ScatterPlot, and the correlation cards already render from that data. Nothing here needs to be replaced or rebuilt yet.',
    ],
    connect: [
      'Once BDAI-10 replaces the placeholder response, call the existing runAnalysis() from analysisService.js from the dashboard or analysis panel, using the selected dataset and streams; it is not currently imported anywhere.',
      'Add the unavailable-state check before wiring runAnalysis() in, so a placeholder response is never shown as a completed analysis.',
      'Make backend analytics additive: keep local analytics rendering as the fallback while the team verifies real backend results.',
    ],
    connectCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Steps 2-3',
        code: `async function handleRunAnalysis() {
  // Calls the existing runAnalysis() -- not imported anywhere today.
  const result = await runAnalysis({ datasetId: datasetName, selectedStreams });

  // Never show a placeholder response as a completed analysis.
  const isPlaceholder = result?.message?.includes('placeholder');
  setAnalysisResult(isPlaceholder ? null : result);
  setAnalyticsUnavailable(isPlaceholder);
}`,
        note: 'Not wired in yet. runAnalysis() already exists and works -- this is where it would be called from once BDAI-10 is real. Step 4 (keeping local analytics as a fallback) is the general rule this function follows, not a separate line of code.',
      },
    ],
    uiExisting: [
      'Local analytics cards and plots already render from filteredData; this keeps working with no changes.',
      'No-variance messaging already shows when a selected pair has no meaningful correlation, which already prevents misleading scatter plots. This also keeps working with no changes.',
    ],
    ui: [
      'Once backend analytics is wired in, add a panel that shows unavailable while /api/analyse still returns its placeholder response, so it is never shown as if it were real.',
    ],
    uiCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Step 3',
        code: `{analyticsUnavailable && (
  <p className="analysis-unavailable">
    Backend analytics is not available yet -- showing local analysis only.
  </p>
)}`,
        note: 'Local analytics cards below this keep rendering from filteredData either way -- this panel is additive, not a replacement.',
      },
    ],
    states: [
      ['Local analytics success', 'Show existing calculated values from frontend utilities.'],
      ['No variance', 'Show that no meaningful scatter plot is available for the selected pair.'],
      ['Backend placeholder', 'Show backend analytics are not available yet.'],
      ['Backend unavailable', 'Keep local analytics usable if series rows are available.'],
      ['Empty data', 'Show that analytics need rows and selected streams.'],
    ],
    tests: [
      'Load live Series rows first.',
      'Select at least two streams with values.',
      'Confirm local correlation and scatter plots still render.',
      'Select streams with no variance and confirm the no-meaningful-scatter message appears.',
      'Call POST /api/analyse only as a readiness check.',
      'If the response is placeholder, confirm the UI does not display it as real analytics.',
    ],
    doneWhen: [
      'Local analytics still work with normalized live Series rows.',
      'The frontend has a safe future place for /api/analyse integration.',
      'The UI does not claim backend analytics is live while BDAI-10 is pending.',
      'Placeholder analytics output is shown as unavailable or hidden from user-facing success states.',
    ],
    commonProblems: [
      ['Working analytics disappear', 'Check whether local utilities were removed before backend analytics was complete.'],
      ['Duplicate analytics service written from scratch', 'Check for new-frontend/frontend/src/services/analysisService.js first; it already exists.'],
      ['Placeholder shown as success', 'Check for the "Analysis completed (placeholder)" message and add unavailable-state handling before wiring runAnalysis() in.'],
      ['Correlation is NaN or misleading', 'Check variance and numeric conversion for selected streams.'],
      ['Wrong request body', 'analysisService.js already maps stream names via THINGSPEAK_FIELD_MAP; reuse it instead of hard-coding field names.'],
    ],
    nextTitle: 'Latest Alerts',
    nextHref: '/guide/mock-to-live-integration/latest-alerts',
  },
  {
    slug: 'latest-alerts',
    title: 'Latest Alerts',
    status: 'Prepare Now / Pending Backend',
    shortLabel: 'Frontend-ready examples -> future live alerts',
    description: 'Prepare a latest-alert interface using the agreed contract without pretending unfinished backend functionality is live.',
    quickState: 'The alert display component (ActiveAlerts.jsx) is already fully built.',
    quickIssue: 'It is not mounted on any page yet, and there is no live backend route yet either.',
    quickFix: 'Mount ActiveAlerts.jsx now with an honest "not analysed yet" state. Connect live data after BDAI-11.',
    quickIssueTone: 'neutral',
    goal: 'Prepare the frontend to display recent alerts when backend alert persistence and the Latest Alerts route become available.',
    splitLabel: 'Can Build/Prepare Now / Connect Live When Backend Is Available',
    canPrepare: [
      'Plan a latest-alert panel or dashboard summary using existing UI patterns.',
      'Create a service function only behind unavailable handling.',
      'Prepare a normalizer for data.alerts.',
    ],
    completeWhenAvailable: [
      'Connect the live request only after BDAI-11 adds alert persistence and GET /api/alerts/latest.',
      'Do not show contract-only examples as live alert data.',
    ],
    currentFlow: [
      'There is no confirmed latest-alert UI yet',
      'There is no active live backend route yet',
      'Frontend-ready examples describe the future response',
    ],
    targetFlow: [
      'Latest alerts come from the IoT backend (GET /api/alerts/latest)',
      'Alert responses become a stable list (normalizeAlertsResponse())',
      'A latest-alert panel displays the result',
      'The dashboard summary stays usable if alerts are unavailable',
    ],
    current: [
      'The alert display component already exists: new-frontend/frontend/src/components/ActiveAlerts.jsx accepts { alerts, loading, error, hasAnalysed } and already renders distinct not-yet-analysed, loading, error, empty, and success states, including severity, timestamp, alert type, source, and score for each alert card.',
      'ActiveAlerts.jsx is not imported or rendered by any page yet, so it is not currently visible anywhere in the app.',
      'No active backend route for GET /api/alerts/latest is currently confirmed.',
      'Latest Alerts (the live backend feature) depends on BDAI-11; the frontend display piece does not.',
    ],
    wanted: [
      'A future latest-alert UI should read alerts from the API, not from fake permanent demo data.',
      'The UI should show unavailable until the backend route exists.',
      'When the backend is ready, requests should include the current datasetName and optional limit.',
    ],
    files: [
      'new-frontend/frontend/src/components/Dashboard.jsx',
      'new-frontend/frontend/src/components/ActiveAlerts.jsx',
      'new-frontend/frontend/src/services/dataApiClient.js',
    ],
    inspect: [
      'Dashboard.jsx is the likely place to mount ActiveAlerts.jsx once the live dashboard data path is stable; it is not mounted there yet.',
      'ActiveAlerts.jsx already exists and already uses card, badge, and callout-style patterns consistent with the rest of the dashboard; there is no need to design a new panel from scratch.',
      'The backend route is pending, so ActiveAlerts.jsx should be mounted with hasAnalysed/loading/error props reflecting that unavailable state until BDAI-11 lands.',
      'The goal: mount the existing ActiveAlerts.jsx behind an honest unavailable state, without presenting contract-only examples as live data.',
    ],
    apiName: 'Latest Alerts API',
    method: 'GET',
    endpoint: '/api/alerts/latest',
    apiLocation: 'Open Data API Reference and Frontend-Ready Examples, then find the Latest Alerts section: this one is a contract-ready example, not a live backend endpoint yet.',
    whyApi: 'This API is intended to return the newest generated alerts for a dataset so the frontend can show a quick alert summary.',
    requestExample: 'GET /api/alerts/latest?datasetName=thingspeak-live&limit=2',
    responseExample: `{
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
    responseFields: [
      ['id', 'Unique alert identifier.', 'Use as list key.'],
      ['datasetName', 'Dataset the alert belongs to.', 'Match current dashboard dataset.'],
      ['entry_id', 'Sensor row that produced the alert.', 'Useful for debugging and linking to row context.'],
      ['streamName', 'Field that triggered the alert.', 'Display beside severity/message.'],
      ['severity', 'Alert level such as warning or info.', 'Style the alert label.'],
      ['status', 'Current alert state such as active.', 'Show whether it is active/resolved.'],
      ['message', 'Human-readable alert text.', 'Primary UI message.'],
      ['value and threshold', 'Measured value and comparison threshold.', 'Show why the alert exists.'],
      ['created_at', 'Time the alert was created.', 'Display and sort.'],
    ],
    comparison: [
      ['Current UI', 'No confirmed alert component', 'Latest alert panel', 'Build only as prepared UI until backend exists.'],
      ['Data source', 'None', 'data.alerts', 'Do not use fake static alerts as live data.'],
      ['Dataset', 'Dashboard route dataset', 'datasetName query', 'Send current datasetName when connected.'],
      ['Status', 'No current alert status', 'status field', 'Read from API data.'],
      ['Severity', 'No current severity mapping', 'severity field', 'Map to existing badge/card styling.'],
    ],
    service: [
      'Prepare latestAlerts({ datasetName, limit }) in dataApiClient.js only with unavailable handling; this part is still genuinely not built.',
      'Build query parameters from the current dashboard datasetName and limit.',
      'Add normalizeAlertsResponse(response) that reads data.alerts and returns an array shaped to match ActiveAlerts.jsx expected alert fields (severity, timestamp, alert_type, target, message, method, source.component, score, supporting_values, time_window, alert_id).',
      'Return an unavailable state while the route is missing instead of throwing a confusing dashboard failure.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/components/ActiveAlerts.jsx',
        status: 'exists',
        code: `const ActiveAlerts = ({
  alerts = [],
  loading = false,
  error = null,
  hasAnalysed = false,
}) => {
  // This "not yet analysed" state already exists -- mount the component now, honestly.
  if (!hasAnalysed) {
    return (
      <section className="active-alerts-panel active-alerts-panel--empty">
        <h2 className="active-alerts-title">Active Alerts</h2>
        <p className="active-alerts-status">Run an analysis to view active alerts.</p>
      </section>
    );
  }
  // loading / error / empty / success states already exist below this -- nothing to build.
};`,
        note: 'This component is fully built and already handles every state correctly. It is simply not mounted anywhere yet.',
      },
      {
        file: 'new-frontend/frontend/src/services/dataApiClient.js',
        status: 'new',
        steps: 'Steps 1-4',
        code: `// This file doesn't exist yet. Once BDAI-11 adds the route, add this:

export async function latestAlerts({ datasetName, limit = 5 } = {}) {
  const params = new URLSearchParams({ datasetName, limit: String(limit) });
  const response = await fetch(\`/api/alerts/latest?\${params}\`);

  if (response.status === 404) {
    return []; // route not implemented yet -- treat as unavailable, not an error
  }
  if (!response.ok) {
    throw new Error(\`Latest alerts request failed: \${response.status}\`);
  }

  const body = await response.json();
  return body?.data?.alerts ?? [];
}`,
        note: 'Do not build this until GET /api/alerts/latest actually exists -- wiring it in early against a 404 would just produce confusing errors.',
      },
    ],
    connectExisting: [
      'ActiveAlerts.jsx already exists as a fully built component. It accepts { alerts, loading, error, hasAnalysed } and already renders every state correctly; it is just not mounted or connected to anything yet.',
    ],
    connect: [
      'Mount ActiveAlerts.jsx in Dashboard.jsx now, passing hasAnalysed={false} (or similar) so it renders its existing "not yet analysed" state honestly until real data exists.',
      'Do not connect it to live alert data until BDAI-11 is complete.',
      'After the route exists, call latestAlerts from the selected dashboard or alert summary area and pass the result into ActiveAlerts.jsx existing props.',
      'Keep alert loading/error state separate from series chart loading/error state, and do not let an alert failure break the dashboard charts.',
    ],
    connectCode: [
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Step 2',
        code: `// Mount it now, with an honest "not analysed yet" state -- no live alert data exists yet.
<ActiveAlerts alerts={[]} loading={false} error={null} hasAnalysed={false} />`,
        note: 'This is the only real UI work available today: deciding where this panel sits.',
      },
      {
        file: 'new-frontend/frontend/src/components/Dashboard.jsx',
        status: 'new',
        steps: 'Steps 3-4',
        code: `// After BDAI-11 exists: fetch the real alerts and pass them in.
const alerts = await latestAlerts({ datasetName, limit: 5 });
setAlerts(alerts);

<ActiveAlerts alerts={alerts} loading={alertsLoading} error={alertsError} hasAnalysed={true} />`,
        note: 'Until BDAI-11 lands, keep the snippet above (hasAnalysed={false}) instead of this. Step 5 (keeping alert state separate from chart state) is why alertsLoading/alertsError are their own variables here, not reused from the series hook.',
      },
    ],
    uiExisting: [
      'ActiveAlerts.jsx already renders severity, timestamp, alert type, source, and score for each alert card, using the project\'s existing card, badge, and callout patterns.',
      'ActiveAlerts.jsx already handles not-yet-analysed, loading, error, empty, and success states, including showing no current alerts when the array is empty.',
    ],
    ui: [
      'The only real UI work is placement: decide where the compact Latest Alerts panel sits near the dashboard summary content, since ActiveAlerts.jsx is not mounted anywhere yet (see step 9).',
    ],
    states: [
      ['Prepare now', 'Show unavailable or hidden UI until backend support exists.'],
      ['Loading', 'Show that latest alerts are being checked.'],
      ['Success', 'Show active latest alerts from data.alerts.'],
      ['Empty result', 'Show no current alerts.'],
      ['Backend unavailable', 'Show latest alerts are not connected yet.'],
      ['Auth/upstream errors', 'Show readable error states when those backend behaviours are enforced.'],
    ],
    tests: [
      'Before BDAI-11, open the dashboard and confirm the UI does not claim live latest alerts.',
      'If a prepared panel exists, confirm missing GET /api/alerts/latest shows unavailable.',
      'After BDAI-11, open DevTools and confirm GET /api/alerts/latest?datasetName=thingspeak-live&limit=2 is called.',
      'Open the response and confirm data.alerts contains id, streamName, severity, status, message, value, threshold, and created_at.',
      'Test an empty alerts array and confirm the no-alerts state appears.',
    ],
    doneWhen: [
      'No latest-alert UI claims live backend data before BDAI-11 is complete.',
      'The prepared service and normalizer understand data.alerts.',
      'After backend completion, requests include the current datasetName.',
      'Severity and status are read from API data, not hard-coded as fixed live values.',
    ],
    commonProblems: [
      ['New alert component built from scratch', 'Check for new-frontend/frontend/src/components/ActiveAlerts.jsx first; it already exists and is not mounted anywhere.'],
      ['Fake alert shown as live', 'Remove static demo alert data from user-facing live states.'],
      ['Dashboard breaks when alerts fail', 'Keep alert state separate from series chart state.'],
      ['Wrong dataset alerts', 'Check datasetName query parameter.'],
      ['Missing backend route', 'Show unavailable until BDAI-11 is complete.'],
    ],
    nextTitle: 'Alert History',
    nextHref: '/guide/mock-to-live-integration/alert-history',
  },
  {
    slug: 'alert-history',
    title: 'Alert History',
    status: 'Prepare Now / Pending Backend',
    shortLabel: 'Frontend-ready examples -> future alert history',
    description: 'Prepare historical alert display, filters and pagination for the future live Alert History API.',
    quickState: 'Nothing has been built yet. No UI and no service.',
    quickIssue: 'Both the frontend view and the backend route still need to be built.',
    quickFix: 'Wait for BDAI-11, then build a table using the documented pagination contract.',
    quickIssueTone: 'neutral',
    goal: 'Prepare a historical alert view with filtering and pagination, then connect it when alert persistence and history support exist.',
    splitLabel: 'Can Prepare Now / Complete When Backend Is Available',
    canPrepare: [
      'Plan a scan-friendly alert history table or view.',
      'Prepare state for filters such as datasetName, severity/status, from, to, limit, and offset.',
      'Prepare a normalizer that returns { alerts, pagination }.',
    ],
    completeWhenAvailable: [
      'Complete live alert history only after BDAI-11 adds persisted alert history and GET /api/alerts/history.',
      'Verify pagination and filter semantics with the live backend before presenting the feature as complete.',
    ],
    currentFlow: [
      'There is no current alert history frontend',
      'There is no active live backend history route',
      'Frontend-ready examples describe future filters and pagination',
    ],
    targetFlow: [
      'Alert history comes from the IoT backend (GET /api/alerts/history)',
      'History responses become table-ready data (normalizeAlertHistoryResponse())',
      'Filters and pagination use API metadata',
      'A history table shows previous alerts over time',
    ],
    current: [
      'No active frontend alert history table, view, or service is currently confirmed.',
      'No active backend route for GET /api/alerts/history is currently confirmed.',
      'The contract defines filters and pagination, but Alert History depends on BDAI-11.',
    ],
    wanted: [
      'Alert History should show previous alerts over time.',
      'Latest Alerts and Alert History should stay separate: latest is a short current summary, history is a reviewable list/table.',
      'Pagination should use API metadata instead of guessing from the current page length.',
      'History filters should not interfere with dashboard stream filters.',
    ],
    files: [
      'new-frontend/frontend/src/services/dataApiClient.js',
      'A future alert history view, for example new-frontend/frontend/src/pages/AlertHistoryPage.jsx',
      'A future table component, for example new-frontend/frontend/src/components/AlertHistoryTable.jsx',
    ],
    inspect: [
      'There is no current Alert History UI to preserve, so this is preparation work until the backend route exists.',
      'A future history view may live on its own page, in a dashboard tab, or in a drawer/table.',
      'The table should be planned around alert fields and pagination metadata before request code is connected.',
      'Dashboard stream filters and alert-history query filters are different controls and should stay separate.',
      'The goal: prepare a history view that can use real backend alerts and pagination when BDAI-11 is complete.',
    ],
    apiName: 'Alert History API',
    method: 'GET',
    endpoint: '/api/alerts/history',
    apiLocation: 'Open Data API Reference and Frontend-Ready Examples, then find the Alert History section: this one is a contract-ready example, not a live backend endpoint yet.',
    whyApi: 'This API is intended to return previous alerts with filters and pagination so users can review alert activity over time.',
    requestExample: 'GET /api/alerts/history?datasetName=thingspeak-live&status=resolved&severity=warning&limit=20&offset=0',
    responseExample: `{
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
        "status": "resolved",
        "message": "field1 exceeded the configured warning threshold.",
        "value": 113,
        "threshold": 100,
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
    responseFields: [
      ['data.alerts', 'Historical alert rows.', 'Render table/list rows.'],
      ['data.pagination.limit', 'Maximum rows returned.', 'Drive page size.'],
      ['data.pagination.offset', 'Current starting position.', 'Drive previous/next controls.'],
      ['data.pagination.total', 'Total matching rows.', 'Show count and disable next when done.'],
      ['resolved_at', 'Time an alert was resolved.', 'Show for resolved history rows when present.'],
    ],
    comparison: [
      ['Latest Alerts', 'Short current summary', 'GET /api/alerts/latest', 'Do not use it for history.'],
      ['Alert History', 'Previous alerts over time', 'GET /api/alerts/history', 'Use table/list with pagination.'],
      ['Dashboard stream filters', 'selectedStreams for chart data', 'Alert history query filters', 'Keep separate state.'],
      ['Pagination', 'No current UI', 'data.pagination', 'Use API metadata.'],
      ['Filters', 'No current UI', 'datasetName, status/severity, from, to, limit, offset', 'Add after backend semantics are verified.'],
    ],
    service: [
      'Prepare alertHistory(query) in dataApiClient.js only with unavailable handling.',
      'Build query parameters explicitly: datasetName, status or severity, from, to, limit, and offset.',
      'Add normalizeAlertHistoryResponse(response) that returns { alerts, pagination }.',
      'Reset offset to 0 when filters change.',
    ],
    integrationCode: [
      {
        file: 'new-frontend/frontend/src/services/dataApiClient.js',
        status: 'new',
        steps: 'Steps 1-3',
        code: `// This file doesn't exist yet. Once BDAI-11 adds the route, add this:

export async function alertHistory({ datasetName, limit = 20, offset = 0 } = {}) {
  const params = new URLSearchParams({ datasetName, limit: String(limit), offset: String(offset) });
  const response = await fetch(\`/api/alerts/history?\${params}\`);

  if (response.status === 404) {
    return { alerts: [], pagination: { limit, offset, total: 0 } };
  }
  if (!response.ok) {
    throw new Error(\`Alert history request failed: \${response.status}\`);
  }

  const body = await response.json();
  return {
    alerts: body?.data?.alerts ?? [],
    pagination: body?.data?.pagination ?? { limit, offset, total: 0 },
  };
}`,
        note: 'Nothing exists yet for this feature -- no service, no UI, no backend route. This is a starting sketch for whoever builds it, not a fix.',
      },
    ],
    connect: [
      'Do not connect as live until BDAI-11 is complete.',
      'After the route exists, call alertHistory from the history page/table.',
      'Keep latest-alert state separate from alert-history state.',
      'Keep dashboard chart filters separate from alert-history filters.',
    ],
    connectCode: [
      {
        file: 'A future alert history page (not built yet)',
        status: 'new',
        steps: 'Step 2',
        code: `// After BDAI-11 exists:
const { alerts, pagination } = await alertHistory({ datasetName, limit: 20, offset: 0 });`,
        note: 'This is a sketch, not a fix -- nothing calls alertHistory() yet because nothing in the UI exists to call it from.',
      },
    ],
    ui: [
      'Recommended future UI: an Alert History table with time, dataset, stream, severity, status, message, value, threshold, and resolved_at.',
      'Add pagination controls that use limit, offset, and total.',
      'Add filters only after the basic table works.',
      'Use existing table, badge, and empty-state patterns.',
    ],
    uiCode: [
      {
        file: 'A future AlertHistoryTable.jsx (not built yet)',
        status: 'new',
        steps: 'Step 1',
        code: `<table>
  <tbody>
    {alerts.map((alert) => (
      <tr key={alert.id}>
        <td>{alert.created_at}</td>
        <td>{alert.streamName}</td>
        <td>{alert.severity}</td>
        <td>{alert.status}</td>
        <td>{alert.message}</td>
      </tr>
    ))}
  </tbody>
</table>`,
        note: 'A starting sketch, not a finished component -- pagination controls (limit/offset/total) still need to be added once this exists.',
      },
    ],
    states: [
      ['Prepare now', 'Show unavailable or keep the future page hidden until backend support exists.'],
      ['Loading', 'Show that alert history is loading.'],
      ['Success', 'Show historical alert rows and pagination.'],
      ['Empty result', 'Show no matching alert history.'],
      ['Validation/filter issue', 'Show which query value needs correction when backend provides that error.'],
      ['Backend unavailable', 'Show history is not connected yet.'],
    ],
    tests: [
      'Before BDAI-11, confirm any prepared history view shows unavailable and does not fake live rows.',
      'After BDAI-11, open DevTools and trigger GET /api/alerts/history with datasetName, limit, and offset.',
      'Confirm the response includes data.alerts and data.pagination.',
      'Change a filter and confirm offset resets to 0.',
      'Test empty history and confirm the empty state appears.',
      'Confirm history filters do not change dashboard chart filters.',
    ],
    doneWhen: [
      'Alert History waits for an active backend route before claiming live data.',
      'The normalizer returns { alerts, pagination } from the V1 response.',
      'The table/list uses API pagination metadata.',
      'Alert History is clearly separate from Latest Alerts.',
      'History filters do not interfere with dashboard stream filters.',
    ],
    commonProblems: [
      ['Latest endpoint used for history', 'Use /api/alerts/history for previous alerts over time.'],
      ['Pagination guessed in the frontend', 'Use data.pagination.limit, offset, and total.'],
      ['Filters change the dashboard', 'Keep alert history filter state separate from dashboard selectedStreams.'],
      ['Backend route missing', 'Show unavailable until BDAI-11 is complete.'],
    ],
    nextTitle: 'Integration Support and Issue Reporting',
    nextHref: '/guide/integration-support',
  },
];

export function getMockToLiveGuide(slug: string) {
  return mockToLiveGuides.find((guide) => guide.slug === slug);
}
