import Container from "@/app/_components/container";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-wef-blue text-white py-16">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Footer Logo and Description */}
          <div className="lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-4">
              Global Shapers Community
            </h3>
            <p className="text-sm">
              An initiative of the World Economic Forum, the Global Shapers
              Community is a network of young people driving dialogue, action,
              and change.
            </p>
          </div>

          {/* Footer Links */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-4">Explore</h4>
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/hubs" className="hover:underline">
                Our Hubs
              </Link>
              <Link href="/impact" className="hover:underline">
                Our Impact
              </Link>
              <Link href="/partners" className="hover:underline">
                Our Partners
              </Link>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="lg:w-1/3 flex justify-center lg:justify-end space-x-6 mt-8 lg:mt-0">
            <a
              href="https://www.facebook.com/globalshapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wef-light-blue"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com/globalshapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wef-light-blue"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/global-shapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wef-light-blue"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href="https://www.instagram.com/globalshapers/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wef-light-blue"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-12 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Global Shapers Community. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
