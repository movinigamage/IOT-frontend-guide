import type { ReactNode } from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertOctagon, ArrowRight, CircleDot, Wrench, ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusTone = 'available' | 'defined' | 'pending' | 'mock' | 'blocked' | 'review';

const badgeStyles: Record<StatusTone, string> = {
  available: 'text-emerald-600 dark:text-emerald-400',
  defined: 'text-blue-600 dark:text-blue-400',
  pending: 'text-amber-600 dark:text-amber-400',
  mock: 'text-slate-500 dark:text-slate-400',
  blocked: 'text-red-600 dark:text-red-400',
  review: 'text-blue-600 dark:text-blue-400',
};

export function QuickGlance({
  state,
  issue,
  fix,
  stateLabel = 'Current State',
  issueLabel = 'Issue',
  fixLabel = 'What To Do',
  issueTone = 'warning',
  stateIcon: StateIcon = Info,
  issueIcon: IssueIcon = AlertTriangle,
  fixIcon: FixIcon = Wrench,
}: {
  state: ReactNode;
  issue: ReactNode;
  fix: ReactNode;
  stateLabel?: string;
  issueLabel?: string;
  fixLabel?: string;
  issueTone?: 'good' | 'warning' | 'neutral';
  stateIcon?: LucideIcon;
  issueIcon?: LucideIcon;
  fixIcon?: LucideIcon;
}) {
  const issueColor =
    issueTone === 'good' ? 'text-emerald-500' : issueTone === 'neutral' ? 'text-blue-400' : 'text-amber-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/70 bg-card/50 border border-border/70 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2.5">
          <StateIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">{stateLabel}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{state}</p>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2.5">
          <IssueIcon className={cn('w-4 h-4 flex-shrink-0', issueColor)} />
          <p className={cn('text-xs font-semibold uppercase tracking-wide', issueColor)}>{issueLabel}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{issue}</p>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2.5">
          <FixIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">{fixLabel}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{fix}</p>
      </div>
    </div>
  );
}

export function StatusBadge({ children, tone = 'review' }: { children: ReactNode; tone?: StatusTone }) {
  return (
    <span className={cn('inline-flex items-center text-xs font-bold uppercase tracking-wide whitespace-nowrap', badgeStyles[tone])}>
      {children}
    </span>
  );
}

