import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import * as SETTINGS from "@/lib/settings";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { LinksProvider } from "@/app/_components/dashboard/LinksContext";
import AdvancedErrorBoundary from "@/components/ui/AdvancedErrorBoundary";
import { generateSEOMetadata } from "@/components/SEO";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEOMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://yourprojecturl.com"
        />

        <link rel="preconnect" href="https://cdn.vercel-insights.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SETTINGS.HUB_CONFIG.HUB_NAME,
              url: SETTINGS.HUB_CONFIG.HUB_URL,
              logo: SETTINGS.HUB_CONFIG.HOME_OG_IMAGE_URL,
              sameAs: [
                SETTINGS.HUB_CONFIG.TWITTER_HANDLE.startsWith("@") ? `https://twitter.com/${SETTINGS.HUB_CONFIG.TWITTER_HANDLE.slice(1)}` : SETTINGS.HUB_CONFIG.TWITTER_HANDLE,
                SETTINGS.HUB_CONFIG.FACEBOOK_URL,
                SETTINGS.HUB_CONFIG.INSTAGRAM_URL,
                SETTINGS.HUB_CONFIG.LINKEDIN_URL,
              ],
              description: SETTINGS.HUB_CONFIG.META_DESCRIPTION,
            }),
          }}
        />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <Analytics />

        <Toaster position="top-center" reverseOrder={false} />

        <Header />

        <AuthProvider>
          <LinksProvider>
            <AdvancedErrorBoundary>
              <main className="min-h-screen" role="main">
                {children}
              </main>
            </AdvancedErrorBoundary>
          </LinksProvider>
        </AuthProvider>
          
        <Footer />
        
        {/* Performance monitoring */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                try {
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      console.log('[Performance]', entry.name, entry.startTime);
                    }
                  });
                  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
                } catch (e) {}
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
