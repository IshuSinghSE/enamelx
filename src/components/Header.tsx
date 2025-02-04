import Link from 'next/link'
import React from 'react'
import { ProfileDropDown } from './ProfileDropDown'
import { Button, buttonVariants } from './ui/button' // Import Button component

const Header: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-primary-foreground px-8 py-4 text-foreground">
      <div className="font-sora text-2xl font-bold">Logo</div>
      <nav className="flex gap-4 text-lg font-normal">
        <Link className={buttonVariants()} type='' href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <ProfileDropDown />
    </header>
  )
}

export default Header
