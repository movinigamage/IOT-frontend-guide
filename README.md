# DataBytes - Frontend Guide

A comprehensive, practical support guide for future DataBytes frontend contributors. This project hosts structured tutorials, best practices, and UI/UX standards to ensure consistency and quality across our applications.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with semantic color variables (`oklch`)
- **Theme Management**: `next-themes` (supporting Light, Dark, and System Default modes)
- **Command Palette**: `cmdk` for fast keyboard-driven navigation
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Primitives**: Radix UI (Dialog, Sheet, Accordion, etc.)

---

## ✨ Features

- **Semantic Color System**: Configured in `globals.css` to allow seamless toggling between Light, Dark, and System modes. All core layouts and content components automatically adjust their text, backgrounds, and borders based on the current theme.
- **Interactive Command Palette**: Press `Cmd + K` (or `Ctrl + K`) to toggle a search dialog. Search through all 11 guide chapters or execute quick actions like switching themes with your keyboard.
- **Responsive Mobile Layout**: Features a slide-in side drawer (`Sheet` component) for navigation and theme controls on smaller screens.
- **Modern Typography & Glassmorphism**: Tailored layouts withOutfit/Geist fonts, subtle animations, backdrop blurs, and gradient card outlines.

---

## 🛠️ Development & Commands

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Install Dependencies

```bash
npm install
```

### Run the Development Server

The development script is configured to bypass Turbopack native binary compilation issues on certain architectures by running with Webpack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Deploy

To build the application for production:

```bash
npm run build
```

To run the production bundle locally:

```bash
npm run start
```

### Linting and Formatting

Ensure your code matches project standards:

```bash
npm run lint
```

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Layouts & Pages)
│   ├── globals.css       # Core theme tokens (light/dark variables)
│   ├── layout.tsx        # Hydration wrapper with ThemeProvider
│   └── guide/            # The 11 documentation chapters (Contact, Workflow, etc.)
├── components/           # Reusable UI components
│   ├── ui/               # Radix UI primitives (command, sheet, dialog)
│   ├── Sidebar.tsx       # Sidebar navigation
│   ├── TopNav.tsx        # Top navigation with mobile drawer trigger
│   ├── ThemeToggle.tsx   # Light/dark/system mode toggle
│   └── CommandMenu.tsx   # Cmd+K search command menu
├── lib/                  # Helper utilities and navigation configurations
└── public/               # Static assets & placeholders
```

---

## 🤝 Contributing

We encourage team members to contribute to this guide! If you find an error, want to suggest updates, or add new examples:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your edits conforming to the semantic color system (`bg-background`, `text-foreground`, etc.).
3. Commit and open a Pull Request.
4. Reach out on Slack at `#frontend-discussion` or contact the core team via the **Contact Us** page.
