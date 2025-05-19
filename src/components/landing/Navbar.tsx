import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-popover px-6 py-4 shadow-sm md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex gap-1">
          <Image
            src="/images/logo.png"
            alt="Enamelx Logo"
            className="h-10 w-auto"
            width={40}
            height={40}
          />
          <div className="py-1 font-sora text-2xl font-bold">EnamelX</div>
        </Link>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="font-medium hover:underline text-foreground transition-colors duration-200 hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="font-medium hover:underline text-foreground transition-colors duration-200 hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="font-medium hover:underline text-foreground transition-colors duration-200 hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="font-medium hover:underline text-foreground transition-colors duration-200 hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Get Started
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="animate-fade-in mt-2 space-y-4 rounded-xl border border-border bg-background px-4 pb-6 pt-4 shadow-lg md:hidden">
          <Link
            href="/"
            className="block font-medium text-foreground transition-colors duration-200 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#features"
            className="block font-medium text-foreground transition-colors duration-200 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="block font-medium text-foreground transition-colors duration-200 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="block font-medium text-foreground transition-colors duration-200 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <ThemeToggle />

          <Link
            href="/dashboard"
            className="mt-4 block w-full rounded-full bg-primary py-2 text-center font-semibold text-primary-foreground shadow transition-colors duration-200 hover:bg-primary/90"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
