import Link from 'next/link'
import React from 'react'

const Header:React.FC = () => {
  return (
    <header className="w-full h-16 flex justify-between items-center py-4 px-8 bg-background text-foreground border-b border-primary">
      <div className="text-2xl font-bold font-sora">Logo</div>
      <nav className="flex gap-8 text-xl">
        <Link href="/" className="text-foreground">
          Home
        </Link>
        <Link href="/features" className="text-foreground">
          Features
        </Link>
        <Link href="/pricing" className="text-foreground">
          Pricing
        </Link>
        <Link href="/contact" className="text-foreground">
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Header
