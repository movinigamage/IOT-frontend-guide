import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { TopNav } from '@/components/TopNav'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Frontend Support Toolkit',
  description: 'Beginner-friendly frontend guidance and IoT project support for UI quality, API testing, integration, mock-to-live migration, and issue reporting.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <TopNav />
          <div className="flex pt-20">
            <Sidebar />
            <main className="flex-1 min-w-0 lg:ml-64">
              {children}
              <Footer />
            </main>
          </div>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
