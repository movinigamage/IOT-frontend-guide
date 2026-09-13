import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Callout, CheckList, CodeBlock, FindingItem, FindingsList, FindingsSection, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';

const validationRows = [
  { check: 'Dataset name', rule: 'Required, 1-120 characters.', example: '"Please enter a dataset name" / "Dataset name must be at most 120 characters".' },
  { check: 'Timestamp column', rule: 'Required. Must be selected, and every value in that column must parse as a date. Plain numeric ID columns are rejected even if selected.', example: '"Please select a timestamp column..." / "The selected timestamp column contains an invalid or empty timestamp value."' },
  { check: 'Sensor columns', rule: 'At least 1, at most 8. Only columns auto-detected as Number type can be selected for import.', example: '"Please select at least one sensor column" / "A maximum of 8 sensor columns can be imported".' },
  { check: 'Backend field', rule: 'Every selected sensor column must be assigned a unique field1-field8 slot.', example: '"Please select a backend field for every imported sensor." / "Each sensor must use a different backend field".' },
  { check: 'Display name', rule: 'Required per selected sensor, at most 120 characters, must be unique across the selected sensors.', example: '"Please enter a display name..." / "Display names must be unique." / "Display names must be at most 120 characters."' },
];

export default function DatasetUploadPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Dataset Upload / Data Loader</h1>
        <p className="text-lg text-muted-foreground">
          A real, already-built feature that lets a user import a CSV file as a new dataset, with column mapping, timestamp detection, and validation, backed by a real database schema. This guide documents how it works.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          state="Fully built and working: CSV upload, column mapping, and timestamp detection."
          issue="None. This feature works. It just was not documented anywhere before this page."
          fix="Nothing to fix. Read this page before extending or debugging the upload dialog."
          issueTone="good"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <Callout title="Why this guide exists" tone="blue">
          <p>
            This feature is substantial (a 750+ line dialog component, plus a real database migration behind it) and was previously undocumented anywhere in this toolkit. If you are extending dataset handling, debugging an upload, or building something similar for another feature, start here.
          </p>
        </Callout>

        <GuideCard title="What This Feature Does">
          <p>A user opens the Home page, clicks the Upload Dataset card, selects a CSV file, and is guided through choosing a timestamp column, choosing which numeric columns to import as sensor streams, and mapping each one to a backend field before confirming the upload.</p>
        </GuideCard>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Where It Lives</h2>
          <GuideTable
            columns={['Piece', 'File', 'Responsibility']}
            rows={[
              ['Entry point', 'new-frontend/frontend/src/pages/HomePage.jsx', 'Renders the Upload Dataset card and opens the dialog; calls refreshDatasets() from useDatasets() when the dialog closes.'],
              ['Trigger card', 'new-frontend/frontend/src/components/UploadDatasetCard.jsx', 'The clickable card shown alongside dataset cards on the Home page.'],
              ['Upload dialog', 'new-frontend/frontend/src/components/UploadDatasetDialog.jsx', 'The whole upload flow: file parsing, timestamp detection, column mapping, validation, and submission. 757 lines.'],
              ['API call', 'new-frontend/frontend/src/services/datasetService.js', 'createDataset(payload) posts to /api/datasets with a JWT bearer token, retrying once on an expired-token response.'],
              ['Database schema', 'backend/src/db/migrations/002_dataset_management.sql', 'Adds the dataset_field_mappings table that stores the sourceField -> storageField (field1-field8) mapping per dataset, plus created_by/updated_by audit columns.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">The Upload Flow</h2>
          <StepFlow
            steps={[
              'Select a .csv file',
              'Parse it in the browser (custom parseCSVLine, no external CSV library)',
              'Auto-detect a timestamp column, validate it, let the user override it',
              'Auto-detect Number vs Text columns; only Number columns are selectable for import',
              'User selects up to 8 sensor columns, each auto-assigned to the next free field1-field8 slot',
              'User can rename each selected column\'s display name and adjust the assigned backend field',
              'Client-side validation runs on confirm',
              'POST /api/datasets via createDataset(), with JWT auth and automatic retry on token expiry',
              'On success, the dialog closes and HomePage refreshes the dataset list',
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Timestamp Detection</h2>
          <p className="text-muted-foreground leading-relaxed">
            detectTimestampColumn() checks the CSV header row against a fixed list of common names (case-insensitive): created_at, timestamp, datetime, date_time, time, date, recorded_at, reading_time. If one matches, it is only auto-selected if isValidTimestampColumn() also confirms every value in that column parses as a real date: a plain numeric ID column will never be auto-selected as a timestamp, even if its header name matches.
          </p>
          <CodeBlock>{`const timestampNames = [
  "created_at", "timestamp", "datetime", "date_time",
  "time", "date", "recorded_at", "reading_time",
];

const detectedColumn = headers.find((header) =>
  timestampNames.includes(header.toLowerCase())
);`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed">
            If no header name matches, or the matched column's values are not all valid dates, the user must pick a timestamp column manually from a dropdown before they can confirm the upload.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Column Mapping to field1-field8</h2>
          <p className="text-muted-foreground leading-relaxed">
            The backend's wide-format storage (see the timeseries table) has eight fixed sensor slots: field1 through field8. Only CSV columns detected as Number type can be selected for import. When a column is selected, it is automatically assigned the next unused slot:
          </p>
          <CodeBlock>{`const predefinedFields = ["field1", "field2", "field3", "field4", "field5", "field6", "field7", "field8"];

const usedFields = selectedColumns.map((column) => column.backendField);
const availableField = predefinedFields.find((field) => !usedFields.includes(field));`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed">
            The user can still rename the display name shown for each selected column, and at most 8 sensor columns can be selected in total (matching the field1-field8 limit).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Validation Before Submit</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            handleConfirm() re-validates everything client-side before sending the request, rather than only relying on the backend to reject bad data:
          </p>
          <FindingsSection title="Client-Side Validation Checks" meta={`${validationRows.length} checks · rule and example error shown to the user`} defaultOpen>
            <FindingsList>
              {validationRows.map((v) => (
                <FindingItem key={v.check} title={v.check}>
                  {v.rule} Example: {v.example}
                </FindingItem>
              ))}
            </FindingsList>
          </FindingsSection>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">The Request That Gets Sent</h2>
          <p className="text-muted-foreground leading-relaxed">
            Once validation passes, the dialog builds a single payload and calls createDataset() from datasetService.js, which POSTs it to /api/datasets with a JWT bearer token (and retries once if the token has expired):
          </p>
          <CodeBlock>{`const sensorMappings = selectedSensors.map((column) => ({
  sourceField: column.columnName,
  storageField: column.backendField,
  displayName: column.displayName.trim(),
  sourceDataType: "number",
}));

const uploadConfig = {
  name: datasetName.trim(),
  timestampField: timestampColumn,
  mappings: sensorMappings,
  rows: allRows,
};

await createDataset(uploadConfig);`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed">
            rows is the full parsed CSV (not just the 5-row preview shown while mapping columns). Each mapping entry corresponds to one row in the dataset_field_mappings table, tying a CSV column to a storage field and an audit trail (created_by/updated_by) on the backend.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Error Handling</h2>
          <p className="text-muted-foreground leading-relaxed">
            If the backend rejects the request, the dialog looks for a structured field-level error first (err.response.data.error.fields), and falls back to a general error message if the backend response is not in that shape. This means backend validation error messages already reach the user directly when the backend provides them in that format.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Feature Does Not Do Yet</h2>
          <CheckList
            items={[
              'No edit or delete flow for an already-uploaded dataset; only create is wired up.',
              'No progress indicator for large CSV files; the whole file is parsed and held in memory (allRows) before submission.',
              'No column-level preview beyond the first 5 rows shown while mapping columns.',
              'Timestamp values are not converted or normalized on the frontend; they are sent to the backend as the original CSV strings.',
            ]}
          />
        </section>

        <NextUp title="What Should I Read Next?">
          <p>See how the resulting dataset list is loaded back on the Home page.</p>
          <Link href="/guide/mock-to-live-integration/datasets" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to the Datasets Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
