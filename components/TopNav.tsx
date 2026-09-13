'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { guideNavigationSections } from '@/lib/guideNavigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CommandMenu } from '@/components/CommandMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center px-4 lg:px-8 transition-colors duration-300">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="font-bold text-xl text-foreground flex items-center gap-2">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">DB</span>
          DataBytes
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <CommandMenu />
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-border text-left">
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">DB</span>
                  DataBytes
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 overflow-y-auto p-4 space-y-6">
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
                            onClick={() => setMobileMenuOpen(false)}
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
                                    onClick={() => setMobileMenuOpen(false)}
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
              </nav>
              <div className="p-6 border-t border-border mt-auto bg-muted/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Theme Settings</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
