# DataBytes Frontend Guide

A support guide for DataBytes frontend contributors. Covers general frontend practices plus IoT-project-specific guidance: the current frontend, the backend APIs, the mock-to-live migration path, and how to report integration issues.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS, with semantic color variables (oklch)
- next-themes for light/dark/system theme switching
- cmdk for the Cmd+K command palette
- Lucide React for icons
- Radix UI primitives (Dialog, Sheet, Accordion, etc.)

## Features

- Light, dark, and system theme modes, applied consistently across every page
- Cmd+K (or Ctrl+K) command palette to jump to any guide chapter or switch themes
- A slide-in mobile navigation drawer
- Six Mock-to-Live guides (Datasets, Series, Filters, Analytics, Latest Alerts, Alert History), each with real, verified code examples

## Getting Started

Requires Node.js 18 or later.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Project Structure

```text
app/                    Next.js App Router pages
  globals.css           Theme tokens (light/dark)
  layout.tsx             Root layout, theme provider, nav, footer
  guide/                 Guide chapters (frontend workflow, API reference, mock-to-live, etc.)
components/             Reusable UI components
  ui/                    Radix UI primitives
  guide/                 Components shared across guide pages (GuideBlocks.tsx)
lib/                    Navigation config and Mock-to-Live guide content
```

## Contributing

To suggest a change:

1. Create a branch: `git checkout -b feature/your-feature`
2. Make your edit, using the existing semantic color classes (`bg-background`, `text-foreground`, etc.) rather than hard-coded colors
3. Open a pull request
