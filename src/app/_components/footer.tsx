import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-wef-gradient text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Footer Logo and Description */}
          <div className="lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              {/* Logo */}
              <div className="flex flex-row space-x-4 py-4 mx-auto md:mx-0">
                <Image
                  src="/assets/images/gs_white_logo.png"
                  alt="Global Shapers Logo"
                  width={100}
                  height={100}
                  className="w-full h-16"
                />
                <Image
                  src="/assets/images/wef_logo.png"
                  alt="Global Shapers Logo"
                  width={100}
                  height={100}
                  className="w-full h-16"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">London Hub III</h3>
              <p className="text-sm">
                An initiative of the World Economic Forum, the Global Shapers
                Community is a network of young people driving dialogue, action,
                and change.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-4">Explore</h4>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <Link href="/about" className="link link-hover text-white">
                About Us
              </Link>
              <Link href="/shapers" className="link link-hover text-white">
                Shapers
              </Link>
              <Link href="/impact" className="link link-hover text-white">
                Our Impact
              </Link>
              <Link href="/partners" className="link link-hover text-white">
                FAQs
              </Link>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="lg:w-1/3 flex justify-center lg:justify-end space-x-6 mt-8 lg:mt-0">
            <a
              href="https://www.facebook.com/globalshapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com/globalshapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/global-shapers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href="https://www.instagram.com/globalshapers/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
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
          <p className="text-sm mt-2">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/shashwatkansal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Shashwat Kansal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
