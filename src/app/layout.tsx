import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Global Shapers London Hub III`,
  description: `Welcome to the official website of Global Shapers London Hub III. Discover our initiatives, explore our impact, and join us in driving positive change across the world.`,
  keywords:
    "Global Shapers, London Hub, World Economic Forum, community, social impact, young leaders, global initiatives, change-makers, youth leadership, impact projects",
  authors: [{ name: "Global Shapers London Hub III" }],
  openGraph: {
    title: "Global Shapers London Hub III",
    description:
      "Discover the initiatives and impact of Global Shapers London Hub III, a community of young leaders driving global change.",
    url: "https://londoniiishapers.com",
    type: "website",
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Global Shapers London Hub III",
      },
    ],
    locale: "en_US",
    siteName: "Global Shapers London Hub III",
  },
  twitter: {
    card: "summary_large_image",
    site: "@londonshapers3",
    title: "Global Shapers London Hub III",
    description:
      "Join Global Shapers London Hub III in making a global impact.",
    images: HOME_OG_IMAGE_URL,
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://londoniiishapers.com",
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
        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#000" />

        {/* Favicon and Icons */}
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

        {/* Alternate Links for SEO */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://londoniiishapers.com"
        />

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Global Shapers London Hub III",
              url: "https://londoniiishapers.com",
              logo: HOME_OG_IMAGE_URL,
              sameAs: [
                "https://twitter.com/londonshapers3",
                "https://www.facebook.com/londonshapers",
                "https://www.instagram.com/londonshapers3",
              ],
              description:
                "Discover the initiatives and impact of Global Shapers London Hub III, a community of young leaders driving global change.",
            }),
          }}
        />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        {/* Analytics */}
        <Analytics />

        {/* Notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <AuthProvider>
          <main className="min-h-screen" role="main">
            {children}
          </main>
        </AuthProvider>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
