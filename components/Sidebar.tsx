'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { guideNavigationSections } from '@/lib/guideNavigation';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-border overflow-y-auto pt-20 hidden lg:block transition-colors duration-300">
      <nav className="px-4 py-6">
        <div className="space-y-6">
          {guideNavigationSections.map((section, sectionIndex) => (
            <div key={section.title ?? `section-${sectionIndex}`} className="space-y-2">
              {section.title && (
                <div className="px-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/70">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                const Icon = Icons[item.icon as keyof typeof Icons] as any;

                return (
                  <div key={item.href} className="space-y-1">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="ml-7 border-l border-border pl-2 space-y-1">
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block rounded-md px-3 py-2 text-xs font-medium transition-all duration-200',
                                childActive
                                  ? 'bg-muted text-foreground'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
