import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-wef-gradient text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="text-white">
            Global Shapers
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
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

        {/* Sign In Button */}
        <div className="hidden md:block items-center space-x-4">
          <Link href="/signin">
            <button className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <nav className="flex flex-col space-y-2 px-6 py-4">
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
          <Link
            href="/signin"
            className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue mt-4"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
