import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-wef-gradient text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and WEF Initiative */}
        <div className="flex items-center space-x-4">
          {/* Global Shapers Logo */}
          <Link href="/">
            <Image
              src="/assets/images/gs_white_logo.png" // Replace with your logo path
              alt="Global Shapers Logo"
              width={75} // Adjust the size as needed
              height={50} // Adjust the size as needed
            />
          </Link>

          {/* London Hub III Text */}
          <div className="text-3xl font-bold whitespace-nowrap">
            London Hub III
          </div>

          {/* WEF Initiative */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Initiative of the</span>
            <Image
              src="/assets/images/wef_logo.png" // Replace with WEF logo path
              alt="World Economic Forum Logo"
              width={120} // Adjust the size as needed
              height={30} // Adjust the size as needed
            />
          </div>
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
        <div className="flex items-center space-x-4">
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
