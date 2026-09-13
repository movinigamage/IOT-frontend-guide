import { ArrowRight, ExternalLink, Zap } from 'lucide-react';
import Link from 'next/link';
import { NextUp, QuickGlance } from '@/components/guide/GuideBlocks';

const resources = [
  {
    category: 'React and JavaScript',
    items: [
      { name: 'React Documentation', url: 'https://react.dev', description: 'Official React concepts, hooks, state, rendering, and component guidance.' },
      { name: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Reliable JavaScript language reference and examples.' },
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', description: 'Types, narrowing, generics, configuration, and everyday TypeScript patterns.' },
    ],
  },
  {
    category: 'REST APIs and Testing',
    items: [
      { name: 'Postman Learning Center', url: 'https://learning.postman.com/', description: 'API request testing, collections, environments, and documentation.' },
      { name: 'Thunder Client', url: 'https://www.thunderclient.com/', description: 'Lightweight API testing inside VS Code.' },
      { name: 'MDN HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', description: 'HTTP methods, status codes, headers, CORS, and caching.' },
    ],
  },
  {
    category: 'Browser DevTools',
    items: [
      { name: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools/', description: 'Network, Console, Performance, Lighthouse, and debugging workflows.' },
      { name: 'Firefox Developer Tools', url: 'https://firefox-source-docs.mozilla.org/devtools-user/', description: 'Cross-browser inspection, console, network, and accessibility tooling.' },
      { name: 'React Developer Tools', url: 'https://react.dev/learn/react-developer-tools', description: 'Inspect React component hierarchy, props, state, and rendering behaviour.' },
    ],
  },
  {
    category: 'UI/UX and Accessibility',
    items: [
      { name: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG21/quickref/', description: 'Accessibility criteria and techniques for web interfaces.' },
      { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', description: 'Check text and UI color contrast.' },
      { name: 'Material Design Data Visualization', url: 'https://m3.material.io/styles/data-visualization/overview', description: 'Useful guidance for charts, color, and data readability.' },
    ],
  },
  {
    category: 'Responsive Design',
    items: [
      { name: 'MDN Responsive Design', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design', description: 'Breakpoints, fluid layouts, flexible media, and viewport basics.' },
      { name: 'web.dev Responsive Design', url: 'https://web.dev/learn/design/', description: 'Modern responsive layout and interaction guidance.' },
      { name: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', description: 'Useful for this toolkit website and other Tailwind-based UI work.' },
    ],
  },
  {
    category: 'Git, GitHub, and Team Workflow',
    items: [
      { name: 'GitHub Docs', url: 'https://docs.github.com/', description: 'Issues, pull requests, reviews, projects, and collaboration workflows.' },
      { name: 'Conventional Commits', url: 'https://www.conventionalcommits.org/', description: 'Consistent commit message structure.' },
      { name: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/git/tutorials', description: 'Accessible explanations of common Git concepts and team workflows.' },
    ],
  },
  {
    category: 'Structured Learning Paths',
    items: [
      {
        name: 'Harvard CS50 (2026) - Full Computer Science University Course',
        url: 'https://www.youtube.com/watch?v=gmuTjeQUbTM',
        description: 'A strong option for contributors who want broader programming foundations, including problem solving, algorithms, data structures, and core computer science concepts.',
      },
      {
        name: 'Become a Fullstack Developer from Scratch',
        url: 'https://www.youtube.com/watch?v=LzMnsfqjzkA',
        description: 'A practical course for understanding how frontend interfaces and backend systems work together in complete web applications.',
      },
      {
        name: 'The Odin Project',
        url: 'https://www.theodinproject.com/',
        description: 'A structured, hands-on path for learning frontend development, JavaScript, Git, backend concepts, and full-stack development through guided projects.',
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Resources and Upskilling</h1>
        <p className="text-lg text-muted-foreground">
          Curated references for frontend contributors working with React, APIs, UI quality, accessibility, responsive design, and team workflow.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="Curated links for React, APIs, DevTools, UI/UX, accessibility, responsive design, and Git."
          issue="Whenever a concept in this toolkit is new to you and you want a deeper explanation."
          fix="Treat it as a support shelf, not required reading. Dip in when you actually need it."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-12">
        {resources.map((section) => (
          <section key={section.category}>
            <h2 className="text-2xl font-bold text-foreground mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card/50 border border-border rounded-lg p-4 hover:border-blue-500 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-1 flex items-center gap-2">
                        {item.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        <NextUp title="How to use these resources" icon={Zap}>
          <p>Treat this page as a support shelf. Use the learning links when a concept in the toolkit is new or you want a deeper explanation.</p>
        </NextUp>

        <NextUp title="Still Have Questions?">
          <div className="space-y-2">
            <Link href="/guide/integration-support" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Integration Support <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/frontend-review" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              IoT Frontend Review <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </NextUp>
      </div>
    </article>
  );
}
