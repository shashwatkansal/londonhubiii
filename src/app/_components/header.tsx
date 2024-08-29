// /src/app/_components/header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-wef-gradient text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Global Shapers</Link>
        </div>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link href="/" className="hover:text-wef-light-blue">
            Home
          </Link>
          <Link href="/about" className="hover:text-wef-light-blue">
            About
          </Link>
          <Link href="/hubs" className="hover:text-wef-light-blue">
            Hubs
          </Link>
          <Link href="/shapers" className="hover:text-wef-light-blue">
            Shapers
          </Link>
          <Link href="/impact" className="hover:text-wef-light-blue">
            Our Impact
          </Link>
          <Link href="/insights" className="hover:text-wef-light-blue">
            Insights
          </Link>
          <Link href="/partners" className="hover:text-wef-light-blue">
            Our Partners
          </Link>
        </nav>
      </div>
    </header>
  );
}
