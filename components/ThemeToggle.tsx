'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <div className="relative group inline-flex items-center rounded-xl bg-muted/50 border border-border p-1 backdrop-blur-md transition-all hover:bg-muted/80">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
          theme === 'light'
            ? 'bg-background shadow-sm text-foreground scale-100'
            : 'text-muted-foreground hover:text-foreground scale-90 opacity-70 hover:opacity-100 hover:bg-background/50'
        }`}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
          theme === 'system'
            ? 'bg-background shadow-sm text-foreground scale-100'
            : 'text-muted-foreground hover:text-foreground scale-90 opacity-70 hover:opacity-100 hover:bg-background/50'
        }`}
        aria-label="System Theme"
      >
        <Monitor className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
          theme === 'dark'
            ? 'bg-background shadow-sm text-foreground scale-100'
            : 'text-muted-foreground hover:text-foreground scale-90 opacity-70 hover:opacity-100 hover:bg-background/50'
        }`}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
