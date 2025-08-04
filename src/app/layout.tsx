import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import RecruitmentBanner from "@/app/_components/RecruitmentBanner";
import * as SETTINGS from "@/lib/settings";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { LinksProvider } from "@/app/_components/dashboard/LinksContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SETTINGS.HUB_CONFIG.HUB_NAME,
  description: SETTINGS.HUB_CONFIG.META_DESCRIPTION,
  keywords: SETTINGS.HUB_CONFIG.META_KEYWORDS,
  authors: [{ name: SETTINGS.HUB_CONFIG.HUB_NAME }],
  openGraph: {
    title: SETTINGS.HUB_CONFIG.HUB_NAME,
    description: SETTINGS.HUB_CONFIG.META_DESCRIPTION,
    url: SETTINGS.HUB_CONFIG.HUB_URL,
    type: "website",
    images: [
      {
        url: SETTINGS.HUB_CONFIG.HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SETTINGS.HUB_CONFIG.HUB_NAME,
      },
    ],
    locale: "en_US",
    siteName: SETTINGS.HUB_CONFIG.HUB_NAME,
  },
  twitter: {
    card: "summary_large_image",
    site: SETTINGS.HUB_CONFIG.TWITTER_HANDLE,
    title: SETTINGS.HUB_CONFIG.HUB_NAME,
    description: SETTINGS.HUB_CONFIG.META_DESCRIPTION,
    images: SETTINGS.HUB_CONFIG.HOME_OG_IMAGE_URL,
  },
  robots: "index, follow",
  alternates: {
    canonical: SETTINGS.HUB_CONFIG.HUB_URL,
  },
};

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
            <main className="min-h-screen" role="main">
              {children}
            </main>
          </LinksProvider>
        </AuthProvider>
          
        <Footer />
      </body>
    </html>
  );
}