export function GuideCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bg-card/50 border border-border/70 rounded-2xl p-6 shadow-sm', className)}>
      <h3 className="font-semibold text-foreground mb-2.5">{title}</h3>
      <div className="text-muted-foreground text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function EvidenceCard({
  label,
  title,
  children,
  priority,
}: {
  label: string;
  title: string;
  children: ReactNode;
  priority?: 'High' | 'Medium' | 'Low';
}) {
  const tone = priority === 'High' ? 'blocked' : priority === 'Medium' ? 'pending' : priority === 'Low' ? 'defined' : 'review';

  return (
    <div className="bg-card/50 border border-border/70 rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400 mb-2">{label}</p>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        {priority && <StatusBadge tone={tone}>{priority} priority</StatusBadge>}
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

type FlowStep = string | { label: string; broken?: boolean; done?: boolean };

export function StepFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="bg-card/50 border border-border/70 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const label = typeof step === 'string' ? step : step.label;
          const broken = typeof step === 'string' ? false : step.broken;
          const done = typeof step === 'string' ? false : step.done;
          return (
            <div key={`${label}-${index}`} className="flex items-center gap-3.5">
              <div className="flex flex-col items-center self-stretch">
                <span
                  className={cn(
                    'flex min-h-8 min-w-8 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0',
                    done ? 'bg-emerald-500' : broken ? 'bg-red-500' : 'bg-blue-600'
                  )}
                >
                  {done ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </span>
                {index < steps.length - 1 && <span className="w-px flex-1 bg-border/70 my-1" />}
              </div>
              <span
                className={cn(
                  'text-sm font-medium py-3',
                  broken ? 'text-red-600 dark:text-red-400' : done ? 'text-muted-foreground' : 'text-foreground'
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChecklistGroup({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <label key={item} className="flex items-start gap-3 p-4 bg-card/50 rounded-xl border border-border/70 shadow-sm hover:border-border transition-colors">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
        </label>
      ))}
    </div>
  );
}

const calloutConfig = {
  blue: { border: 'border-l-blue-500', icon: Info, iconColor: 'text-blue-400' },
  yellow: { border: 'border-l-amber-500', icon: AlertTriangle, iconColor: 'text-amber-500' },
  red: { border: 'border-l-red-500', icon: AlertOctagon, iconColor: 'text-red-400' },
};

export function Callout({
  title,
  children,
  tone = 'blue',
}: {
  title: string;
  children: ReactNode;
  tone?: 'blue' | 'yellow' | 'red';
}) {
  const { border, icon: ToneIcon, iconColor } = calloutConfig[tone];

  return (
    <section className={cn('border border-border/70 border-l-4 rounded-2xl p-6 bg-card/30 shadow-sm', border)}>
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
        <ToneIcon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
        {title}
      </h3>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export function FindingsSection({
  title,
  meta,
  defaultOpen = false,
  children,
}: {
  title: string;
  meta?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group bg-card/50 border border-border/70 rounded-2xl shadow-sm open:shadow-md transition-shadow"
    >
      <summary className="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          {meta && <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>}
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 pt-4 border-t border-border/70">{children}</div>
    </details>
  );
}

export function PriorityList({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card/50 border border-border/70 rounded-2xl shadow-sm divide-y divide-border/70 overflow-hidden">
      {children}
    </div>
  );
}

const priorityStyles: Record<'High' | 'Medium' | 'Low', { border: string; bg: string; label: string }> = {
  High: { border: 'border-l-red-500', bg: 'bg-red-50/70 dark:bg-red-950/20', label: 'text-red-600 dark:text-red-400' },
  Medium: { border: 'border-l-amber-500', bg: '', label: 'text-amber-600 dark:text-amber-400' },
  Low: { border: 'border-l-blue-500', bg: '', label: 'text-blue-600 dark:text-blue-400' },
};

export function PriorityCard({
  title,
  priority,
  children,
}: {
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  children: ReactNode;
}) {
  const styles = priorityStyles[priority];

  return (
    <div className={cn('border-l-4 p-6', styles.border, styles.bg)}>
      <p className={cn('text-xs font-bold uppercase tracking-wide mb-1.5', styles.label)}>{priority} Priority</p>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function FindingsList({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

export function FindingItem({
  title,
  tone,
  priority,
  children,
}: {
  title: string;
  tone?: StatusTone;
  priority?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/40 border border-border/50 p-4 sm:p-5">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground mb-1.5">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
      {priority && tone && (
        <div className="flex-shrink-0">
          <StatusBadge tone={tone}>{priority}</StatusBadge>
        </div>
      )}
    </div>
  );
}

export function Note({ title, items }: { title: string; items: ReactNode[] }) {
  return (
    <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300 mb-3">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2.5 text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0 mt-1.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GuideTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3.5 text-left font-semibold text-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {rows.map((row, index) => (
            <tr key={index} className="bg-card/30 hover:bg-card/60 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3.5 align-top text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Lightweight, dependency-free syntax highlighter. Good enough for short
// JS/TS/JSX/JSON example snippets; not a full language parser.
const CODE_TOKEN_REGEX =
  /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(<\/?[A-Za-z][\w.]*)|(\b(?:const|let|var|function|return|if|else|import|export|from|default|async|await|new|class|extends|this|try|catch|finally|throw|typeof|instanceof|of|true|false|null|undefined|void|delete|switch|case|break|continue|for|while|do|yield|static|super)\b)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*(?=\())/gm;

function highlightCode(code: string) {
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  CODE_TOKEN_REGEX.lastIndex = 0;

  while ((match = CODE_TOKEN_REGEX.exec(code)) !== null) {
    const [full, comment1, comment2, template, dquote, squote, tag, keyword, number, funcCall] = match;
    result += escapeHtml(code.slice(lastIndex, match.index));

    let className = '';
    if (comment1 || comment2) className = 'text-slate-400 italic';
    else if (template || dquote || squote) className = 'text-emerald-700';
    else if (tag) className = 'text-red-700';
    else if (keyword) className = 'text-red-600';
    else if (number) className = 'text-orange-600';
    else if (funcCall) className = 'text-blue-700';

    result += className ? `<span class="${className}">${escapeHtml(full)}</span>` : escapeHtml(full);
    lastIndex = match.index + full.length;
  }

  result += escapeHtml(code.slice(lastIndex));
  return result;
}

export function CodeBlock({ children, filename }: { children: string; filename?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md my-6">
      {filename && (
        <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-2.5 border-b border-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
          <span className="ml-2 text-xs font-mono text-slate-500">{filename}</span>
        </div>
      )}
      <pre className="bg-white p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-800">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(children) }} />
      </pre>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BulletList({ items, dense = false }: { items: ReactNode[]; dense?: boolean }) {
  return (
    <ul className={cn('text-muted-foreground', dense ? 'space-y-1.5' : 'space-y-2.5')}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <CircleDot className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-1.5" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NextUp({
  title,
  icon: Icon = ArrowRight,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        {title}
      </h3>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
