export type GuideNavItem = {
  title: string;
  href: string;
  icon: string;
  children?: GuideNavItem[];
};

export type GuideNavSection = {
  title?: string;
  items: GuideNavItem[];
};

export const guideNavigationSections: GuideNavSection[] = [
  {
    items: [
      {
        title: "Home",
        href: "/",
        icon: "Home",
      },
      {
        title: "Why This Guide",
        href: "/guide/why-this-guide",
        icon: "Compass",
      },
    ],
  },
  {
    title: "Frontend Development Guide",
    items: [
      {
        title: "Frontend Best Practices",
        href: "/guide/frontend-workflow",
        icon: "GitBranch",
      },
      {
        title: "UI/UX Guidance",
        href: "/guide/ui-ux-quality",
        icon: "Palette",
      },
      {
        title: "Component & Code Quality",
        href: "/guide/component-planning",
        icon: "Code2",
      },
      {
        title: "API Testing",
        href: "/guide/api-debugging",
        icon: "Bug",
      },
      {
        title: "Quality Checklist",
        href: "/guide/quality-checklist",
        icon: "CheckCircle2",
      },
      {
        title: "Resources",
        href: "/guide/resources",
        icon: "Library",
      },
    ],
  },
  {
    title: "IoT Project Guide",
    items: [
      {
        title: "IoT Frontend Review",
        href: "/guide/frontend-review",
        icon: "SearchCheck",
      },
      {
        title: "Dataset Upload / Data Loader",
        href: "/guide/dataset-upload",
        icon: "Upload",
      },
      {
        title: "Data API Reference and Frontend-Ready Examples",
        href: "/guide/data-api-reference",
        icon: "Database",
      },
      {
        title: "Frontend-Backend Integration Guide",
        href: "/guide/frontend-backend-connection",
        icon: "Link2",
      },
      {
        title: "Mock-to-Live",
        href: "/guide/mock-to-live-integration",
        icon: "Replace",
        children: [
          {
            title: "Datasets",
            href: "/guide/mock-to-live-integration/datasets",
            icon: "Circle",
          },
          {
            title: "Series",
            href: "/guide/mock-to-live-integration/series",
            icon: "Circle",
          },
          {
            title: "Filters",
            href: "/guide/mock-to-live-integration/filters",
            icon: "Circle",
          },
          {
            title: "Analytics",
            href: "/guide/mock-to-live-integration/analytics",
            icon: "Circle",
          },
          {
            title: "Latest Alerts",
            href: "/guide/mock-to-live-integration/latest-alerts",
            icon: "Circle",
          },
          {
            title: "Alert History",
            href: "/guide/mock-to-live-integration/alert-history",
            icon: "Circle",
          },
        ],
      },
      {
        title: "Integration Support and Issue Reporting",
        href: "/guide/integration-support",
        icon: "MessagesSquare",
      },
    ],
  },
];

export const guideNavigation = guideNavigationSections.flatMap((section) =>
  section.items.flatMap((item) => [item, ...(item.children ?? [])])
);
