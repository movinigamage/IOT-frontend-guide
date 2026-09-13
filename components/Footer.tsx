import { MessageSquare } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 mt-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Frontend Support Toolkit</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A practical frontend support toolkit for standards, review findings, API integration, troubleshooting, and quality checks.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/guide/frontend-review" className="hover:text-primary transition-colors">IoT Frontend Review</a></li>
              <li><a href="/guide/data-api-reference" className="hover:text-primary transition-colors">Data API Examples</a></li>
              <li><a href="/guide/api-debugging" className="hover:text-primary transition-colors">API Testing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <div className="flex gap-4">
              <a href="/guide/integration-support" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200" aria-label="Integration support">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} Frontend Support Toolkit. Built to support current and future frontend contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}
