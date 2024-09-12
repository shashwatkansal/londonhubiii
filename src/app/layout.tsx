import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header"; // Import the Header component
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Global Shapers London Hub III - ${CMS_NAME}`,
  description: `Welcome to the official website of Global Shapers London Hub III. Discover our initiatives, explore our impact, and join us in driving positive change across the world.`,
  keywords:
    "Global Shapers, London Hub, World Economic Forum, community, social impact, young leaders, global initiatives, change-makers",
  authors: [{ name: "Global Shapers London Hub III" }],
  openGraph: {
    title: "Global Shapers London Hub III",
    description:
      "Discover the initiatives and impact of Global Shapers London Hub III, a community of young leaders driving global change.",
    url: "https://yourwebsite.com", // Replace with your website's URL
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
    site: "@YourTwitterHandle", // Replace with your Twitter handle
    title: "Global Shapers London Hub III",
    description:
      "Join Global Shapers London Hub III in making a global impact.",
    images: HOME_OG_IMAGE_URL,
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://londoniiishapers.com", // Replace with your canonical URL
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
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        {/* Header */}
        {/* <Header /> */}
        {/* Main Content Area */}
        {/* <AuthProvider> */}
        <div className="min-h-screen">{children}</div>
        {/* </AuthProvider> */}
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
