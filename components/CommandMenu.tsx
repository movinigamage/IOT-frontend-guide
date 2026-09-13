'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useTheme } from 'next-themes';
import { guideNavigationSections } from '@/lib/guideNavigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Desktop Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted/80 hover:text-foreground transition-all duration-200"
        aria-label="Search documentation"
      >
        <Search className="w-4 h-4" />
        <span>Search documentation...</span>
        <kbd className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-sans font-semibold bg-background border border-border rounded opacity-100 text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {guideNavigationSections.map((section, sectionIndex) => (
            <CommandGroup key={section.title ?? `section-${sectionIndex}`} heading={section.title ?? 'Home'}>
              {section.items.flatMap((item) => [item, ...(item.children ?? []).map((child) => ({ ...child, title: `${item.title}: ${child.title}` }))]).map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons] as any;
                return (
                  <CommandItem
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))} className="gap-2">
              <Icons.Sun className="w-4 h-4 text-muted-foreground" />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))} className="gap-2">
              <Icons.Moon className="w-4 h-4 text-muted-foreground" />
              <span>Dark Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))} className="gap-2">
              <Icons.Monitor className="w-4 h-4 text-muted-foreground" />
              <span>System Theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
