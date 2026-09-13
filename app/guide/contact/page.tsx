import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact and Support</h1>
        <p className="text-lg text-muted-foreground">
          This page has been simplified so support guidance stays evidence-based and aligned with the toolkit.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-card/50 border border-border rounded-lg p-6">
          <MessageSquare className="w-8 h-8 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Use the Integration Support Template</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For API, mock-to-live, frontend-backend, or dashboard data issues, the toolkit now uses a structured issue template with endpoint, request, response, status, component, and reproduction evidence.
          </p>
          <Link href="/guide/integration-support" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
            Go to Integration Support <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </article>
  );
}
