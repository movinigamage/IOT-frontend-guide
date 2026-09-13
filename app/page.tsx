import Link from 'next/link';
import { ArrowRight, BookOpen, Bug, CheckCircle2, Link2, SearchCheck, Zap } from 'lucide-react';
import { mockToLiveGuides } from '@/lib/mockToLiveGuides';

const toolkitPaths = [
  {
    title: 'Frontend Development Guide',
    description: 'Learn practical frontend workflow, UI/UX, component design, API testing, quality practices, and useful development resources.',
    href: '/guide/frontend-workflow',
    icon: BookOpen,
  },
  {
    title: 'IoT Project Guide',
    description: 'Understand the actual IoT frontend, its APIs, frontend/backend integration, mock-to-live migration, and integration support.',
    href: '/guide/frontend-review',
    icon: SearchCheck,
  },
];

const frontendLinks = [
  ['Frontend Best Practices', '/guide/frontend-workflow'],
  ['UI/UX Guidance', '/guide/ui-ux-quality'],
  ['Component & Code Quality', '/guide/component-planning'],
  ['API Testing', '/guide/api-debugging'],
  ['Quality Checklist', '/guide/quality-checklist'],
  ['Resources', '/guide/resources'],
];

const projectLinks = [
  ['IoT Frontend Review', '/guide/frontend-review'],
  ['Data API Reference and Frontend-Ready Examples', '/guide/data-api-reference'],
  ['Frontend-Backend Integration Guide', '/guide/frontend-backend-connection'],
  ['Mock-to-Live', '/guide/mock-to-live-integration'],
  ['Integration Support and Issue Reporting', '/guide/integration-support'],
];

function statusDotClass(status: string) {
  if (status === 'Live' || status === 'Ready / Transitional') return 'bg-emerald-500';
  if (status === 'Live / Bug Found') return 'bg-red-500';
  return 'bg-amber-500';
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="space-y-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Frontend
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500"> Support Toolkit</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A practical support toolkit with two clear paths: general frontend development guidance and IoT project-specific guidance based on the actual frontend and backend integration work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/guide/frontend-workflow"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold rounded-lg transition-all duration-300"
            >
              Start Reading <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/guide/frontend-workflow"
              className="inline-flex items-center justify-center px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-lg transition-all duration-300"
            >
              Frontend Development Guide
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {toolkitPaths.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.title}
                href={area.href}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="bg-card/50 border border-border rounded-2xl p-8 lg:p-10 shadow-sm mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Project Status at a Glance</h2>
            <Link href="/guide/mock-to-live-integration" className="text-sm text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1">
              Full breakdown <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockToLiveGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guide/mock-to-live-integration/${guide.slug}`}
                className="flex items-start gap-3 p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-muted hover:border-border transition-all duration-300"
              >
                <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusDotClass(guide.status)}`} />
                <div>
                  <p className="font-semibold text-foreground">{guide.title}</p>
                  <p className="text-sm text-muted-foreground">{guide.quickState}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-6 mb-20">
          <div className="bg-card/30 backdrop-blur-md border border-border rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-bold text-foreground mb-8">Toolkit Map</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Frontend Development Guide</h3>
                <div className="space-y-3">
                  {frontendLinks.map(([label, href]) => (
                    <Link key={href} href={href} className="block p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-muted hover:border-border transition-all duration-300 group">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors">{label}</span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">IoT Project Guide</h3>
                <div className="space-y-3">
                  {projectLinks.map(([label, href]) => (
                    <Link key={href} href={href} className="block p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-muted hover:border-border transition-all duration-300 group">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors">{label}</span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-border rounded-2xl p-8 lg:p-10 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-foreground">How to Use the Toolkit</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Start with the general frontend guide if you are learning the development basics. Move to the IoT project guide when you need to understand the current application, APIs, integration path, and troubleshooting process.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Learn the general idea first.</span>
              </div>
              <div className="flex gap-3 text-muted-foreground">
                <Link2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>See how it applies to IoT.</span>
              </div>
              <div className="flex gap-3 text-muted-foreground">
                <Bug className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Use the testing and support pages when something does not work.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
