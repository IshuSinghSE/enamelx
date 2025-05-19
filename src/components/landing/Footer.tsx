import { Linkedin, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-popover px-6 py-12 border-t border-primary/10 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">EnamelX</h3>
            <p className="text-dental-100 mb-4 text-primary/80">
              Revolutionizing dentistry through the power of AI technology.
            </p>
            <div className="flex space-x-4 text-primary/70">
              <Link
                href="#"
                className="text-dental-100 transition-colors duration-200 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                   stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-dental-100 transition-colors duration-200 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                   stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram-icon lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-dental-100 transition-colors duration-200 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                   stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook-icon lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>{' '}
              <Link
                href="#"
                className="text-dental-100 transition-colors duration-200 hover:text-white"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-primary/90">
              <li>
                <Link
                  href="/"
                  className="text-dental-100 transition-colors duration-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-dental-100 transition-colors duration-200 hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-dental-100 transition-colors duration-200 hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-dental-100 transition-colors duration-200 hover:text-white"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className='text-primary/90'>
            <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
            <p className="text-dental-100 mb-2">Email: contact@enamelx.com</p>
            <p className="text-dental-100 mb-2">Phone: +91 123 456 7890</p>
            <p className="text-dental-100">
              Address: 123 AI Street, Tech Park, Bengaluru
            </p>
          </div>
        </div>

        <div className="border-dental-700 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <p className="text-dental-100 mb-4 text-sm md:mb-0 text-primary/70">
            &copy; {new Date().getFullYear()} EnamelX. All rights reserved.
          </p>
          <div className="flex space-x-6 text-primary/60">
            <Link
              href="#"
              className="text-dental-100 text-sm transition-colors duration-200 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-dental-100 text-sm transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-dental-100 text-sm transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
